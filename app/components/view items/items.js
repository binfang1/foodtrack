"use client";
import GridItem from "../../components/item list section/grid-item"
import { useState, useEffect } from "react";

export default function Items({ items, itemsList, setItemsList }) {
    const [popupEnabled, popupIsEnabled] = useState(false);
    const [currentItem, setCurrentItem] = useState();
    const [editTitle, setEditTitle] = useState("")
    const [price, setPrice] = useState(0.00);
    const [name, setName] = useState("");


    async function putData() {
        const url = "http://localhost:3000/api/items";
        try {
          const response = await fetch(url , {
            'method': 'PUT',
            'body': JSON.stringify(
                {  
                    name: name,
                    price: price,
                    desc: currentItem.description,
                    id: currentItem.id
                },
              )
          });
          if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
          }
      
          const json = await response.json();
          return json;
        } catch (error) {
          console.error(error.message);
        }
    }

    async function postData() {
        const url = "http://localhost:3000/api/items";
        try {
            const response = await fetch(url , {
            'method': 'POST',
            'body': JSON.stringify(
                {  
                    name: name,
                    price: price,
                    desc: "Test Desc"
                },
                )
            });
            if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
            }
        
            const json = await response.json();
            return json;
        } catch (error) {
            console.error(error.message);
        }
    }

    const editItem = (event) => {
        event.preventDefault();
        putData().then((response) => alert("Item Has Been Updated!"));
        setItemsList([]);
    }

    const addItem = (event) => {
        event.preventDefault();
        postData().then((response) => alert("Item Has Been Added!"));
        setItemsList([]);
    }

    const getName = (event) => {
        event.preventDefault();
        setName(event.target.value);
    };

    const getPrice = (event) => {
        event.preventDefault();
        setPrice(event.target.value);
    };

    const openPopupEdit = (item) => {
        popupIsEnabled(!popupEnabled);
        setEditTitle("Editing")
        setName("");
        setPrice(0);
        setCurrentItem(item)
    }

    const openPopupAdd = () => {
        popupIsEnabled(!popupEnabled);
        setEditTitle("Adding")
        setName("");
        setPrice(0);
        setCurrentItem()
    }



    return (
        <div className="relative p-[16px] w-[85vw] flex flex-col bg-white h-full drop-shadow-md rounded-xl border-solid border-3 border-[#D9D9D9]">
            <button  onClick = {openPopupAdd} className="cursor-pointer bg-white drop-shadow-md rounded-xl border-solid border-3 border-[#D9D9D9] text-black rounded-lg shadow-md h-12">Add Item</button>
            {items.map(item => (
                <div className = "flex mt-4 p-2 bg-white drop-shadow-md rounded-xl border-solid border-3 border-[#D9D9D9] text-black rounded-lg shadow-md w-96 h-16" key={item.id}>
                    <div>
                        <p>Name: {item.name} </p>
                        <p>Price:${item.price.toFixed(2)}</p>
                    </div>
                    <p className="cursor-pointer ml-auto justify-self-center hover:underline" onClick = {() => openPopupEdit(item)}>edit</p>
                </div>
            ))}
            {popupEnabled ? (
                        <main className = "absolute bottom-0 left-0 top-0 right-0 flex justify-center items-center w-[85vw] bg-slate-950/50">
                            <div className ="flex flex-col absolute p-12 max-w-[400px] w-full h-full max-h-[500px] bg-white">
                                <div className="flex justify-end">
                                    <button className="cursor-pointer text-black text-3xl w-10 h-10" onClick = {() => popupIsEnabled(false)}>X</button>
                                </div>
                                <h1 className="text-black text-2xl mb-4">{editTitle} "{currentItem ? currentItem.name : "New Item"}"</h1>
                                {editTitle == "Editing" &&
                                    <form onSubmit={editItem} className="flex flex-col gap-[20px]">
                                        <div>
                                            <p>Old Name: "{currentItem.name}"</p>
                                            <label>New Name:
                                                <input  onChange={getName} className = "border-gray-500 border-2 pl-[2px] pr-[2px] text-black"  value = {name} type="text"/>
                                            </label>
                                        </div>

                                        <div>
                                            <p>Old Price: "${currentItem.price.toFixed(2)}"</p>
                                            <label>New Price:
                                                <input onChange={getPrice} className = "border-gray-500 border-2 pl-[2px] pr-[2px] text-black"  value = {price} type="number"/>
                                            </label>
                                        </div>
                                        
                                        <input className="cursor-pointer m-auto bg-white drop-shadow-md rounded-xl border-solid border-3 border-[#D9D9D9] text-black rounded-lg shadow-md w-32 h-12" type = "submit" value = "Save Changes"/>
                                    </form>
                                }
                                {editTitle == "Adding" &&
                                    <form onSubmit={addItem} className="flex flex-col gap-[20px]">
                                        <div>
                                            <label>Name:
                                                <input required onChange={getName} className = "border-gray-500 border-2 pl-[2px] pr-[2px] text-black"  value = {name} type="text"/>
                                            </label>
                                        </div>

                                        <div>
                                            <label>Price:
                                                <input required onChange={getPrice} className = "border-gray-500 border-2 pl-[2px] pr-[2px] text-black"  value = {price} type="number"/>
                                            </label>
                                        </div>
                                        <input className="cursor-pointer m-auto bg-white drop-shadow-md rounded-xl border-solid border-3 border-[#D9D9D9] text-black rounded-lg shadow-md w-32 h-12" type = "submit" value = {currentItem ? "Save Changes" : "Save Item"}/>
                                    </form>
                                }
                            </div>
                        </main>
                    ) : ("")}
                </div>
    );
}