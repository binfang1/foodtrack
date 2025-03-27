"use client";
import ReactDOM from 'react-dom'
import ItemGrid from "./components/item grid section/grid.js";
import { useState, useEffect } from "react";
import ItemList from "./components/items sections/item-list.js";
import Login from "./components/login/login.js";
import OrderGrid from "./components/order section/order-grid.js";
import Items from "./components/view items/items.js"
import Accounts from "./components/accounts/accounts.js"
import Inventory from './components/inventory/inventory.js';
import BuyMore from './components/functions/buyMore.js';
import History from './components/history/order-grid.js'
import { GoHome } from "react-icons/go";
import { GoNote } from "react-icons/go";
import { GoHistory } from "react-icons/go";
import { GoChecklist } from "react-icons/go";
import { GoGear } from "react-icons/go";
import { GoPerson } from "react-icons/go";
import { GoPulse } from "react-icons/go";
import { GoBriefcase } from "react-icons/go";




import Analytics from './components/analytics/analytics.js';


async function getingredients() {
  const url = "http://localhost:3000/api/raw";
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


async function getData() {
  const url = "http://localhost:3000/api/items";
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
  const [page, setPage] = useState("");
  const [back, setBack] = useState(true);
  const [mainOrder, setMainOrder] = useState();
  const [enableSideBar, sideBarEnabled] = useState(true);
  const [enableItemGrid, itemGridEnabled] = useState(true);
  const [categoryPage, setCategoryPage] = useState("Default");
  const [ingredients, setIngredients] = useState([]);

  function LogOut() {
    setItemsList([]);
    setLoggedIn();
    setPage("");
  }


  useEffect(() => {
    getData().then((response) => setItems(response));
    getingredients().then((response) => setIngredients(response));
  }, [categoryPage]);

  useEffect(() => {
    getAccounts().then((response) => setAccounts(response));
    getingredients().then((response) => setIngredients(response));
    getData().then((response) => setItems(response));
  }, []);

  useEffect(() => {
    setPage(page);
  }, [page]);

  useEffect(() => {
    getingredients().then(function(response) {
      BuyMore(response);
      setIngredients(response);
    })
  }, [page, categoryPage])









  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div className="bg-[#E4E4EF] h-full w-full">
        {loggedIn ? (
          <div className="flex bg-[#E4E4EF] h-[100vh]]">
            <div className="w-[15vw] bg-[#E4E4EF] max-[769px]:w-[30vw]" id = 'darken'>
                <div className="bg-white h-full drop-shadow-md rounded-xl border-solid border-3 border-[#D9D9D9] p-[0.84vw]  flex flex-col">
                    <div className="text-[0.85vw]">
                        <h1 className="text-[#757575]">Welcome, {loggedIn.username}</h1>
                        <h2 className="font-semibold text-[1.1vw] mb-[-0.52vw]">FoodTrack</h2>
                        <hr className="border-[#D9D9D9] my-[1.1vw]"></hr>
                    </div>
                    <div className = "text-[0.94vw] h-full">


                    {loggedIn.type != "Chef" &&
                      <div>
                      <div className='flex'>
                        <GoHome className='mt-auto mb-auto'/>
                        <a onClick = {enableSideBar ? () => setPage("home") : undefined} className="px-[0.84vw] cursor-pointer">Home</a>
                      </div>
                        <hr className="border-[#D9D9D9] my-[1.042vw]"></hr>
                      </div>
                      } 
                        
                      <div className='flex'>
                        <GoChecklist className='mt-auto mb-auto'/>
                        <a onClick = {enableSideBar ? () => setPage("orders") : undefined} className="px-[0.84vw] cursor-pointer">Orders</a>
                      </div>
                        <hr className="border-[#D9D9D9] my-[1.042vw]"></hr>
                    

                      {loggedIn.type != "Chef" &&
                      <div>
                      <div className='flex'>
                        <GoHistory className='mt-auto mb-auto'/>
                        <a onClick = {enableSideBar ? () => setPage("history") : undefined} className="px-[1.042vw] cursor-pointer">History</a>
                      </div>
                        <hr className="border-[#D9D9D9] my-[1.042vw]"></hr>
                      </div>
                      }



                      {(loggedIn.type == "Admin" || loggedIn.type == "Manager") && 
                      <div>
                      <div className='flex'>
                        <GoNote className='mt-auto mb-auto'/>
                        <a onClick = {enableSideBar ? () => setPage("items") : undefined} className="px-[0.84vw] cursor-pointer">Items</a>
                      </div>
                        <hr className="border-[#D9D9D9] my-[1.042vw]"></hr>
                      <div className='flex'>
                        <GoBriefcase className='mt-auto mb-auto'/>
                        <a onClick = {enableSideBar ? () => setPage("inventory") : undefined} className="px-[1.042vw] cursor-pointer">Inventory</a>
                      </div>
                      <hr className="border-[#D9D9D9] my-[1.042vw]"></hr>
                      <div className='flex'>
                        <GoPerson className='mt-auto mb-auto'/>
                        <a onClick = {enableSideBar ? () => setPage("accounts") : undefined} className="px-[1.042vw] cursor-pointer">Accounts</a>
                      </div>
                      <hr className="border-[#D9D9D9] my-[1.042vw]"></hr>
                      <div className='flex'>
                        <GoPulse className='mt-auto mb-auto'/>
                        <a onClick = {enableSideBar ? () => setPage("analytics") : undefined} className="px-[1.042vw] cursor-pointer">Analytics</a>
                      </div>
                      <hr className="border-[#D9D9D9] my-[1.042vw]"></hr>
                      </div>
                       }
                    </div>
                    <div className='flex mb-[1.25vw] text-[0.94vw]'>
                        <GoGear className='mt-auto mb-auto'/>
                        <a className="px-[0.84vw] cursor-pointer" onClick = {enableSideBar ? () => LogOut() : undefined}>Log Out</a>
                      </div>
                </div>
            </div>
            {page == "home" &&
              <div>
                  <div className="flex max-[769px]:hidden">
                    <ItemGrid categoryPage = {categoryPage} setCategoryPage = {setCategoryPage} enableItemGrid = {enableItemGrid} itemGridEnabled = {itemGridEnabled} items={items}  setItemsList={setItemsList} itemsList={itemsList}></ItemGrid>
                    <ItemList categoryPage = {categoryPage} setCategoryPage = {setCategoryPage} setPage = {setPage} enableItemGrid = {enableItemGrid} itemGridEnabled = {itemGridEnabled} sideBarEnabled = {sideBarEnabled} enableSideBar = {enableSideBar} itemsList={itemsList} setItemsList={setItemsList} subTotal={subTotal} tax={tax} total={total} setSubTotal={setSubtotal} setTax={setTax} setTotal={setTotal} mainOrder={mainOrder} setMainOrder={setMainOrder}></ItemList>
                  </div>
                  <div className='hidden max-[769px]:block'>
                    {back ? (
                      <ItemGrid categoryPage = {categoryPage} setCategoryPage = {setCategoryPage} enableItemGrid = {enableItemGrid} itemGridEnabled = {itemGridEnabled} items={items} setItemsList={setItemsList} itemsList={itemsList}></ItemGrid>
                    ) : (
                      <ItemList categoryPage = {categoryPage} setCategoryPage = {setCategoryPage} setPage = {setPage} enableItemGrid = {enableItemGrid} itemGridEnabled = {itemGridEnabled} sideBarEnabled = {sideBarEnabled} enableSideBar = {enableSideBar} itemsList={itemsList} setItemsList={setItemsList} subTotal={subTotal} tax={tax} total={total} setSubTotal={setSubtotal} setTax={setTax} setTotal={setTotal} mainOrder={mainOrder} setMainOrder={setMainOrder}></ItemList>
                    )}
                  </div>
              </div>
            }
            {page == "orders" &&
              <div>
                <OrderGrid page={page} setPage={setPage} categoryPage={categoryPage} setCategoryPage={setCategoryPage} mainOrder={mainOrder} setMainOrder={setMainOrder} setItemsList={setItemsList} itemsList={itemsList} items={items}></OrderGrid>
              </div>
            }
            {page == "items" &&
              <div>
                <Items categoryPage = {categoryPage} setCategoryPage = {setCategoryPage} enableSideBar = {enableSideBar} sideBarEnabled = {sideBarEnabled} items={items} setItemsList={setItemsList} itemsList={itemsList} page = {page} setPage = {setPage} setItems={setItems} setIngredients={setIngredients} ingredients={ingredients}></Items>
              </div>

            }
            {page == "inventory" &&
              <div>
                <Inventory setCategoryPage = {setCategoryPage} ingredients = {ingredients} setIngredients = {setIngredients}></Inventory>
              </div>
            }
            {page == "history" &&
              <div>
                <History page={page} setPage={setPage} categoryPage={categoryPage} setCategoryPage={setCategoryPage} mainOrder={mainOrder} setMainOrder={setMainOrder} setItemsList={setItemsList} itemsList={itemsList} items={items}></History>
              </div>
            }
            {page == "accounts" && 
              <div>
                <Accounts accounts = {accounts} setAccounts={setAccounts}></Accounts>
              </div>
            }
            {page == "analytics" && 
              <div className='w-full'>
                <Analytics></Analytics>
              </div>
            }
          </div>
        ) : (
          <Login page = {page} setPage = {setPage} loggedIn = {loggedIn} setLoggedIn = {setLoggedIn} accounts = {accounts}></Login>
        )}
       
      </div>
    </div>
  );
}
