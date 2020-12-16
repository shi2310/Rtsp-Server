<template>
  <baidu-map class="map" :center="map.center" :zoom="map.zoom" @ready="handler">
    <!--缩放-->
    <bm-navigation anchor="BMAP_ANCHOR_TOP_LEFT"></bm-navigation>
    <!--定位-->
    <bm-geolocation
      anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
      :showAddressBar="true"
      :autoLocation="true"
    ></bm-geolocation>
  </baidu-map>
</template>

<script>
export default {
  name: "demo",
  data: () => ({
    map: {
      center: { lng: 121.447254, lat: 31.32362 },
      zoom: 15,
      show: true,
      dragging: true,
    },
  }),
  methods: {
    handler({ map }) {
      // 鼠标缩放
      map.enableScrollWheelZoom(true);
      // 点击事件获取经纬度
      map.addEventListener("click", function(e) {
        console.log(e.point.lng, e.point.lat);
      });
    },
  },
};
</script>

<style scoped>
.map {
  width: 100%;
  height: 100%;
}
</style>
