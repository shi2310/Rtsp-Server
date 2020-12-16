import express from "express";
import expressWebSocket from 'express-ws';
import ffmpeg from '@ffmpeg-installer/ffmpeg';
import { spawn } from 'child_process';

const ffmpegPath = ffmpeg.path;

function localServer() {
    let app = express();
    // extend express app with app.ws()
    expressWebSocket(app, null, {
        perMessageDeflate: true
    });
    app.ws("/rtsp", rtspRequestHandle)
    app.listen(8888);
    console.log("express listened")
}

function rtspRequestHandle(ws, req) {
    let url = req.query.url;
    if (!url) throw new Error('URL to rtsp stream is required');
    console.log("rtsp url:", url);

    // these should be detected from the source stream
    const [width, height] = [0, 0];
    const streamHeader = Buffer.alloc(8);
    streamHeader.write('jsmp');
    streamHeader.writeUInt16BE(width, 4);
    streamHeader.writeUInt16BE(height, 6);
    ws.send(streamHeader, { binary: true });

    // ffmpet转码
    let shell = spawn(
        ffmpegPath,
        [
            '-rtsp_transport',
            'tcp',
            '-i',
            url,
            '-f',
            'mpegts',
            '-codec:v',
            'mpeg1video',
            '-vf',
            'scale=1366:-2', // scale video and keep aspect ratio
            '-r',
            '30', // 30 fps. any lower and the client can't decode it
            '-q:v',
            '1',
            '-fflags',
            'nobuffer',
            '-',
        ],
        { detached: false }
    );

    shell.stdout.on('data', (data, opts) => {
        console.log(data);
        if (ws.readyState === 1) ws.send(data, opts);
    })
    shell.stderr.on('error', (e) => console.log('err:error', e));
    shell.stdout.on('error', (e) => console.log('out:error', e));
    shell.on('error', (err) => {
        console.warn(`[rtsp-relay] Internal Error: ${err.message}`);
    });
    shell.on('exit', (_code, signal) => {
        if (signal !== 'SIGTERM') {
            console.warn('[rtsp-relay] Stream died - will recreate when the next client connects');
        }
    });

    ws.on('close', () => {
        shell.kill('SIGKILL');
    });
}

localServer()
