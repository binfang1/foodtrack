
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

export default function OrderItem({order, orders, setOrders , setPage, setCategoryPage, itemsList, setItemsList, mainOrder, setMainOrder, items}) {
    var counter = 1;
    var time = (`${String(new Date().getFullYear()).padStart(2, '0')}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')} ${new Date().getHours()}:${String(new Date().getMinutes()).padStart(2,'0')}:${String(new Date().getSeconds()).padStart(2,'0')}`);
    async function updateItem(item) {
        const url = "http://localhost:3000/api/items";

        try {
            var index;
        if (items.some(itemMain => itemMain.id == item.id)) { 
            index = items.findIndex(itemMain => itemMain.id == item.id);
        }
          const response = await fetch(url , {
            'method': 'PUT',
            'body': JSON.stringify(
                {  
                    name: item.name,
                    price: item.price/item.quantity,
                    category: item.category,
                    stock: items[index].stock + item.quantity,
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

    async function reinventory () {
        try {
            for (const item of JSON.parse(order.items)) {
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
        reinventory().then(function(response) {
            deleteData().then((response) => console.log(response));
            getData().then((response) => setOrders(response));
        })
    }
    
    function editPayOrder () {
        reinventory().then(function(response) {
            const returnedItems = JSON.parse(order.items);
            setPage("home");
            setCategoryPage("Default");
            console.log(order)
            for (let i = 0; i < items.length; i++) {
                if (returnedItems.some(item => item.id == items[i].id)) {
                    const index = returnedItems.findIndex(item => item.id === items[i].id);
                    returnedItems[index].stock = items[i].stock
            }}
            setItemsList(returnedItems);
            setMainOrder(order);
        });
    }

    const undo = () => {
        if (order.status == "Order Created") {
            return;
        }
        else if (order.status == "Finished") {
            time = null;
            statusChange("Preparing").then((function() {
                getData().then((response) => setOrders(response));
            }));

        }
        else if (order.status == "Preparing") {
            time = null;
            statusChange("Order Created").then((function() {
                getData().then((response) => setOrders(response));
            }));
        }
    }

    const redo = () => {
        if (order.status == "Finished") {
            return;
        }
        else if (order.status == "Order Created") {
            time = null;
            statusChange("Preparing").then((function() {
                getData().then((response) => setOrders(response));
            }));
        }
        else if (order.status == "Preparing") {
            time = `${String(new Date().getFullYear()).padStart(2, '0')}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')} ${new Date().getHours()}:${String(new Date().getMinutes()).padStart(2,'0')}:${String(new Date().getSeconds()).padStart(2,'0')}`
            statusChange("Finished").then((function() {
                getData().then((response) => setOrders(response));
            }));
        }
    }

   
    return (
        <div className="relative w-full bg-white drop-shadow-md border-solid border-3 border-[#D9D9D9] ">
            <div className="flex flex-col ">
                <div className={`bg-blue-300 text-center h-[4vw] bg-cyan-300`}>
                    <p className="text-[1.5vw] text-center">{order.client}</p>
                    <p className="text-[0.9vw]">Status: {order.status}</p>
                </div>
                

                    
                {order.payment_status != "paid" && (
                    <div className="flex p-[0.4vw] relative z-40">
                        <button className="cursor-pointer hover:underline hover:text-red-400" onClick={deleteOrder}>delete</button>
                        <button className="cursor-pointer hover:underline ml-auto" onClick={editPayOrder}>edit/pay</button>
                    </div>
                )}

                <div className="flex flex-col p-[0.4vw]">
                    <p className="text-[0.9vw]">Pick Up Time: {order.pickup_datetime.slice(11, 16)}</p>

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

