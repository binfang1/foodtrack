"use client";

import { useEffect } from "react";



export default function ItemList({ itemsList, subTotal, tax, total, setSubTotal, setTax, setTotal, setItemsList  }) {
   
    async function postData() {
        const url = "http://localhost:3000/api/createOrder";
        try {
          const response = await fetch(url , {
            'method': 'POST',
            'body': JSON.stringify(
                { client: 'test', 
                    subtotal: subTotal, 
                    tax: tax, 
                    total: total, 
                    items: itemsList.toString(), 
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
        postData().then((response) => console.log(response))
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
        <div className="text-[18px] pl-[32px] py-[32px] flex h-full flex-col w-[550px] bg-white h-full drop-shadow-md rounded-xl border-solid border-3 border-[#D9D9D9]">
            <div className="overflow-auto touch-auto">
                {itemsList.map((item, index) => (
                    <div key={index} className="w-full">
                        <div className="flex py-[4px]">
                            <div className="flex flex-col">
                                <button type = "button" className="p-[1px] cursor-pointer drop-shadow-sm rounded-xl border-solid border-3 border-[#D9D9D9]  " onClick = {() => increment(index)}>+</button>
                                <p className="p-[2px] text-center">{item.quantity}</p>
                                <button type = "button" className="p-[1px] cursor-pointer drop-shadow-sm rounded-xl border-solid border-3 border-[#D9D9D9]" onClick = {() => decrement(index)}>-</button>
                            </div>
                            <div className="flex flex-col p-[8px]">
                                <div className="invisible">a</div>
                                <div className="flex w-[420px]">
                                    <p className="ml-[8px]">{item.name}:</p>
                                    <p className="ml-auto pr-[16px]">${item.price.toFixed(2)}</p>
                                    <button type = "button" className="cursor-pointer" onClick = {() => remove(index)}>🗑</button>
                                </div>
                            </div>

                        </div>
                        <hr className="border-[#D9D9D9] my-[20px] mb-[40px] mr-[32px]"></hr>
                    </div>
                    ))}
            </div>
            <div className="mt-auto pr-[32px]">
                <hr className="border-[#D9D9D9] my-[32px]"></hr>

                <div className="flex py-[4px]">
                    <p>SubTotal:</p>
                    <p className="ml-auto">${subTotal.toFixed(2)}</p>
                </div>

                <div className="flex py-[4px]">
                    <p>Tax:</p>
                    <p className="ml-auto">${tax.toFixed(2)}</p>
                </div>

                <div className="flex py-[4px]">
                    <p>Total:</p>
                    <p className="ml-auto">${total.toFixed(2)}</p>
                </div>
                
                <div className="flex justify-between mt-[32px]">
                    <button onClick = {() => saveOrder()} className="py-[14px] w-[136px] bg-[#BABABA] drop-shadow-sm border-solid border-2 border-[#D9D9D9]">Save</button>
                    <button className="py-[14px] w-[136px] drop-shadow-sm border-solid border-2 border-[#D9D9D9]">Pay</button>
                </div>
                
            </div>
        </div>
    );

}