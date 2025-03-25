"use client";

import { useEffect, useState } from "react";
import { GoTrash } from "react-icons/go";
import Items from "../view items/items";




export default function ItemList({ itemGridEnabled, sideBarEnabled, itemsList, subTotal, tax, total, setSubTotal, setTax, setTotal, setItemsList, mainOrder, setMainOrder  }) {
    const currentTime = new Date();
    const [popupEnabled, popupIsEnabled] = useState(false);
    const [toggle, setToggle] = useState(false)
    const [notes, setNotes] = useState("");
    const [name, setName] = useState("");
    const [mode, setMode] = useState("");
    const [time, setTime] = useState(new Date(currentTime.getTime() + 30 * 60 * 1000));
    const [changeTime, setChangeTime] = useState(`${String(time.getHours()).padStart(2,'0')}:${String(time.getMinutes()).padStart(2,'0')}`)


    async function postData() {
        const url = "http://127.0.0.1:3000/api/orders";
        try {
          const response = await fetch(url , {
            'method': 'POST',
            'body': JSON.stringify(
                { client: name, 
                    subtotal: subTotal, 
                    tax: tax, 
                    total: total, 
                    items: JSON.stringify(itemsList), 
                    notes: notes, 
                    status: "unpaid", 
                    creation_datetime: `${String(new Date().getFullYear()).padStart(2, '0')}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')} ${new Date().getHours()}:${String(new Date().getMinutes()).padStart(2,'0')}:${String(new Date().getSeconds()).padStart(2,'0')}`, 
                    completed_datetime: null,
                    payment_status: "Unpaid",
                    pickup_datetime: `${String(time.getFullYear()).padStart(2, '0')}-${String(time.getMonth() + 1).padStart(2, '0')}-${String(time.getDate()).padStart(2, '0')} ${time.getHours()}:${String(time.getMinutes()).padStart(2,'0')}:${String(time.getSeconds()).padStart(2,'0')}` ,
                    payment_method: null
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

    async function pay() {
        try {
            const response = await fetch("http://127.0.0.1:3000/api/items", {
                'method': 'POST',
                'body' : JSON.stringify({
                    'h': 'h'

                })
            });


        } catch (error) {
            console.error(error.message);
        }
    }

    async function updateItem(item) {
        console.log("e")
        const url = "http://localhost:3000/api/items";
        console.log(item.stock)
        try {
          const response = await fetch(url , {
            'method': 'PUT',
            'body': JSON.stringify(
                {  
                    name: item.name,
                    price: item.price/item.quantity,
                    category: item.category,
                    stock: item.stock-item.quantity,
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

    async function removeStock() {
        try {
            for (const item of itemsList) {
                await updateItem(item);
            }
        } catch (error) {
            console.error(error.message);
        }
    }


    useEffect(() => {
        setChangeTime(`${String(time.getHours()).padStart(2,'0')}:${String(time.getMinutes()).padStart(2,'0')}`)
    }, [time])


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
    }, [itemsList]);

    const saveButton = () => {
        if (itemsList.length != 0) {
            popupIsEnabled(!popupEnabled);
            setMode("Save");
            setTime(new Date(currentTime.getTime() + 30 * 60 * 1000));
            changeBrightness();
        }
    }

    const payButton = () => {
        if (itemsList.length != 0) {
            popupIsEnabled(!popupEnabled);
            setMode("Pay");
            setTime(new Date(currentTime.getTime() + 30 * 60 * 1000));
            changeBrightness();
        }
    }

    const payOrder = () => {

    }

    const saveOrder = () => {
        event.preventDefault();
        postData().then((response) => console.log(response));
        removeStock().then((response) => console.log(response));
        setItemsList([]);
        alert("Order has been added")
        closePopUp();
    }

    const closePopUp = () => {
        popupIsEnabled(!popupEnabled);
        changeBrightness();
    }

    const getName = (event) => {
        setName(event.target.value);
    };

    const getNotes = (event) => {
        setNotes(event.target.value);
    };

    const getTime = (event) => {
        setTime(new Date(time.getFullYear(), time.getMonth(), time.getDate(), event.target.value.slice(0, 2), event.target.value.slice(3, 5)))
    }

    const remove = (index) => {
        const newItemsList = [...itemsList]
        newItemsList[index].setter(true);
        newItemsList.splice(index, 1);
        setItemsList(newItemsList);
    }  

    const increment = (index) => {
        const newItemsList = [...itemsList]
        if (newItemsList[index].quantity == newItemsList[index].stock) {
            newItemsList[index].setter(false);
            return;
        }
        const oldPrice = newItemsList[index].price / newItemsList[index].quantity
        newItemsList[index].quantity += 1;
        newItemsList[index].price = newItemsList[index].price + oldPrice;
        console.log(newItemsList[index])
        setItemsList(newItemsList);
        if (newItemsList[index].quantity == newItemsList[index].stock) {
            newItemsList[index].setter(false);
            return;
        }
    }

    const decrement = (index) => {
        const newItemsList = [...itemsList]
        const oldPrice = newItemsList[index].price / newItemsList[index].quantity
        newItemsList[index].setter(true);
        newItemsList[index].quantity -= 1;
        newItemsList[index].price = newItemsList[index].price - oldPrice;
        if (newItemsList[index].quantity == 0) {
            newItemsList.splice(index, 1);
        }
        setItemsList(newItemsList);
    }

    const clearAll = () => {
        console.log("here")
        for (let i = 0; i < itemsList.length; i++) {
            console.log(itemsList[i])
            itemsList[i].setter(true);
        }
        setItemsList([]);
    }

    const changeBrightness = () => {
        setToggle(!toggle);
    }

    useEffect(() => {
        if (toggle) {
            document.getElementById('darken').style.filter = 'brightness(50%)'
            document.getElementById('darken-grid').style.filter = 'brightness(50%)'

        }
        else {
            document.getElementById('darken').style.filter = 'brightness(100%)'
            document.getElementById('darken-grid').style.filter = 'brightness(100%)'
        }
    }, [toggle])

    useEffect(() => {
        if (toggle == true) {
            sideBarEnabled(false);
            itemGridEnabled(false);

        }
        else if (toggle == false) {
            sideBarEnabled(true);
            itemGridEnabled(true);
        }
    }, [toggle])
    



    return (
    <div className="h-[100vh] w-[30vw] bg-[#D9D9D9] h-full drop-shadow-md ">
        <div className="text-[0.84vw] py-[1.7vw] pl-[1.7vw] flex h-[100vh] flex-col w-[30vw] bg-white drop-shadow-md rounded-xl border-solid border-3 border-[#D9D9D9]">
            {itemsList.length !=0 && 
                <button onClick = {() => clearAll()} className="cursor-pointer py-[0.73vw] mb-[1.2vw] mr-[1.7vw] drop-shadow-sm border-solid border-2 border-[#D9D9D9]">Clear Items</button>
            }
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
                        <hr className="border-[#D9D9D9] my-[1.2vw] mb-[1.2vw]"></hr>
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
                    <button onClick = {() => saveButton()} className="py-[0.73vw] w-[7.09vw] bg-[#BABABA] drop-shadow-sm border-solid border-2 border-[#D9D9D9]">Save</button>
                    <button onClick = {() => payButton()} className="py-[0.73vw] w-[7.09vw] drop-shadow-sm border-solid border-2 border-[#D9D9D9]">Pay</button>
                </div>
            </div>
        </div>
        {popupEnabled ? (
            <div className = "absolute bottom-0 left-[-0.01vw] top-[-0.01vw] right-0 flex justify-center items-center w-[85vw] h-[100vh] bg-black/50">
                <div className ="absolute flex flex-col top-[-35%%] left-[-35%] absolute p-12 max-w-[400px] w-full h-full max-h-[500px] bg-white">
                    <div className="flex justify-end">
                        <button className="cursor-pointer text-black text-3xl w-10 h-10" onClick = {() => closePopUp()}>X</button>
                    </div>
                    <h1 className="text-black text-center text-2xl mb-4">{mode}</h1>
                    {mode == "Save" &&
                        <form onSubmit={saveOrder} className="flex flex-col gap-[20px] mx-auto">
                            <div>
                                <label>
                                    <input placeholder="Enter Order Name" required onChange={getName} className = "border-gray-500 border-2 pl-[2px] pr-[2px] text-black" type="text"/>
                                </label>
                            </div>

                            <div>
                                <label>
                                    <input placeholder="Enter Notes" onChange={getNotes} className = "border-gray-500 border-2 pl-[2px] pr-[2px] text-black"  type="text"/>
                                </label>
                            </div>

                            <div>
                                <label>
                                    <input onChange={getTime} value = {changeTime} className = "w-full border-gray-500 border-2 pl-[2px] pr-[2px] text-black"  type="time"/>
                                </label>
                            </div>

                            <input className="cursor-pointer m-auto bg-white drop-shadow-md rounded-xl border-solid border-3 border-[#D9D9D9] text-black rounded-lg shadow-md w-32 h-12" type = "submit" value = "Save Order"/>
                        </form>
                    }
                    {mode == "Pay" &&
                        <form onSubmit={payOrder} className="flex flex-col gap-[20px] mx-auto">
                            <div>
                                <label>
                                    <input placeholder="Enter Order Name" required onChange={getName} className = "border-gray-500 border-2 pl-[2px] pr-[2px] text-black" type="text"/>
                                </label>
                            </div>
                            <p className="text-center">Payment Method</p>
                            <div className="flex justify-between">
                                <button>Cash</button>
                                <button>Credit</button>
                            </div>

         
                            <input className="cursor-pointer m-auto bg-white drop-shadow-md rounded-xl border-solid border-3 border-[#D9D9D9] text-black rounded-lg shadow-md w-32 h-12" type = "submit" value = "Pay"/>
                        </form>
                    }
                </div>
            </div>
        ) : ("")}
    </div>
    );

}