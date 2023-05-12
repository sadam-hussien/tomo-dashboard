import React from "react";

import Dropdown from "react-bootstrap/Dropdown";

import { motion, AnimatePresence } from "framer-motion";

const CustomToggle = React.forwardRef(
  ({ children, onClick, style, classes }, ref) => {
    return (
      <button
        type="button"
        className={`custom-dropdown-toggle-btn bg-transparent border-0 p-0 ${classes}`}
        style={style}
        ref={ref}
        onClick={(e) => {
          e.preventDefault();
          onClick(e);
        }}
      >
        {children}
      </button>
    );
  }
);

const CustomMenu = React.forwardRef(
  (
    {
      children,
      style,
      className,
      "aria-labelledby": labeledBy,
      menuStyle,
      classes,
      motionY = 50,
      motionYInit = 80,
    },
    ref
  ) => {
    return (
      <AnimatePresence>
        {className.includes("show") && (
          <motion.div
            ref={ref}
            style={{ ...style, ...menuStyle }}
            className={`${classes} ${className} custom-dropdown-menu p-0`}
            aria-labelledby={labeledBy}
            initial={{
              y: motionYInit,
              opacity: 0,
            }}
            animate={{
              y: motionY,
              opacity: 1,
            }}
            exit={{
              y: motionYInit,
              opacity: 0,
            }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
);

export default function CustomDropdown({
  toggleChildren,
  toggleStyle,
  toggleClasses,
  menuChildren,
  menuStyle,
  menuClasses,
  motionY,
  motionYInit,
}) {
  return (
    <Dropdown>
      <Dropdown.Toggle
        as={CustomToggle}
        id="dropdown-custom-components"
        style={toggleStyle}
        classes={toggleClasses}
      >
        {toggleChildren}
      </Dropdown.Toggle>

      <Dropdown.Menu
        as={CustomMenu}
        menuStyle={menuStyle}
        classes={menuClasses}
        motionY={motionY}
        motionYInit={motionYInit}
      >
        {menuChildren}
      </Dropdown.Menu>
    </Dropdown>
  );
}
