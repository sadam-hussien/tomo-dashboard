import { Coaches, Coach } from "./pages";

const routes = [
  {
    component: Coaches,
    path: "/coaches",
  },
  {
    component: Coach,
    path: "/coaches/:id",
    boxed: true,
  },
];

export default routes;
