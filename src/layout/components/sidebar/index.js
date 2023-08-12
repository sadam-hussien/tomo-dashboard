import React, { useState, useEffect, useRef } from "react";

import { useTranslation } from "react-i18next";

// import { Logo } from "components";

export default function Sidebar({ children }) {
  const { i18n } = useTranslation(["sidebar"]);
  const { language } = i18n;
  const asideRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState({
    sidebarWidthLg: null,
    sidebarWidthSm: null,
  });

  // initial get the sidebar variables
  // -> this step because i dont write the width manualy i want to get it from css variables
  useEffect(() => {
    const sidebarWidthLg = getComputedStyle(document.documentElement)
      .getPropertyValue("--sidebar-width")
      .trim();
    const sidebarWidthSm = getComputedStyle(document.documentElement)
      .getPropertyValue("--sidebar-width-sm")
      .trim();

    setSidebarWidth({
      sidebarWidthLg,
      sidebarWidthSm,
    });
  }, []);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
    // get element width
    const asideWidth = getComputedStyle(asideRef.current).width;
    if (asideWidth === sidebarWidth.sidebarWidthLg) {
      document.documentElement.style.setProperty(
        "--sidebar-width",
        sidebarWidth.sidebarWidthSm
      );
    } else {
      document.documentElement.style.setProperty(
        "--sidebar-width",
        sidebarWidth.sidebarWidthLg
      );
    }
  };

  return (
    <aside
      ref={asideRef}
      className={`fixed-top sidebar d-flex flex-column ${
        isOpen ? "is-open" : ""
      } `}
    >
      {children}
    </aside>
  );
}
