import { useEffect, useState } from "react";
import { IconName } from "react-icons/go";
import { GoMoveToStart } from "react-icons/go";

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



export default function Create({currentItem, editTile, price, setPrice, name, setName, stock, setStock, setPage, threshold, setThreshold, id, setId, buy, setBuy}) {
    
    
    async function updateItem(item) {
        const url = "http://localhost:3000/api/items";

        try {
           
          const response = await fetch(url , {
            'method': 'PUT',
            'body': JSON.stringify(
                {  
                    name: item.name,
                    price: item.price,
                    category: item.category,
                    ingredients: JSON.stringify(item.ingredients),
                    ingredient_num: JSON.stringify(item.ingredient_num),
                    id: item.id
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

    async function reinventory (list) {
        try {
            for (const item of list) {
                await updateItem(item);
            }
        } catch (error) {
            console.error(error.message);
        }
    }
    
    
    async function putData() {
        const url = "http://localhost:3000/api/raw";
        try {
          const response = await fetch(url , {
            'method': 'PUT',
            'body': JSON.stringify(
                {  
                    name: name, 
                    price: price, 
                    threshold: threshold, 
                    stock: stock, 
                    buy_amount: buy,
                    id: id
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
        const url = "http://localhost:3000/api/raw";
        try {
            const response = await fetch(url , {
            'method': 'POST',
            'body': JSON.stringify(
                {  
                    name: name, 
                    price: price, 
                    threshold: threshold, 
                    stock: stock, 
                    buy_amount: buy
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

    async function deleteData() {
        const url = "http://localhost:3000/api/raw";
        try {
            const response = await fetch(url , {
            'method': 'DELETE',
            'body': JSON.stringify(
                {  
                    id: id
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
    
    
    const getName = (event) => {
        setName(event.target.value);
    };

    const getStock = (event) => {
        setStock(event.target.value);
    };

    const getThreshold = (event) => {
        setThreshold(event.target.value);
    }

    const getPrice = (event) => {
        setPrice(event.target.value);
    }

    const getBuy = (event) => {
        setBuy(event.target.value);
    }

    const back = () => {
        setPage("");
        setName("");
        setPrice("");
        setStock("");
        setThreshold("");
        setId("");
        setBuy("");
    }

    const saveChanges = () => {
        event.preventDefault();
        putData().then((response) => console.log("Account Updated"))
        back()
    }

    const addItem = () => {
        event.preventDefault();
        postData().then((response) => console.log("Account added"));
        back()
    }

    const deleteItem = () => {
        event.preventDefault();
        getData().then(function(response) {
            var list = []
            for (let i = 0; i < response.length; i++) {
                var ingredient_check = JSON.parse(response[i].ingredients);
                var ingredient_check_num = JSON.parse(response[i].ingredient_num);
                for (let j = 0; j < ingredient_check.length; j++) {
                    if (ingredient_check[j] == name) {
                        let index = ingredient_check.indexOf(name);
                        ingredient_check.splice(index, 1);
                        ingredient_check_num.splice(index, 1);
                        response[i].ingredients = ingredient_check;
                        response[i].ingredient_num = ingredient_check_num;
                        list.push(response[i]);
                        break
                    }
                }
            }
            reinventory(list).then(deleteData().then(function() {
                alert("meme");
                back()
            }));
        }); 
    }
    


    return (
        <div className="h-[100vh]">
            <GoMoveToStart onClick={() => back()} className="cursor-pointer text-[3vw] p-[0.4vw] border-1 rounded-3xl solid mt-[1vw] ml-[1vw]"/>
            <form  onSubmit = {() => addItem()} className="flex flex-col m-auto gap-[1.7vw] w-[75vw] h-[32vw] text-center">
                <h1 className="text-[3vw]">{editTile}</h1>

                <label className="text-[1vw] flex flex-col text-left mx-auto">
                    <p>Ingredient name:</p>
                    <input value = {name} onChange = {getName} placeholder="Ingredient Name"className = "w-[30vw] h-[2vw] border-gray-500 border-2 pl-[0.1vw] pr-[0.1vw] text-black" type="text" required/>
                </label>

                <label className="text-[1vw] flex flex-col text-left mx-auto">
                    <p>Price/item:</p>
                    <input value = {price} onChange = {getPrice} placeholder="Price" className = "p-[0.5vw] w-[30vw] h-[2vw] border-gray-500 border-2 pl-[0.1vw] pr-[0.1vw] text-black" type="number" min="0" step ="0.01" required/>
                </label>

                <label className="text-[1vw] flex flex-col text-left mx-auto">
                    <p>Item Stock:</p>
                    <input value = {stock} onChange = {getStock} placeholder="Stock" className = "p-[0.5vw] w-[30vw] h-[2vw] border-gray-500 border-2 pl-[0.1vw] pr-[0.1vw] text-black" min="0.1" step = "0.1" ype="number" required/>
                </label>

                <label className="text-[1vw] flex flex-col text-left mx-auto">
                    <p>Threshold:</p>
                    <input value = {threshold} onChange = {getThreshold} placeholder="Threshold" className = "p-[0.5vw] w-[30vw] h-[2vw] border-gray-500 border-2 pl-[0.1vw] pr-[0.1vw] text-black" min="0.1" step = "0.1" type="number" required/>
                </label>

                <label className="text-[1vw] flex flex-col text-left mx-auto">
                    <p>Buy amount of:</p>
                    <input value = {buy} onChange = {getBuy} placeholder="Buy Amount" className = "p-[0.5vw] w-[30vw] h-[2vw] border-gray-500 border-2 pl-[0.1vw] pr-[0.1vw] text-black" min="0.1" step = "0.1" type="number" required/>
                </label>
                

                {id ? (
                    <div className="flex m-auto gap-[2vw]">
                        <input onClick={saveChanges} className="text-[1vw] cursor-pointer bg-white drop-shadow-md border-solid border-3 border-[#D9D9D9] text-black rounded-lg shadow-md w-[14vw] h-[3vw] m-auto" type = "button" value = "Save Changes"/>
                        <input onClick={deleteItem} className="text-[1vw] cursor-pointer bg-red-300 drop-shadow-md text-black rounded-lg shadow-md w-[14vw] h-[3vw] m-auto" type = "button" value = "Delete Ingredient"/>
                    </div>
                ) : (
                    <input  className="text-[1vw] cursor-pointer bg-white drop-shadow-md border-solid border-3 border-[#D9D9D9] text-black rounded-lg shadow-md w-[30vw] h-[3vw] m-auto" type = "submit" value = "Add Ingredient"/>
                )}
               
            </form>
        </div>
)}