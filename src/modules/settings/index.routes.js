import { Main, Profile } from "./pages";

const routes = [
  {
    component: Main,
    path: "/settings",
    children: [
      {
        component: Profile,
        path: "",
        index: true,
      },
      {
        path: "profile",
        component: Profile,
      },
    ],
  },
];

export default routes;
