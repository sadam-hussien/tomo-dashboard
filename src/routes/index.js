import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedPage from "./ProtectedPage";

import authRoutes from "modules/auth/index.routes";

import homeRoutes from "modules/home/index.routes";

import programsRoutes from "modules/programs/index.routes";

import clientsRoutes from "modules/clients/index.routes";

import usersRoutes from "modules/users/index.routes";

import coachesRoutes from "modules/coaches/index.routes";

import subscriptionsRoutes from "modules/subscriptions/index.routes";

import chatRoutes from "modules/chat/index.routes";

import settingsRoutes from "modules/settings/index.routes";

import blogsRoutes from "modules/blogs/index.routes";

const routers = [
  ...authRoutes,
  ...homeRoutes,
  ...programsRoutes,
  ...clientsRoutes,
  ...usersRoutes,
  ...coachesRoutes,
  ...subscriptionsRoutes,
  ...chatRoutes,
  ...settingsRoutes,
  ...blogsRoutes,
];

export default function Navigator() {
  return (
    <BrowserRouter>
      <Routes>
        {routers.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={
              <ProtectedPage data={route}>
                <route.component />
              </ProtectedPage>
            }
          >
            {route.children &&
              route.children.map((children, idx) => (
                <Route
                  key={idx}
                  path={children.path}
                  element={<children.component />}
                  index={children.index}
                />
              ))}
          </Route>
        ))}
      </Routes>
    </BrowserRouter>
  );
}
