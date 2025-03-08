"use client";

import Header from "../components/header";
import OrderGrid from "../components/order-grid";
import Sidebar from "../components/sidebar";

export default function Orders() {
    return (
        <div className="flex flex-col bg-sky-150 h-screen">
          <Header></Header>
          <div className="flex bg-sky-50 h-full">
            <Sidebar></Sidebar>
            <OrderGrid></OrderGrid>
          </div>
        </div>
      );
}
