import React from "react";
import { Outlet } from "react-router-dom";

const LayoutAmin = () => {
  return (
    <div>
      <Outlet></Outlet>
    </div>
  );
};

export default LayoutAmin;
