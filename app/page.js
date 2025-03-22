"use client";
import ReactDOM from 'react-dom'
import ItemGrid from "./components/item list section/grid.js";
import { useState, useEffect } from "react";
import ItemList from "./components/items sections/item-list.js";
import Login from "./components/login/login.js";
import OrderGrid from "./components/order section/order-grid.js";
import Settings from "./components/settings/settings.js";
import Items from "./components/view items/items.js"
import { GoHome } from "react-icons/go";
import { GoNote } from "react-icons/go";
import { GoHistory } from "react-icons/go";
import { GoChecklist } from "react-icons/go";
import { GoGear } from "react-icons/go";
import Head from 'next/head'





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
  const [back, setBack] = useState(true);
  const [width, setWidth] = useState(500);

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
    console.log(width)
  }, [page]);







  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div className="bg-[#E4E4EF] h-full w-full">
        {loggedIn ? (
          <div className="flex bg-[#E4E4EF] h-[100vh]]">
            <div className="w-[15vw] bg-[#E4E4EF] max-[769px]:w-[30vw]" id = 'darken'>
                <div className="bg-white h-full drop-shadow-md rounded-xl border-solid border-3 border-[#D9D9D9] p-[0.84vw]  flex flex-col">
                    <div className="text-[0.85vw]">
                        <h1 className="text-[#757575]">Welcome, {loggedIn.username}</h1>
                        <h2 className="font-semibold text-[1.1vw] mb-[-0.52vw] cursor-pointer" onClick = {() => setPage("home")}>FoodTrack</h2>
                        <hr className="border-[#D9D9D9] my-[1.1vw]"></hr>
                    </div>
                    <div className = "text-[0.94vw] h-full">

                      <div className='flex'>
                        <GoHome className='mt-auto mb-auto'/>
                        <a onClick = {() => setPage("home")} className="px-[0.84vw] cursor-pointer">Home</a>
                      </div>
                        <hr className="border-[#D9D9D9] my-[1.042vw]"></hr>
                        
                      <div className='flex'>
                        <GoChecklist className='mt-auto mb-auto'/>
                        <a onClick = {() => setPage("orders")} className="px-[0.84vw] cursor-pointer">Orders</a>
                      </div>
                        <hr className="border-[#D9D9D9] my-[1.042vw]"></hr>

                      <div className='flex'>
                        <GoNote className='mt-auto mb-auto'/>
                        <a onClick = {() => setPage("items")} className="px-[0.84vw] cursor-pointer">Add Items</a>
                      </div>
                        <hr className="border-[#D9D9D9] my-[1.042vw]"></hr>

                      <div className='flex'>
                        <GoHistory className='mt-auto mb-auto'/>
                        <a className="px-[1.042vw] cursor-pointer">History</a>
                      </div>
                        <hr className="border-[#D9D9D9] my-[1.042vw]"></hr>
                    </div>
                    <div className='flex mb-[1.25vw] text-[0.94vw]'>
                        <GoGear className='mt-auto mb-auto'/>
                        <a className="px-[0.84vw] cursor-pointer" onClick = {() => setPage("settings")}>Settings</a>
                      </div>
                </div>
            </div>
            {page == "home" &&
              <div>
                  <div className="flex max-[769px]:hidden">
                    <ItemGrid items={items} setItemsList={setItemsList} itemsList={itemsList}></ItemGrid>
                    <ItemList itemsList={itemsList} setItemsList={setItemsList} subTotal={subTotal} tax={tax} total={total} setSubTotal={setSubtotal} setTax={setTax} setTotal={setTotal}></ItemList>
                  </div>
                  <div className='hidden max-[769px]:block'>
                    {back ? (
                      <ItemGrid items={items} setItemsList={setItemsList} itemsList={itemsList}></ItemGrid>
                    ) : (
                      <ItemList itemsList={itemsList} setItemsList={setItemsList} subTotal={subTotal} tax={tax} total={total} setSubTotal={setSubtotal} setTax={setTax} setTotal={setTotal}></ItemList>
                    )}
                  </div>
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
