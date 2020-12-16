<template>
  <div class="box">
    <div class="controller">
      <div class="point">
        <p class="title">点位</p>
        <a-row type="flex" justify="space-between" align="middle">
          <a-col :span="4">
            名称：
          </a-col>
          <a-col :span="20">
            <a-input placeholder="点位名称" />
          </a-col>
        </a-row>
        <div class="list">
          <a-list item-layout="horizontal" :data-source="data">
            <a-list-item slot="renderItem" slot-scope="item">
              <a-icon type="play-circle" @click="doPlay(item.rtspUrl)" />
              {{ item.title }}
            </a-list-item>
          </a-list>
        </div>
      </div>
      <div class="calendar">
        <a-calendar :fullscreen="false" />
      </div>
    </div>
    <div class="player">
      <video-player :src="currentRtspUrl"></video-player>
    </div>
  </div>
</template>

<script>
import VideoPlayer from "@/components/VideoPlayer.vue";

export default {
  data() {
    return {
      data: [
        {
          title: "武汉25号",
          rtspUrl: "rtsp://192.168.1.25:554/stream1",
        },
        {
          title: "武汉26号",
          rtspUrl: "rtsp://192.168.1.26:554/stream1",
        },
        {
          title: "武汉27号",
          rtspUrl: "rtsp://192.168.1.27:554/stream1",
        },
        {
          title: "武汉23号",
          rtspUrl: "rtsp://admin:bst13579@192.168.1.23",
        },
        {
          title: "武汉21号",
          rtspUrl: "rtsp://admin:bst13579@192.168.1.21",
        },
        {
          title: "武汉22号",
          rtspUrl: "rtsp://admin:bst13579@192.168.1.22",
        },
      ],
      currentRtspUrl: null,
    };
  },
  components: {
    VideoPlayer,
  },
  methods: {
    doPlay(rtspUrl) {
      this.currentRtspUrl = rtspUrl;
    },
  },
};
</script>
<style lang="less" scoped>
.box {
  height: 100%;
  display: flex;

  .controller {
    min-width: 350px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .point {
      background-color: white;
      padding: 10px;

      .title {
        font-size: larger;
        padding: 10px;
        color: black;
        border-bottom: 1px solid #dedede;
      }

      .list {
        overflow: auto;
        margin-top: 10px;
        height: 300px;
      }
    }

    .calendar {
      background-color: white;
      padding: 10px;
    }
  }

  .player {
    width: 100%;
    height: 100%;
    margin-left: 10px;
    background-color: black;
  }
}
</style>
