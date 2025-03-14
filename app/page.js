"use client";

import Header from "./components/header.js";
import Sidebar from "./components/sidebar.js";
import ItemGrid from "./components/grid.js";
import { useState, useEffect } from "react";
import ItemList from "./components/item-list.js";

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

export default function Home() {
  const [items, setItems] = useState([]);
  const [itemsList, setItemsList] = useState([]);
  const [subTotal, setSubtotal] = useState(0.00);
  const [tax, setTax] = useState(0.00);
  const [total, setTotal] = useState(0.00);

  useEffect(() => {
    getData().then((response) => setItems(response))
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex bg-[#E4E4EF] h-full">
        <Sidebar></Sidebar>
        <ItemGrid items={items} setItemsList={setItemsList} itemsList={itemsList}></ItemGrid>
        <ItemList itemsList={itemsList} setItemsList={setItemsList} subTotal={subTotal} tax={tax} total={total} setSubTotal={setSubtotal} setTax={setTax} setTotal={setTotal}></ItemList>
      </div>
    </div>
  );
}
