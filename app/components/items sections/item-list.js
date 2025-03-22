"use client";

import { useEffect } from "react";
import { GoTrash } from "react-icons/go";
import Items from "../view items/items";




export default function ItemList({ itemsList, subTotal, tax, total, setSubTotal, setTax, setTotal, setItemsList  }) {
   
    async function postData() {
        const url = "http://localhost:3000/api/orders";
        try {
          const response = await fetch(url , {
            'method': 'POST',
            'body': JSON.stringify(
                { client: 'test', 
                    subtotal: subTotal, 
                    tax: tax, 
                    total: total, 
                    items: JSON.stringify(itemsList), 
                    notes: "test_notes", 
                    status: false, 
                    creation_datetime: new Date().toISOString().slice(0, 19).replace('T', ' '), 
                    completed_datetime: null },
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

    async function pay() {
        try {
            const response = await fetch("http://localhost:3000/api/items", {
                'method': 'POST',
                'body' : JSON.stringify({
                    'h': 'h'

                })
            });


        } catch (error) {
            console.error(error.message);
        }
    }
    


    useEffect(() => {
        let tempSubTotal = 0.00;
        itemsList.forEach(item => {
            tempSubTotal += item.price;
        });
        let tempTax = tempSubTotal * 0.05;
        let tempTotal = tempSubTotal + tempTax;
        setSubTotal(tempSubTotal);
        setTax(tempTax);
        setTotal(tempTotal);
        //console.log(subTotal);
        //console.log(tax);
        //console.log(total);
    }, [itemsList]);

    const saveOrder = () => {
        if (itemsList.length != 0) {
            console.log(itemsList.length)
            postData().then((response) => console.log(response));
            setItemsList([]);
            alert("Order has been added")
        }
    }

    const remove = (index) => {
        const newItemsList = [...itemsList]
        newItemsList.splice(index, 1);
        setItemsList(newItemsList);
    }  

    const increment = (index) => {
        const newItemsList = [...itemsList]
        const oldPrice = newItemsList[index].price / newItemsList[index].quantity
        newItemsList[index].quantity += 1;
        newItemsList[index].price = newItemsList[index].price + oldPrice;
        setItemsList(newItemsList);
    }

    const decrement = (index) => {
        const newItemsList = [...itemsList]
        const oldPrice = newItemsList[index].price / newItemsList[index].quantity
        newItemsList[index].quantity -= 1;
        newItemsList[index].price = newItemsList[index].price - oldPrice;
        if (newItemsList[index].quantity == 0) {
            newItemsList.splice(index, 1);
        }
        setItemsList(newItemsList);
    }

    return (
        <div className="text-[0.84vw] py-[1.7vw] pl-[1.7vw] flex h-[100vh] flex-col w-[30vw] bg-white drop-shadow-md rounded-xl border-solid border-3 border-[#D9D9D9]">
            <div className="overflow-auto touch-auto">
                {itemsList.map((item, index) => (
                    <div key={index} className="w-full pr-[1.7vw]">
                        <div className="flex">
                            <div className="flex flex-col">
                                <button type = "button w-full" className="p-[0.104vw] cursor-pointer rounded-xl border-solid border-[0.8px] border-black" onClick = {() => increment(index)}>+</button>
                                <p className="p-[0.21vw] w-[1.83vw] text-center">{item.quantity}</p>
                                <button type = "button w-full" className="p-[0.052vw] cursor-pointer rounded-xl border-solid border-[0.8px] border-black" onClick = {() => decrement(index)}>-</button>
                            </div>
                            <div className="flex flex-col w-full h-full mt-auto mb-auto">
                                <div className="invisible">a</div>
                                <div className="flex">
                                    <p className="ml-[0.21vw]">{item.name}:</p>
                                    <p className="ml-auto mr-[0.42vw]">${item.price.toFixed(2)}</p>
                                        <button type = "button" className="cursor-pointer" onClick = {() => remove(index)}><GoTrash /></button>
                                    
                                </div>
                                <div className="invisible">a</div>
                            </div>

                        </div>
                        <hr className="border-[#D9D9D9] my-[1.042vw] mb-[2.08vw]"></hr>
                    </div>
                    ))}
            </div>
            <div className="mt-auto pr-[1.7vw]">
                <hr className="border-[#D9D9D9] my-[1.7vw]"></hr>
                <div className="flex py-[0.21vw]">
                    <p>SubTotal:</p>
                    <p className="ml-auto">${subTotal.toFixed(2)}</p>
                </div>

                <div className="flex py-[0.21vw]">
                    <p>Tax:</p>
                    <p className="ml-auto">${tax.toFixed(2)}</p>
                </div>

                <div className="flex py-[0.21vw]">
                    <p>Total:</p>
                    <p className="ml-auto">${total.toFixed(2)}</p>
                </div>
                
                <div className="flex justify-between mt-[1.7vw]">
                    <button onClick = {() => saveOrder()} className="py-[0.73vw] w-[7.09vw] bg-[#BABABA] drop-shadow-sm border-solid border-2 border-[#D9D9D9]">Save</button>
                    <button className="py-[0.73vw] w-[7.09vw] drop-shadow-sm border-solid border-2 border-[#D9D9D9]">Pay</button>
                </div>
                
            </div>
        </div>
    );

}