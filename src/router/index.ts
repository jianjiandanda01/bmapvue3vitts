import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
// import HomeView from "../views/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
  // {
  //   path: "/",
  //   name: "",
  //   component: HomeView,
  // },
  {
    path: "/bulletinBoardList",
    name: "bulletinBoardList",
    component: () => import("../views/bulletinBoardList.vue"),
    children: [
      {
        path: "bulletinBoard",
        name: "bulletinBoard",
        component: () =>
          import("../components/bulletinBoard/bulletinBoard.vue"),
      },
    ],
  },
  // {
  //   path: "/setMapPens",
  //   name: "setMapPens",
  //   component: () => import("../views/setMapView/setMapView.vue"),
  // },
  // {
  //   path: "/lookMapView",
  //   name: "lookMapView",
  //   component: () => import("../views/lookMapView/lookMapView.vue"),
  // },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
