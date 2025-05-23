"use client";

import { useEffect, useState } from "react";
import { GoTrash } from "react-icons/go";
import Items from "../view items/items";

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


export default function ItemList({setMessage, enableSideBar, enableItemGrid, categoryPage, setCategoryPage, itemGridEnabled, sideBarEnabled, itemsList, subTotal, tax, total, setSubTotal, setTax, setTotal, setItemsList, mainOrder, setMainOrder}) {
    const currentTime = new Date();
    const [popupEnabled, popupIsEnabled] = useState(false);
    const [toggle, setToggle] = useState(false);
    const [notes, setNotes] = useState("");
    const [name, setName] = useState("");
    const [mode, setMode] = useState("");
    const [time, setTime] = useState(new Date(currentTime.getTime() + 30 * 60 * 1000));
    const [changeTime, setChangeTime] = useState(`${String(time.getHours()).padStart(2,'0')}:${String(time.getMinutes()).padStart(2,'0')}`)
    const [paymentType, setPaymentType] = useState("");
    const [enough, setEnough] = useState("enough");
    const [paymentTotal, setPaymentTotal] = useState("")


    const changeType = (event) => {
        event.preventDefault()
        setPaymentType(event.target.innerText.toLowerCase());
    };

    async function postData() {
        const url = "http://localhost:3000/api/orders";
        try {
          const response = await fetch(url , {
            'method': 'POST',
            'body': JSON.stringify(
                { client: (name ? name : "Order"), 
                    subtotal: subTotal, 
                    tax: tax, 
                    total: total, 
                    items: JSON.stringify(itemsList), 
                    notes: notes, 
                    status: "Waiting", 
                    creation_datetime: `${String(new Date().getFullYear()).padStart(2, '0')}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')} ${new Date().getHours()}:${String(new Date().getMinutes()).padStart(2,'0')}:${String(new Date().getSeconds()).padStart(2,'0')}`, 
                    completed_datetime: null,
                    payment_status: "unpaid",
                    pickup_datetime: `${String(time.getFullYear()).padStart(2, '0')}-${String(time.getMonth() + 1).padStart(2, '0')}-${String(time.getDate()).padStart(2, '0')} ${time.getHours()}:${String(time.getMinutes()).padStart(2,'0')}:${String(time.getSeconds()).padStart(2,'0')}` ,
                    payment_method: null,
                    amount: null
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

    async function payData() {
        const url = "http://localhost:3000/api/orders";
        try {
          const response = await fetch(url , {
            'method': 'POST',
            'body': JSON.stringify(
                { client: (name ? name : "Order"), 
                    subtotal: subTotal, 
                    tax: tax, 
                    total: total, 
                    items: JSON.stringify(itemsList), 
                    notes: notes, 
                    status: "Waiting",
                    creation_datetime: `${String(new Date().getFullYear()).padStart(2, '0')}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')} ${new Date().getHours()}:${String(new Date().getMinutes()).padStart(2,'0')}:${String(new Date().getSeconds()).padStart(2,'0')}`, 
                    completed_datetime: null,
                    payment_status: "paid",
                    pickup_datetime: `${String(time.getFullYear()).padStart(2, '0')}-${String(time.getMonth() + 1).padStart(2, '0')}-${String(time.getDate()).padStart(2, '0')} ${time.getHours()}:${String(time.getMinutes()).padStart(2,'0')}:${String(time.getSeconds()).padStart(2,'0')}` ,
                    payment_method: paymentType,
                    amount: paymentTotal
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

    async function orderPay() {
        const url = "http://localhost:3000/api/orders";
        const create_date = new Date(`${mainOrder.creation_datetime.slice(0, 10)} ${mainOrder.creation_datetime.slice(11, 16)} UTC`);
        const pickup_date = new Date(`${mainOrder.pickup_datetime.slice(0, 10)} ${mainOrder.pickup_datetime.slice(11, 16)} UTC`);
        var completed_date;
        try {
            let temp_date = new Date(`${mainOrder.completed_datetime.slice(0, 10)} ${mainOrder.completed_datetime.slice(11, 16)} UTC`);
            completed_date = `${String(temp_date.getFullYear()).padStart(2, '0')}-${String(temp_date.getMonth() + 1).padStart(2, '0')}-${String(temp_date.getDate()).padStart(2, '0')} ${temp_date.getHours()}:${String(temp_date.getMinutes()).padStart(2,'0')}:${String(temp_date.getSeconds()).padStart(2,'0')}`
        } catch (err) {
            completed_date = mainOrder.completed_date
        }
        
        try {
          const response = await fetch(url , {
            'method': 'PUT',
            'body': JSON.stringify(
                { client: mainOrder.client, 
                    subtotal: subTotal, 
                    tax: tax, 
                    total: total, 
                    items: JSON.stringify(itemsList), 
                    notes: mainOrder.notes, 
                    status: mainOrder.status, 
                    creation_datetime: `${String(create_date.getFullYear()).padStart(2, '0')}-${String(create_date.getMonth() + 1).padStart(2, '0')}-${String(create_date.getDate()).padStart(2, '0')} ${create_date.getHours()}:${String(create_date.getMinutes()).padStart(2,'0')}:${String(create_date.getSeconds()).padStart(2,'0')}`, 
                    completed_datetime: completed_date,
                    payment_status: "paid",
                    pickup_datetime: `${String(pickup_date.getFullYear()).padStart(2, '0')}-${String(pickup_date.getMonth() + 1).padStart(2, '0')}-${String(pickup_date.getDate()).padStart(2, '0')} ${pickup_date.getHours()}:${String(pickup_date.getMinutes()).padStart(2,'0')}:${String(pickup_date.getSeconds()).padStart(2,'0')}`,
                    payment_method: paymentType,
                    amount: paymentTotal,
                    id: mainOrder.id
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

    async function updateOrder() {
        const url = "http://localhost:3000/api/orders";
        const create_date = new Date(`${mainOrder.creation_datetime.slice(0, 10)} ${mainOrder.creation_datetime.slice(11, 16)} UTC`);
        const pickup_date = new Date(`${mainOrder.pickup_datetime.slice(0, 10)} ${mainOrder.pickup_datetime.slice(11, 16)} UTC`)
        try {
          const response = await fetch(url , {
            'method': 'PUT',
            'body': JSON.stringify(
                { client: (name ? name : mainOrder.client), 
                    subtotal: subTotal, 
                    tax: tax, 
                    total: total, 
                    items: JSON.stringify(itemsList), 
                    notes: (notes ? notes : mainOrder.notes), 
                    status: mainOrder.status, 
                    creation_datetime: `${String(create_date.getFullYear()).padStart(2, '0')}-${String(create_date.getMonth() + 1).padStart(2, '0')}-${String(create_date.getDate()).padStart(2, '0')} ${create_date.getHours()}:${String(create_date.getMinutes()).padStart(2,'0')}:${String(create_date.getSeconds()).padStart(2,'0')}`, 
                    completed_datetime: null,
                    payment_status: "unpaid",
                    pickup_datetime: `${String(time.getFullYear()).padStart(2, '0')}-${String(time.getMonth() + 1).padStart(2, '0')}-${String(time.getDate()).padStart(2, '0')} ${time.getHours()}:${String(time.getMinutes()).padStart(2,'0')}:${String(time.getSeconds()).padStart(2,'0')}`,
                    payment_method: paymentType,
                    amount: null,
                    id: mainOrder.id
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
                    stock: Number(list.object.stock) - Number(list.value), 
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

    async function removeStock(list) {
        try {
            for (const item of list) {
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

    useEffect(() => {
        setMode(mode);
    }, [mode]);

    useEffect(() => {
        sideBarEnabled(enableSideBar);
    }, [enableSideBar]);

    useEffect(() => {
        if (mainOrder) {
            setMode("Edit")
            setName(mainOrder.client)
            setPaymentTotal(total)
            setTime(new Date(`${mainOrder.pickup_datetime.slice(0, 10)} ${mainOrder.pickup_datetime.slice(11, 16)}`));
            console.log(mainOrder.pickup_datetime);
        }
    }, [mainOrder])

    const getTotal = (event) => {
        event.preventDefault();
        setPaymentTotal(event.target.value);
    }

    const saveButton = () => {
        if (itemsList.length != 0) {
            popupIsEnabled(!popupEnabled);
            if (mainOrder) {
                setMode("Edit")
                const pickup_date = new Date(`${mainOrder.pickup_datetime.slice(0, 10)} ${mainOrder.pickup_datetime.slice(11, 16)} UTC`)
                console.log(pickup_date)
                setTime(pickup_date)

            }
            else {
                setMode("Save");
                setTime(new Date(currentTime.getTime() + 30 * 60 * 1000));

            }
            
            changeBrightness();
        }
    }

    const payButton = () => {
        if (itemsList.length != 0) {
            popupIsEnabled(!popupEnabled);
            setMode("Pay");
            setPaymentTotal(total);
            setTime(new Date(currentTime.getTime() + 30 * 60 * 1000));
            setPaymentType("");
            changeBrightness();
        }
    }

    const payOrder = () => {
        event.preventDefault();
        if (paymentTotal < total) {
            setEnough("Not Enough");
            setMessage("Error: not enough pay")
            return;
        }
        else {
            if (mainOrder) {
                getIngredient().then(function(response) {
                    let list = [];
                    for (let i = 0; i < response.length; i++) {
                        for (let j = 0; j < itemsList.length; j++) {
                            for (let k = 0; k < itemsList[j].ingredients.length; k++) {
                                if (response[i].name == itemsList[j].ingredients[k]) {
                                    const food = new Object;
                                    if (list.some(item => item.name == itemsList[j].ingredients[k])) {
                                        const index = list.findIndex(item => item.name == itemsList[j].ingredients[k]);
                                        list[index].value = Number(Number(list[index].value) + (itemsList[j].quantity * Number(itemsList[j].num_of[k]))).toFixed(1);
                
                                    }
                                    else {
                                        food.name = itemsList[j].ingredients[k];
                                        food.value = Number(itemsList[j].quantity * Number(itemsList[j].num_of[k])).toFixed(1);
                                        food.object = response[i];
                                        list.push(food);
                                    }
                                }
                            }
                        }
                    }
                    removeStock(list).then((response) => console.log(response));
                })
                orderPay().then((response) => console.log(response));
                setMainOrder("");
                setItemsList([]);
                setMessage("Order has been paid")
                setPaymentType("");
                closePopUp();
                setCategoryPage("Default")
                return;
            }
            else {
                getIngredient().then(function(response) {
                    let list = [];
                    for (let i = 0; i < response.length; i++) {
                        for (let j = 0; j < itemsList.length; j++) {
                            for (let k = 0; k < itemsList[j].ingredients.length; k++) {
                                if (response[i].name == itemsList[j].ingredients[k]) {
                                    const food = new Object;
                                    if (list.some(item => item.name == itemsList[j].ingredients[k])) {
                                        const index = list.findIndex(item => item.name == itemsList[j].ingredients[k]);
                                        list[index].value = Number(Number(list[index].value) + (itemsList[j].quantity * Number(itemsList[j].num_of[k]))).toFixed(1);
                                    }
                                    else {
                                        food.name = itemsList[j].ingredients[k];
                                        food.value = Number(itemsList[j].quantity * Number(itemsList[j].num_of[k])).toFixed(1);
                                        food.object = response[i];
                                        list.push(food);
                                    }
                                }
                            }
                        }
                    }
                    removeStock(list).then((response) => console.log(response));
                })
                payData().then((response) => console.log(response));
                setItemsList([]);
                setMessage("Order has been paid")
                setPaymentType("");
                closePopUp();
                setCategoryPage("Default")
            }
        }

    }

    useEffect (() => {
        setEnough(enough);
    }, [enough])

    const saveOrder = () => {
        event.preventDefault();
        getIngredient().then(function(response) {
            let list = [];
            for (let i = 0; i < response.length; i++) {
                for (let j = 0; j < itemsList.length; j++) {
                    for (let k = 0; k < itemsList[j].ingredients.length; k++) {
                        if (response[i].name == itemsList[j].ingredients[k]) {
                            const food = new Object;
                            if (list.some(item => item.name == itemsList[j].ingredients[k])) {
                                const index = list.findIndex(item => item.name == itemsList[j].ingredients[k]);
                                list[index].value = Number(Number(list[index].value) + (itemsList[j].quantity * Number(itemsList[j].num_of[k]))).toFixed(1);
        
                            }
                            else {
                                food.name = itemsList[j].ingredients[k];
                                food.value = Number(itemsList[j].quantity * Number(itemsList[j].num_of[k])).toFixed(1);
                                food.object = response[i];
                                list.push(food);
                            }
                        }
                    }
                }
            }
            removeStock(list).then((response) => console.log(response));
        })
        postData().then((response) => console.log(response));
        setItemsList([]);
        setMessage("Order has been Saved")
        closePopUp();
        setCategoryPage("Default")
    }

    const saveChanges = () => {
        event.preventDefault();
        getIngredient().then(function(response) {
            let list = [];
            for (let i = 0; i < response.length; i++) {
                for (let j = 0; j < itemsList.length; j++) {
                    for (let k = 0; k < itemsList[j].ingredients.length; k++) {
                        if (response[i].name == itemsList[j].ingredients[k]) {
                            const food = new Object;
                            if (list.some(item => item.name == itemsList[j].ingredients[k])) {
                                const index = list.findIndex(item => item.name == itemsList[j].ingredients[k]);
                                list[index].value = Number(Number(list[index].value) + (itemsList[j].quantity * Number(itemsList[j].num_of[k]))).toFixed(1);
        
                            }
                            else {
                                food.name = itemsList[j].ingredients[k];
                                food.value = Number(itemsList[j].quantity * Number(itemsList[j].num_of[k])).toFixed(1);
                                food.object = response[i];
                                list.push(food);
                            }
                        }
                    }
                }
            }
            removeStock(list).then((response) => console.log(response));
        })
        updateOrder().then((response) => console.log(response));
        setItemsList([]);
        setMessage("Order has been edited")
        setMainOrder("");
        closePopUp();
        setCategoryPage("Default")
    }

    const closePopUp = () => {
        popupIsEnabled(!popupEnabled);
        changeBrightness();
        setPaymentType("");
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
        newItemsList.splice(index, 1);
        setItemsList(newItemsList);
    }  

    const increment = (index) => {
        const newItemsList = [...itemsList]
        const oldPrice = newItemsList[index].price / newItemsList[index].quantity
        newItemsList[index].quantity += 1;
        newItemsList[index].price = newItemsList[index].price + oldPrice;
        setItemsList(newItemsList);
        console.log(itemsList);
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

    const clearAll = () => {
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
        if (mainOrder) {
            sideBarEnabled(false);
            return;
        }

        else if (toggle == true) {
            sideBarEnabled(false);
            itemGridEnabled(false);

        }
        else if (toggle == false) {
            sideBarEnabled(true);
            itemGridEnabled(true);
        }
    }, [toggle, mainOrder])
    



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
                                <button type = "button w-full" className="p-[0.104vw] cursor-pointer " onClick = {() => increment(index)}>+</button>
                                <p className="p-[0.21vw] w-[1.83vw] text-[1vw] text-center">{item.quantity}</p>
                                <button type = "button w-full" className="p-[0.052vw] cursor-pointer" onClick = {() => decrement(index)}>-</button>
                            </div>
                            <div className="flex flex-col w-full h-full mt-auto mb-auto text-[1vw]">
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
                <div className ="absolute flex flex-col top-[-35%%] left-[-35%] absolute p-12 max-w-[27vw] w-full h-full max-h-[35vw] bg-white">
                    <div className="flex justify-end">
                        <button className="cursor-pointer text-black text-3xl w-10 h-10" onClick = {() => closePopUp()}>X</button>
                    </div>
                    <h1 className="text-black text-center text-[2.5vw] mb-4">{mode}</h1>
                    {mode == "Save" &&
                        <form onSubmit={saveOrder} className="flex flex-col gap-[2.5vw]">
                            <div>
                                <label>
                                    <input placeholder="Enter Order Name" onChange={getName} className = "rounded-md w-full h-[3vw] border-gray-500 border-2 pl-[1vw] pr-[0.1vw] text-black" type="text"/>
                                </label>
                            </div>

                            <div>
                                <label>
                                    <input placeholder="Enter Notes" onChange={getNotes} className = "rounded-md w-full h-[3vw] border-gray-500 border-2 pl-[1vw] pr-[0.1vw] text-black"  type="text"/>
                                </label>
                            </div>

                            <div>
                                <label>
                                    <input onChange={getTime} value = {changeTime} className = "rounded-md w-full h-[3vw] border-gray-500 border-2 pl-[1vw] pr-[0.5vw] text-black"  type="time"/>
                                </label>
                            </div>

                            <input className="cursor-pointer w-full h-[3vw] text-[1.5vw] bg-white drop-shadow-md rounded-xl border-solid border-3 border-[#D9D9D9] text-black rounded-lg shadow-md  m-auto" type = "submit" value = "Save Order"/>
                        </form>
                    }
                    {mode == "Pay" &&
                        <form onSubmit={payOrder} className="flex flex-col gap-[2vw] mx-auto w-full justify-center">
                            <div className="">
                                <label>
                                    <input placeholder="Enter Order Name" onChange={getName} className = "rounded-md w-full h-[3vw] border-gray-500 border-2 pl-[1vw] pr-[0.1vw] text-black" type="text" value = {name}/>
                                </label>
                            </div>
                            <p className="text-black text-center text-[1.5vw]">Payment Method</p>
                            <div className="flex justify-between w-[22vw]">
                                <button onClick={(event) => changeType(event)} className= {`${paymentType === "cash" ? "bg-blue-300" : "bg-white"} cursor-pointer  drop-shadow-md rounded-xl border-solid border-3 border-[#D9D9D9] text-black rounded-lg shadow-md w-[5vw] h-[2.5vw]`}>Cash</button>
                                <button onClick={(event) => changeType(event)} className= {`${paymentType === "amex" ? "bg-blue-300" : "bg-white"} cursor-pointer  drop-shadow-md rounded-xl border-solid border-3 border-[#D9D9D9] text-black rounded-lg shadow-md w-[5vw] h-[2.5vw]`}>AMEX</button>
                                <button onClick={(event) => changeType(event)} className= {`${paymentType === "mastercard" ? "bg-blue-300" : "bg-white"} cursor-pointer  drop-shadow-md rounded-xl border-solid border-3 border-[#D9D9D9] text-black rounded-lg shadow-md w-[5vw] h-[2.5vw]`}>MasterCard</button>
                                <button onClick={(event) => changeType(event)} className= {`${paymentType === "visa" ? "bg-blue-300" : "bg-white"} cursor-pointer  drop-shadow-md rounded-xl border-solid border-3 border-[#D9D9D9] text-black rounded-lg shadow-md w-[5vw] h-[2.5vw]`}>VISA</button>
                            </div>

                            {paymentType ? (
                                <div className="flex flex-col gap-[2vw]">
                                    <input step="0.01" onChange = {getTotal} placeholder={total.toFixed(2)} className = "rounded-md w-full h-[3vw] border-gray-500 border-2 pl-[1vw] pr-[0.5vw] text-black" type="number"/>
                                    <input className="cursor-pointer w-full h-[3vw] text-[1.5vw] bg-white drop-shadow-md rounded-xl border-solid border-3 border-[#D9D9D9] text-black rounded-lg shadow-md  m-auto" type = "submit" value = "Pay"/>
                                </div>
                            ) : ("")}
                        </form>
                    }
                    {mode == "Edit" &&
                        <form onSubmit={saveChanges} className="flex flex-col gap-[2vw] mt-[1vw]">
                        <div>
                            <label>
                                <input placeholder={mainOrder.client} onChange={getName} className = "rounded-md w-full h-[3vw] border-gray-500 border-2 pl-[1vw] pr-[0.1vw] text-black" type="text"/>
                            </label>
                        </div>

                        <div>
                            <label>
                                <input placeholder={mainOrder.notes ? mainOrder.notes : "Enter Notes"} onChange={getNotes} className = "rounded-md w-full h-[3vw] border-gray-500 border-2 pl-[1vw] pr-[0.1vw] text-black"  type="text"/>
                            </label>
                        </div>

                        <div>
                            <label>
                                <input onChange={getTime} value = {changeTime} className = "rounded-md w-full h-[3vw] border-gray-500 border-2 pl-[1vw] pr-[0.5vw] text-black"  type="time"/>
                            </label>
                        </div>

                        <input className="cursor-pointer w-full h-[3vw] text-[1.5vw] bg-white drop-shadow-md rounded-xl border-solid border-3 border-[#D9D9D9] text-black rounded-lg shadow-md  m-auto" type = "submit" value = "Save Changes"/>
                    </form>
                    }
                </div>
            </div>
        ) : ("")}
    </div>
    );

}