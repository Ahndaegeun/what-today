import { createWebHashHistory, createRouter } from "vue-router";

import Home from './components/Home'
import Sign from './components/Sign'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Find from './components/Find'
import MyPage from './components/MyPage'

const routes = [
  {
    path: "/",
    component: Home
  },
  {
    path: "/sign",
    component: Sign,
    children: [
      {
        path: "login",
        component: Login
      },
      {
        path: "signup",
        component: SignUp
      },
      {
        path: "find",
        component: Find
      }
    ]
  },
  {
    path: "/mypage",
    component: MyPage,

  },
  {
    path: "/:PathMatch(.*)*",
    redirect: "/"
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router;