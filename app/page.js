"use client";

import Header from "./components/header.js";
import Sidebar from "./components/sidebar.js";
import ItemGrid from "./components/item list section/grid.js";
import { useState, useEffect } from "react";
import ItemList from "./components/items sections/item-list.js";
import Login from "./components/login/login.js";
import OrderGrid from "./components/order section/order-grid.js";
import Settings from "./components/settings/settings.js";
import Items from "./components/view items/items.js"

async function getData() {
  const url = "http://localhost:3000/api/items";
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

async function getAccounts() {
  const url = "http://localhost:3000/api/accounts";
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

export default function Home() {
  const [items, setItems] = useState([]);
  const [itemsList, setItemsList] = useState([]);
  const [subTotal, setSubtotal] = useState(0.00);
  const [tax, setTax] = useState(0.00);
  const [total, setTotal] = useState(0.00);
  const [accounts, setAccounts] = useState([]);
  const [loggedIn, setLoggedIn] = useState();
  const [page, setPage] = useState("home");

  useEffect(() => {
    getAccounts().then((response) => setAccounts(response))
    getData().then((response) => setItems(response))
  }, [page]);

  useEffect(() => {
    getAccounts().then((response) => setAccounts(response))
    getData().then((response) => setItems(response))
  }, []);

  useEffect(() => {
    setPage(page);
  }, [page]);



  return (
    <div className="flex flex-col h-screen">
      <div className="bg-[#E4E4EF] h-full">
        {loggedIn ? (
          <div className="flex bg-[#E4E4EF] h-full">
            <div className="w-[220px] bg-[#E4E4EF]">
                <div className="bg-white h-full drop-shadow-md rounded-xl border-solid border-3 border-[#D9D9D9] p-[8px]  flex flex-col">
                    <div className="px-[8px] text-[14px]">
                        <h1 className="text-[#757575]">Welcome: {loggedIn.username}</h1>
                        <h2 className="font-semibold text-[20px] mb-[-10px] cursor-pointer" onClick = {() => setPage("home")}>FoodTrack</h2>
                        <hr className="border-[#D9D9D9] my-[20px]"></hr>
                    </div>
                    <div className = "text-[18px] h-[880px]">
                        <a onClick = {() => setPage("home")} className="px-[8px] cursor-pointer">Home</a>
                        <hr className="border-[#D9D9D9] my-[20px] mx-[8px]"></hr>
                        <a onClick = {() => setPage("items")} className="px-[8px] cursor-pointer">Add Items</a>
                        <hr className="border-[#D9D9D9] my-[20px] mx-[8px]"></hr>
                        <a onClick = {() => setPage("orders")} className="px-[8px] cursor-pointer">Orders</a>
                        <hr className="border-[#D9D9D9] my-[20px] mx-[8px]"></hr>
                        <a className="px-[8px] cursor-pointer">History</a>
                        <hr className="border-[#D9D9D9] my-[20px] mx-[8px]"></hr>
                    </div>
                    <a className="px-[8px] mb-[24px] cursor-pointer" onClick = {() => setPage("settings")}>Settings</a>
                </div>
            </div>
            {page == "home" &&
              <div className="flex">
                <ItemGrid items={items} setItemsList={setItemsList} itemsList={itemsList}></ItemGrid>
                <ItemList itemsList={itemsList} setItemsList={setItemsList} subTotal={subTotal} tax={tax} total={total} setSubTotal={setSubtotal} setTax={setTax} setTotal={setTotal}></ItemList>
              </div>
            }
            {page == "orders" &&
              <div>
                <OrderGrid></OrderGrid>
              </div>
            }
            {page == "items" &&
              <div>
                <Items items={items} setItemsList={setItemsList} itemsList={itemsList}></Items>
              </div>

            }
            {page == "history"

            }
            {page == "settings" && 
              <div>
                <Settings setLoggedIn = {setLoggedIn} setItemsList = {setItemsList} setPage = {setPage}></Settings>
              </div>
            }
            
          </div>
        ) : (
          <Login loggedIn = {loggedIn} setLoggedIn = {setLoggedIn} accounts = {accounts}></Login>
        )}
       
      </div>
    </div>
  );
}
