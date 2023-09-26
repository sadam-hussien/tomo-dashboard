import { Clients, Client } from "./pages";

const routes = [
  {
    component: Clients,
    path: "/clients",
  },
  {
    component: Client,
    path: "/clients/:id",
    boxed: true,
  },
];

export default routes;
