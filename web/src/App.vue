<template>
  <a-config-provider :locale="zh_CN">
    <router-view />
  </a-config-provider>
</template>

<script>
import zh_CN from "ant-design-vue/lib/locale-provider/zh_CN";

export default {
  name: "App",
  data() {
    return {
      zh_CN,
    };
  },
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}
html {
  font-size: 25px;
}
body {
  background: #f8f8f8;
}
* {
  margin: 0;
  padding: 0;
  list-style: none;
  box-sizing: border-box;
  font-family: "Microsoft YaHei UI";
  font-weight: normal;
  outline-style: none;
  font-style: normal;
  text-decoration: none;
}

.ant-divider-horizontal {
  margin: 14px 0;
}

/*修改滚动条样式*/
div::-webkit-scrollbar {
  width: 5px;
  height: 5px;
  /**/
}
div::-webkit-scrollbar-track {
  background: rgb(239, 239, 239);
  border-radius: 2px;
}
div::-webkit-scrollbar-thumb {
  background: #bfbfbf;
  border-radius: 10px;
}
div::-webkit-scrollbar-thumb:hover {
  background: #007380;
}
div::-webkit-scrollbar-corner {
  background: #179a16;
}
</style>
