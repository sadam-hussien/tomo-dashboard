import React from "react";

import Sidebar from "../components/sidebar";

import Header from "../components/header";

import Content from "../components/content";

import MenuList from "../components/sidebar/MenuList";

import { useSocket } from "hooks";

export default function Layout({ children, ...data }) {
  // socket setup hook
  useSocket();

  return (
    <div
      className="d-flex flex-column"
      style={{
        minHeight: "calc(100vh - (var(--header-height) + var(--space-md) * 2)",
      }}
    >
      <Sidebar>
        <MenuList />
      </Sidebar>
      <Header />
      <Content {...data}>{children}</Content>
    </div>
  );
}
