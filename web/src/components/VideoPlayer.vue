<template>
  <div class="canvas-wrapper" id="canvas-wrapper"></div>
</template>
<script>
export default {
  name: "VideoPlayer",
  props: ["src"],
  data() {
    return {
      player: null,
    };
  },
  watch: {
    src(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.doPlay(newValue);
      }
    },
  },
  mounted() {
    this.doPlay(this.src);
  },
  destroyed() {
    if (this.player) {
      this.player.destroy();
    }
  },
  methods: {
    doPlay(url) {
      if (this.player) {
        this.player.destroy();
      }
      if (!url) {
        return;
      }
      console.log("playing url:", url);

      let canvas = this.$el.getElementsByTagName("canvas")[0];
      if (!canvas) {
        const canvasWrapper = document.getElementById("canvas-wrapper");
        canvas = document.createElement("canvas");
        canvas.style.width = "auto";
        canvas.style.maxHeight = "100%";
        canvas.style.zIndex = "9999";
        canvas.style.background = "none";
        canvasWrapper.appendChild(canvas);
      }

      const proxyUrl = `ws://127.0.0.1:8888/rtsp?url=${url}`;
      if (canvas) {
        /* eslint-disable */
        this.player = new JSMpeg.Player(proxyUrl, {
          canvas,
          videoBufferSize: 4 * 1024 * 1024,
        });
      }
    },
  },
};
</script>
<style lang="less" scoped>
.canvas-wrapper {
  width: 100%;
  height: 100%;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
