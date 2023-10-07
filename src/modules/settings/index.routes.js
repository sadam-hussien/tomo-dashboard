import { Main, Profile, Subscriptions, Sessions } from "./pages";

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
        component: Profile,
        path: "profile",
      },
      {
        path: "subscriptions",
        component: Subscriptions,
      },
      {
        path: "sessions",
        component: Sessions,
      },

      // {
      //   path: "schedule",
      //   component: Schedule,
      // },
    ],
  },
];

export default routes;
