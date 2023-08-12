import { Auth, Login } from "./pages";

const routes = [
  {
    component: Auth,
    path: "/auth",
    children: [
      {
        component: Login,
        index: true,
      },
      {
        component: Login,
        path: "login",
      },
    ],
  },
];

export default routes;
