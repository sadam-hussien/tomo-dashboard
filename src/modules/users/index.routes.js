import { Users, User } from "./pages";

const routes = [
  {
    component: Users,
    path: "/users",
    
  },
  {
    component: User,
    path: "/users/:id",
    boxed: true,
  },
];

export default routes;
