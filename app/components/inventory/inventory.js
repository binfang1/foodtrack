"use client";
import Create from "./creation";
import { useState, useEffect } from "react";
import { GoPencil } from "react-icons/go";

async function getIngredients() {
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

export default function Inventory({ setCategoryPage, ingredients, setIngredients}) {
    const [currentItem, setCurrentItem] = useState();
    const [editTitle, setEditTitle] = useState("")
    const [price, setPrice] = useState(0.00);
    const [name, setName] = useState("");
    const [stock, setStock] = useState(1);
    const [page, setPage] = useState("");
    const [threshold, setThreshold] = useState("");
    const [id, setId] = useState("")
    const [buy, setBuy] = useState("")

    useEffect(() => {
        getData().then((response) => setIngredients(response))
    }, [page]);

    const change = () => {
        setPage("Create");
        setEditTitle("Add Ingredient")
        setName("");
        setPrice("");
        setStock("");
        setThreshold("");
        setId("");
        setBuy("");
    }

    const edit = (data) => {
        setPage("Create");
        setEditTitle(`Editing "${data.name}"`)
        setName(data.name);
        setPrice(data.price);
        setStock(data.stock);
        setThreshold(data.threshold);
        setId(data.id);
        setBuy(data.buy_amount);
    }



    return (
        <div className="relative h-[100vh] w-[85vw] bg-white h-full drop-shadow-md rounded-xl border-solid border-3 border-[#D9D9D9]">
            {page != "Create" && 
            <div className="p-[0.8vw] h-[100vh] flex flex-col bg-white rounded-xl" >
                <div className="mb-[0.8vw]">
                    <div className="grid grid-cols-7 text-[0.9vw]">
                        <p>Name:</p>
                        <p>Price:</p>
                        <p>Stock:</p>
                        <p>Threshold</p>
                        <p>Buy Amount</p>
                        <p>Status</p>
                        <p className="invisible">a</p>
                    </div>
                    <hr></hr>
                </div>
                <div className="overflow-auto">
                    <div>
                    <div className="flex flex-col">
                            {ingredients.map(ingredient => (
                                <div key={ingredient.id}>
                                    <div className = "mt-[0.8vw] h-[3vw] grid grid-cols-7 bg-white text-black text-black text-[0.9vw]">
                                        <p className="text-[0.9vw] capitalize"> {ingredient.name} </p>
                                        <p className="text-[0.9vw]">${ingredient.price.toFixed(2)} </p>
                                        <p className="text-[0.9vw]">{ingredient.stock.toFixed(1)}</p>
                                        <p className="text-[0.9vw]">{ingredient.threshold}</p>
                                        <p className="text-[0.9vw]"> {ingredient.buy_amount} </p>
                                        {ingredient.stock > ingredient.threshold && (
                                            <p className="text-[0.9vw]">In Stock</p>
                                        )}
                                          {ingredient.stock <= ingredient.threshold && (
                                            <p className="text-[0.9vw] text-red-400">Low Stock</p>
                                        )}
                                        <GoPencil className="cursor-pointer hover:underline ml-auto mr-[1vw] text-[0.9vw]" onClick = {() => edit(ingredient)}/>
                                    </div>
                                    <hr className="bg-gray-200 h-[0.1vw] border-0"></hr>
                                </div>
                                
                            ))}
                        </div>
                    </div>    
                        
                </div>
                <button onClick={change} className="mt-auto mb-[1.5vw] cursor-pointer bg-white rounded-xl border-solid border-3 border-[#D9D9D9] text-gray-500 rounded-lg shadow-md h-[3vw] text-[2vw]">+</button>
            </div>
            }
            {page ? (
                <div>
                    <Create currentItem ={currentItem} editTitle={editTitle} price={price} setPrice={setPrice} name={name} setName={setName} stock={stock}
                    setStock={setStock} setPage={setPage} threshold={threshold} setThreshold={setThreshold} id={id} setId={setId} buy={buy} setBuy={setBuy}></Create>
                </div>
            ) : ("")}
        </div>
    );
}