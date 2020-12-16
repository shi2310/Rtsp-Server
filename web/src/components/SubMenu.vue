<template>
  <a-sub-menu :key="menuInfo.url" v-bind="$props" v-on="$listeners">
    <span slot="title">
      {{ menuInfo.title }}
    </span>
    <template v-for="item in menuInfo.children">
      <a-menu-item v-if="!item.children" :key="item.url">
        <span>{{ item.title }}</span>
      </a-menu-item>
      <sub-menu v-else :key="item.url" :menu-info="item" />
    </template>
  </a-sub-menu>
</template>
<script>
import { Menu } from "ant-design-vue";

export default {
  name: "SubMenu",
  props: {
    // 解构a-sub-menu的属性，也就是文章开头提到的为什么使用函数式组件
    ...Menu.SubMenu.props,
    // 接收父级传递过来的菜单信息
    menuInfo: {
      type: Object,
      default: () => ({}),
    },
  },
  isSubMenu: true,
};
</script>
<style lang="less" scoped></style>
