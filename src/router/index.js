import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Factura from "../views/Factura.vue";
import Nueva from "../views/Nueva.vue";
import Editar from "../views/Editar.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/factura/:id",
    name: "Factura",
    component: Factura,
  },
  {
    path: "/editar/:id",
    name: "Editar",
    component: Editar,
  },
  {
    path: "/nueva",
    name: "Nueva",
    component: Nueva,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
