"use client";
import GridItem from "../item grid section/grid-item"
import { useState, useEffect } from "react";

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

    }

    const edit = (data) => {

    }



    return (
        <div className="relative h-[100vh] w-[85vw] bg-white h-full drop-shadow-md rounded-xl border-solid border-3 border-[#D9D9D9]">
            {page != "Create" && 
            <div className="p-[0.8vw] h-[100vh] flex flex-col bg-white rounded-xl" >
                <div className="overflow-auto">
                    <div>
                    <div className="flex flex-col">
                        <div className="mb-[0.8vw]">
                            <div className="grid grid-cols-7 text-[0.9vw]">
                                <p>Name:</p>
                                <p>price:</p>
                                <p>Stock:</p>
                                <p>Threshold</p>
                                <p>Buy Amount</p>
                                <p>Automatic</p>
                                <p className="invisible">a</p>
                            </div>
                            <hr></hr>
                        </div>
                            {ingredients.map(ingredient => (
                                <div key={ingredient.id}>
                                    <div className = "mt-[0.8vw] h-[3vw] grid grid-cols-7 bg-white text-black text-black text-[0.9vw]">
                                        <p className="text-[0.9vw]"> {ingredient.name} </p>
                                        <p className="text-[0.9vw]">${ingredient.price.toFixed(2)} </p>
                                        <p className="text-[0.9vw]">{ingredient.stock}</p>
                                        <p className="text-[0.9vw]">{ingredient.threshold}</p>
                                        <p className="text-[0.9vw]"> {ingredient.buy_amount} </p>
                                        <p className="text-[0.9vw]"> {ingredient.automatic} </p>
                                        <p className="cursor-pointer hover:underline ml-auto mr-[1vw] text-[0.9vw]" onClick = {() => edit(item)}>Edit</p>
                                    </div>
                                    <hr className="bg-gray-200 h-[0.1vw] border-0"></hr>
                                </div>
                                
                            ))}
                        </div>
                    </div>    
                        
                </div>
                <button className="mt-auto mb-[1.5vw] cursor-pointer bg-white rounded-xl border-solid border-3 border-[#D9D9D9] text-black rounded-lg shadow-md h-[3vw] text-[0.9vw]">Add Ingredient</button>
            </div>
            }
            {page ? (
                <div>
                    <Create accounts={accounts} setAccounts={setAccounts} setPage={setPage} page={page} name = {name} password = {password} type = {type} setName = {setName} setPassword = {setPassword} setType = {setType} id = {id} setId = {setId} editTile={editTitle}></Create>
                </div>
            ) : ("")}
        </div>
    );
}