import { Main, Profile, Subscriptions } from "./pages";

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

      // {
      //   path: "schedule",
      //   component: Schedule,
      // },
    ],
  },
];

export default routes;
