<template>
  <div class="box">
    <SearchForm
      title="视频监控"
      :formInputs="searchFromInputs"
      :form="searchFrom"
      @clickSubmitForm="search()"
    >
      <a-button type="default">
        重置
      </a-button>
    </SearchForm>
    <div class="body">
      <a-list :grid="{ gutter: 80, column: 4 }" :data-source="videos">
        <a-list-item slot="renderItem" slot-scope="item">
          <a-card :title="item.title" hoverable>
            <div slot="cover" class="video">
              <VideoPlayer :src="item.rtsp"></VideoPlayer>
            </div>
            <a-card-meta :title="item.name">
              <template slot="description">
                {{ item.code }}
              </template>
            </a-card-meta>
          </a-card>
        </a-list-item>
      </a-list>
    </div>
  </div>
</template>
<script>
import SearchForm from "../components/SearchForm";
import VideoPlayer from "@/components/VideoPlayer.vue";

export default {
  data() {
    return {
      searchFrom: {
        pointName: "",
        pointCode: "",
      },
      searchFromInputs: [
        {
          model: "pointName",
          label: "点位名称",
          type: "input",
        },
        {
          model: "pointCode",
          label: "点位编号",
          type: "input",
        },
      ],
      videos: [
        {
          name: "武汉25号",
          code: "HPJ001",
          rtsp: "rtsp://192.168.1.25:554/stream1",
        },
        {
          name: "武汉26号",
          code: "HPJ002",
          rtsp: "rtsp://192.168.1.26:554/stream1",
        },
        {
          name: "武汉27号",
          code: "HPJ001",
          rtsp: "rtsp://192.168.1.27:554/stream1",
        },
        {
          name: "武汉21号",
          code: "HPJ002",
          rtsp: "rtsp://admin:bst13579@192.168.1.21",
        },
        {
          name: "武汉22号",
          code: "HPJ001",
          rtsp: "rtsp://admin:bst13579@192.168.1.22",
        },
        {
          name: "武汉23号",
          code: "HPJ002",
          rtsp: "",
        },
        { name: "黄浦江7号", code: "HPJ001", rtsp: "" },
        { name: "黄浦江8号", code: "HPJ002", rtsp: "" },
      ],
    };
  },
  methods: {
    search() {
      console.log(JSON.stringify(this.searchFrom));
    },
  },
  components: {
    SearchForm,
    VideoPlayer,
  },
};
</script>
<style lang="less" scoped>
.box {
  .head {
    margin-bottom: 20px;
    padding: 10px;
    background-color: white;
  }

  .body {
    padding: 5px;

    .video {
      height: 200px;
    }
  }
}
</style>
