"use client";

import Header from "../components/header";
import OrderGrid from "../components/order-grid";
import Sidebar from "../components/sidebar";

export default function Orders() {
    return (
        <div className="flex h-screen">
          <div className="flex w-full h-full">
            <Sidebar></Sidebar>
            <OrderGrid></OrderGrid>
          </div>
        </div>
      );
}
