"use client";

import OrderItem from "./order-item";
import { useState, useEffect } from "react";

async function getData() {
    const url = "http://localhost:3000/api/orders";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const json = await response.json();
      console.log(json);
      return json;
    } catch (error) {
      console.error(error.message);
    }
  }

export default function OrderGrid({ enableSideBar, sideBarEnabled, mainOrder, setMainOrder }) {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
    getData().then((response) => setOrders(response))
    }, []);

    return (
        <div className="p-[16px] w-[85vw] h-[100vh] grid grid-cols-6 grid-rows-2 gap-4 bg-white drop-shadow-md rounded-xl border-solid border-3 border-[#D9D9D9]">
                {orders.map((order, index) => (
                    <div key = {index}>
                        <OrderItem order = {order}></OrderItem>
                    </div>
                ))}
        </div>
    );
}