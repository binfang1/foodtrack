"use client";

import OrderItem from "./order-item";
import { useState, useEffect } from "react";

async function getData() {
    const url = "http://localhost:3000/api/orders/completed";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const json = await response.json();

      return json;
    } catch (error) {
      console.error(error.message);
    }
  }

export default function History({loggedIn, page, setPage, categoryPage, setCategoryPage, mainOrder, setMainOrder, itemsList, setItemsList, items }) {

    const [orders, setOrders] = useState([]);
    useEffect(() => {
      getData().then((response) => setOrders(response))
    }, []);

    useEffect(() => {
      setOrders(orders)
    }, [orders]);

    useEffect(() => {
      getData().then((response) => setOrders(response))
      }, [categoryPage]);

    return (
        <div className="p-[1.5vw] w-[85vw] h-[100vh]  grid-rows-2 gap-4 bg-white drop-shadow-md rounded-xl border-solid border-3 border-[#D9D9D9]">
            <div className="">
                <div className="overflow-auto flex flex-wrap gap-[2vw] max-h-[94vh] h-[100%] rounded-md border-solid border-gray-300 border-1 p-[0.8vw]">
                  {orders.map((order, index) => ( 
                      order.status == "Completed" ? (
                      <div key = {index}>
                          <OrderItem loggedIn = {loggedIn} setMainOrder = {setMainOrder} orders = {orders} setOrders = {setOrders} order = {order} setCategoryPage = {setCategoryPage} setPage = {setPage} setItemsList={setItemsList} itemsList={itemsList} items = {items}></OrderItem>
                      </div>
                    ) : ("")))}
                </div>
            </div>
        </div>
    );
}