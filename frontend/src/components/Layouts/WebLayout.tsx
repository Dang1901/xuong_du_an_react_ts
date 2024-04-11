import React from "react";
import Header from "../Header";
import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import { Banner, Blog, Services, Shop } from "..";

const WebLayout = () => {
  return (
    <div>
      <Header />
      <Banner />
      <main className="container">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default WebLayout;
