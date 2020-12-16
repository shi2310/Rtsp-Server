<template>
  <a-layout id="components-layout" class="layout">
    <a-layout-header>
      <div class="logo" />
      <a-menu
        theme="dark"
        mode="horizontal"
        :defaultSelectedKeys="selectedKeys"
        :style="{ lineHeight: '64px' }"
        @click="menuClick"
      >
        <template v-for="(item, i) in menuList">
          <!-- 如果当前遍历项没有children，视为子菜单项，注意所有的key都是path用于路由跳转，以及当前选中记录 -->
          <a-menu-item v-if="!item.children" :key="item.url || i">
            <span>{{ item.title }}</span>
          </a-menu-item>
          <!-- 否则视为子菜单，传入菜单信息并且运用下面定义的函数式组件 -->
          <SubMenu v-else :key="item.url || i" :menu-info="item" />
        </template>
      </a-menu>
    </a-layout-header>
    <a-layout-content style="padding: 25px 50px 0;">
      <div class="body">
        <router-view></router-view>
      </div>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      ©迈润智能科技有限公司
    </a-layout-footer>
  </a-layout>
</template>

<script>
import SubMenu from "../components/SubMenu";

export default {
  name: "home",
  data() {
    return {
      menuList: [
        {
          url: null,
          title: "综合看板",
          children: [
            {
              url: "/index",
              title: "地图展示",
            },
            {
              url: "#",
              title: "可视化分析",
            },
          ],
        },
        {
          url: null,
          title: "视频监控",
          children: [
            {
              url: "/realTimeCamera",
              title: "实时监控",
            },
            {
              url: "/history",
              title: "历史回放",
            },
            {
              url: "/pointSetting",
              title: "点位设置",
            },
          ],
        },
        {
          url: null,
          title: "船舶信息",
          children: [
            {
              url: "/boat",
              title: "船舶档案",
            },
            {
              url: "#",
              title: "船舶ais",
            },
          ],
        },
        {
          url: "/abnormal",
          title: "异常信息",
        },
      ],
    };
  },
  methods: {
    // 点击菜单，路由跳转,注意的是当点击MenuItem才会触发此函数
    menuClick({ item, key, keyPath }) {
      console.log(item, key, keyPath);
      // 获取到当前的key,并且跳转
      this.$router.push({
        path: key,
      });
    },
  },
  computed: {
    selectedKeys: function() {
      let array = [];
      if (this.$route.path) {
        array.push(this.$route.path);
      }
      return array;
    },
  },
  // 注册局部组件
  components: {
    SubMenu,
  },
};
</script>

<style scoped lang="less">
#components-layout {
  min-height: 100%;
  height: 100%;

  main {
    display: flex;
    justify-content: center;
    height: 100%;
    width: 100%;

    .body {
      width: 100%;
      overflow-y: auto;
      overflow-x: hidden;
    }
  }
}

.logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 24px 16px 0;
  float: left;
}
</style>
