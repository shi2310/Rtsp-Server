import Vue from "vue"
import Router from "vue-router"
import Login from "@/pages/Login"
import Index from "@/pages/Index"
import Home from "@/pages/Home"
import RealTimeCamera from "@/pages/RealTimeCamera"
import History from "@/pages/History"
import PointSetting from '@/pages/PointSetting'
import Boat from '@/pages/Boat'
import Abnormal from '@/pages/Abnormal'

Vue.use(Router)

const VueRouterPush = Router.prototype.push
Router.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch((err) => err)
}

const router = new Router({
  routes: [
    {
      path: "/",
      redirect: "/login",
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        title: "登录",
      },
    },
    {
      path: "/index",
      name: "index",
      component: Index,
      // 自定义属性，设置是否必须Authorization
      meta: {
        requireAuth: true,
      },
      children: [
        {
          path: "/",
          component: Home,
          meta: {
            title: "首页",
          },
        },
        {
          path: "/realTimeCamera",
          component: RealTimeCamera,
          meta: {
            title: "实时监控",
          },
        },
        {
          path: "/history",
          component: History,
          meta: {
            title: "历史回放",
          },
        },
        {
          path: "/pointSetting",
          component: PointSetting,
          meta: {
            title: "点位设置",
          },
        },
        {
          path: "/boat",
          component: Boat,
          meta: {
            title: "船舶档案",
          },
        },
        {
          path: "/abnormal",
          component: Abnormal,
          meta: {
            title: "异常信息",
          },
        },
      ],
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      // savedPosition 当且仅当 popstate 导航 (通过浏览器的 前进/后退 按钮触发) 时才可用。
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0,
      }
    }
  },
})

// 路由守卫
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  // 根据设置的requireAuth客户端简单验证token是否存在
  if (to.matched.some((r) => r.meta.requireAuth)) {
    let token = localStorage.getItem("Authorization")
    if (token) {
      next()
    } else {
      next({
        path: "/login",
      })
    }
  } else {
    next()
  }
})

export default router
