"use client";
import GridItem from "../../components/item list section/grid-item"
import { useState, useEffect } from "react";

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

export default function Items({ enableSideBar, sideBarEnabled, items, itemsList, setItemsList, setPage, page, setItems }) {
    const [popupEnabled, popupIsEnabled] = useState(false);
    const [currentItem, setCurrentItem] = useState();
    const [editTitle, setEditTitle] = useState("")
    const [price, setPrice] = useState(0.00);
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [toggle, setToggle] = useState(false)


    async function putData() {
        const url = "http://localhost:3000/api/items";
        try {
          const response = await fetch(url , {
            'method': 'PUT',
            'body': JSON.stringify(
                {  
                    name: name,
                    price: price,
                    category: category,
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
                    category: category,
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
        popupIsEnabled(!popupEnabled);
        changeBrightness();
        getData().then((response) => setItems(response))
    }

    const addItem = (event) => {
        event.preventDefault();
        postData().then((response) => alert("Item Has Been Added!"));
        setItemsList([]);
        popupIsEnabled(!popupEnabled);
        changeBrightness();
        getData().then((response) => setItems(response))
    }

    useEffect(() => {
    setItemsList(itemsList);
    }, [itemsList]);


    const changeBrightness = () => {
        setToggle(!toggle);
    }

    useEffect(() => {
        if (toggle) {
            document.getElementById('darken').style.filter = 'brightness(50%)'
        }
        else {
            document.getElementById('darken').style.filter = 'brightness(100%)'
        }
    }, [toggle])

    useEffect(() => {
        if (toggle == true) {
            sideBarEnabled(false);
        }
        else if (toggle == false) {
            sideBarEnabled(true);
        }
    }, [toggle])


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
        changeBrightness()
        setEditTitle("Editing")
        setName(item.name);
        setPrice(item.price);
        setCurrentItem(item)
    }

    const openPopupAdd = () => {
        popupIsEnabled(!popupEnabled);
        changeBrightness()
        setEditTitle("Adding")
        setName("");
        setPrice(0);
        setCurrentItem()
    }

    const closePopUp = () => {
        popupIsEnabled(!popupEnabled);
        changeBrightness()
    }

    



    return (
        <div className="relative h-[100vh] w-[85vw] bg-white h-full drop-shadow-md rounded-xl border-solid border-3 border-[#D9D9D9]">
            <div className="p-[0.8vw] h-[100vh] flex flex-col bg-white rounded-xl" >
                <button onClick = {openPopupAdd} className="mb-[0.8vw] cursor-pointer bg-white drop-shadow-md rounded-xl border-solid border-3 border-[#D9D9D9] text-black rounded-lg shadow-md h-12">Add Item</button>
                <div className="overflow-auto ">    
                    {items.map(item => (
                        <div className = "flex mt-4 p-2 bg-white drop-shadow-md rounded-xl border-solid border-3 border-[#D9D9D9] text-black rounded-lg shadow-md w-96 h-16" key={item.id}>
                            <div>
                                <p>Name: {item.name} </p>
                                <p>Price:${item.price.toFixed(2)}</p>
                            </div>
                            <p className="cursor-pointer ml-auto justify-self-center hover:underline" onClick = {() => openPopupEdit(item)}>edit</p>
                        </div>
                    ))}
                </div>
            </div>
            {popupEnabled ? (
                        <div className = "absolute bottom-0 left-[-0.2vw] top-[-0.2vw] right-0 flex justify-center items-center w-[85vw] h-[100vh] bg-black/50">
                            <div className ="flex flex-col absolute p-12 max-w-[400px] w-full h-full max-h-[500px] bg-white">
                                <div className="flex justify-end">
                                    <button className="cursor-pointer text-black text-3xl w-10 h-10" onClick = {() => closePopUp()}>X</button>
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
                        </div>
                    ) : ("")}
        </div>
    );
}