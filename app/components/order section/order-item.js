
"use client";
import { useState, useEffect } from "react";

async function getData() {
    const url = "http://localhost:3000/api/orders";
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

async function getIngredient() {
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

export default function OrderItem({loggedIn, order, orders, setOrders , setPage, setCategoryPage, itemsList, setItemsList, mainOrder, setMainOrder, items}) {
    var counter = 1;
    var time = (`${String(new Date().getFullYear()).padStart(2, '0')}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')} ${new Date().getHours()}:${String(new Date().getMinutes()).padStart(2,'0')}:${String(new Date().getSeconds()).padStart(2,'0')}`);
    
    async function updateItem(list) {
        const url = "http://localhost:3000/api/raw";

        try {
          const response = await fetch(url , {
            'method': 'PUT',
            'body': JSON.stringify(
                {  
                    name: list.object.name, 
                    price: list.object.price, 
                    threshold: list.object.threshold, 
                    stock: Number(list.object.stock) + Number(list.value), 
                    buy_amount: list.object.buy_amount,
                    id: list.object.id
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
                console.log(item)
                await updateItem(item);
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    

    async function statusChange (change) {
        const url = "http://localhost:3000/api/status";
        try {
            const response = await fetch(url , {
              'method': 'PUT',
              'body': JSON.stringify(
                  { 
                      status: change, 
                      completed_datetime: time,
                      id: order.id
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

    async function deleteData () {
        const url = "http://localhost:3000/api/orders";
        try {
            const response = await fetch(url , {
            'method': 'DELETE',
            'body': JSON.stringify(
                {  
                    id: order.id
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

    function deleteOrder () {
        const returnedItems = JSON.parse(order.items);
        getIngredient().then(function(response) {
            let list = [];
            console.log(response);
            console.log(returnedItems)
            for (let i = 0; i < response.length; i++) {
                
                for (let j = 0; j < returnedItems.length; j++) {
                    for (let k = 0; k < returnedItems[j].ingredients.length; k++) {
                        if (response[i].name == returnedItems[j].ingredients[k]) {
                            const food = new Object;
                            if (list.some(item => item.name == returnedItems[j].ingredients[k])) {
                                const index = list.findIndex(item => item.name == returnedItems[j].ingredients[k]);
                                list[index].value = Number(Number(list[index].value) + (returnedItems[j].quantity * Number(returnedItems[j].num_of[k]))).toFixed(1);
                            }
                            else {
                                food.name = returnedItems[j].ingredients[k];
                                food.value = Number(returnedItems[j].quantity * Number(returnedItems[j].num_of[k])).toFixed(1);
                                food.object = response[i];
                                list.push(food);
                            }
                        }
                    }
                }
            }
            reinventory(list).then(function(response) {    
                deleteData().then((response) => console.log(response));
                getData().then((response) => setOrders(response));
            });
        });
    }
    
    function editPayOrder () {
        const returnedItems = JSON.parse(order.items);
        getIngredient().then(function(response) {
            let list = [];
            console.log(response);
            console.log(returnedItems)
            for (let i = 0; i < response.length; i++) {
                
                for (let j = 0; j < returnedItems.length; j++) {
                    for (let k = 0; k < returnedItems[j].ingredients.length; k++) {
                        if (response[i].name == returnedItems[j].ingredients[k]) {
                            const food = new Object;
                            if (list.some(item => item.name == returnedItems[j].ingredients[k])) {
                                const index = list.findIndex(item => item.name == returnedItems[j].ingredients[k]);
                                list[index].value = Number(Number(list[index].value) + (returnedItems[j].quantity * Number(returnedItems[j].num_of[k]))).toFixed(1);
                            }
                            else {
                                food.name = returnedItems[j].ingredients[k];
                                food.value = Number(returnedItems[j].quantity * Number(returnedItems[j].num_of[k])).toFixed(1);
                                food.object = response[i];
                                list.push(food);
                            }
                        }
                    }
                }
            }
            reinventory(list).then(function(response) {
                console.log(response);
                setPage("home");
                setCategoryPage("Default");
                setItemsList(returnedItems);
                setMainOrder(order);
            });
        });

    }

    const undo = () => {
        if (order.status == "Waiting") {
            return;
        }
        else if (order.status == "Completed") {
            time = null;
            statusChange("In-Progress").then((function() {
                getData().then((response) => setOrders(response));
            }));

        }
        else if (order.status == "In-Progress") {
            time = null;
            statusChange("Waiting").then((function() {
                getData().then((response) => setOrders(response));
            }));
        }
    }

    const redo = () => {
        if (order.status == "Completed") {
            return;
        }
        else if (order.status == "Waiting") {
            time = null;
            statusChange("In-Progress").then((function() {
                getData().then((response) => setOrders(response));
            }));
        }
        else if (order.status == "In-Progress") {
            time = `${String(new Date().getFullYear()).padStart(2, '0')}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')} ${new Date().getHours()}:${String(new Date().getMinutes()).padStart(2,'0')}:${String(new Date().getSeconds()).padStart(2,'0')}`
            statusChange("Completed").then((function() {
                getData().then((response) => setOrders(response));
            }));
        }
    }

   
    return (
        <div className="relative w-full bg-white drop-shadow-md border-solid border-3 border-[#D9D9D9] ">
            <div className="flex flex-col ">
            {order.status == "Completed" && 
                <div className={`text-center h-[4vw] bg-green-300`}>
                    <p className="text-[1.5vw] text-center">{order.client}</p>
                    <p className="text-[0.9vw]">{order.status}</p>
                </div>
                }
                {order.status == "In-Progress" && 
                <div className={`text-center h-[4vw] bg-yellow-300`}>
                    <p className="text-[1.5vw] text-center">{order.client}</p>
                    <p className="text-[0.9vw]">{order.status}</p>
                </div>
                }
                {order.status == "Waiting" && 
                <div className={`text-center h-[4vw] bg-red-300`}>
                    <p className="text-[1.5vw] text-center">{order.client}</p>
                    <p className="text-[0.9vw]">{order.status}</p>
                </div>
                }
                

                    
                {order.payment_status != "paid" && loggedIn.type != "Chef" && (
                    <div className="flex p-[0.4vw] relative z-40 text-[0.9vw]">
                        <button className="cursor-pointer hover:underline hover:text-red-400" onClick={deleteOrder}>Delete</button>
                        <button className="cursor-pointer hover:underline ml-auto " onClick={editPayOrder}>Edit/Pay</button>
                    </div>
                )}

                <div className="flex flex-col p-[0.4vw]">
            
           

                    <div className="mt-[2vw] mb-[2vw] text-[0.9vw]">
                        {JSON.parse(order.items).map(item => (
                            <p className="mb-[0.3vw]" key = {counter++}>{item.quantity} - {item.name}</p>
                        ))}
                    </div>
                </div>
            </div>
            <div className="absolute h-full w-full flex top-0">
                <button className="h-full w-[50%]" onClick={undo}></button>
                <button className="h-full w-[50%]" onClick={redo}></button>
            </div>
        </div>
    );
}

