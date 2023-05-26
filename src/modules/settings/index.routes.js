import { Main, Profile, Schedule, Security } from "./pages";

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
        path: "security",
        component: Security,
      },

      {
        path: "schedule",
        component: Schedule,
      },
    ],
  },
];

export default routes;
