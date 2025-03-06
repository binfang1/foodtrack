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
  const [items, setItems] = useState([{id: 0, name: "Placeholder", price: 0.00}]);

  useEffect(() => {
    getData().then((response) => setItems(response))
  }, []);

  return (
    <div className="flex flex-col bg-sky-150 h-screen">
      <Header></Header>
      <div className="flex bg-sky-50 h-full">
        <Sidebar></Sidebar>
        <ItemGrid items={items}></ItemGrid>
        <ItemList></ItemList>
      </div>
    </div>
  );
}
