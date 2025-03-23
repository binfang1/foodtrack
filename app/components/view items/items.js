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

    let categories = [];

    for (let i = 0; i < items.length; i++) {
        const category = new Object;
        if (categories.some(item => item.category == items[i].category)) { 
            const index = categories.findIndex(item => item.category == items[i].category);
            categories[index].object.push(items[i])
        }
        else {
            category.category = items[i].category;
            category.object = [items[i]];
            categories.push(category);
        }
    }
    categories.sort(function(a, b) {return a.category.localeCompare(b.category);});
    console.log(categories)



    async function putData() {
        const url = "http://localhost:3000/api/items";
        try {
          const response = await fetch(url , {
            'method': 'PUT',
            'body': JSON.stringify(
                {  
                    name: (name ? name : currentItem.name),
                    price: (price ? price : currentItem.price),
                    category: (category ? category : currentItem.category),
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

    async function deleteData() {
        const url = "http://localhost:3000/api/items";
        try {
            const response = await fetch(url , {
            'method': 'DELETE',
            'body': JSON.stringify(
                {  
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

    const editItem = (event) => {
        event.preventDefault();
        putData().then((response) => alert("Item Has Been Updated!"));
        setItemsList([]);
        popupIsEnabled(!popupEnabled);
        changeBrightness();
        getData().then((response) => setItems(response));
        setItems(items);
    }

    const addItem = (event) => {
        event.preventDefault();
        postData().then((response) => alert("Item Has Been Added!"));
        setItemsList([]);
        popupIsEnabled(!popupEnabled);
        changeBrightness();
        getData().then((response) => setItems(response));
        setItems(items);
    }

    const deleteItem = () => {
        event.preventDefault();
        console.log(currentItem)
        deleteData().then((response) => alert("Item Has Been deleted"));
        setItemsList([]);
        popupIsEnabled(!popupEnabled);
        changeBrightness();
        getData().then((response) => setItems(response));
        setItems(items);
    }



    const deleteButton = () => {
        deleteItem();
    }

    useEffect(() => {
        setItems(items);
    }, [items]);


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

    const getCategory = (event) => {
        event.preventDefault();
        setCategory(event.target.value)
    }

    const openPopupEdit = (item) => {
        popupIsEnabled(!popupEnabled);
        changeBrightness()
        setEditTitle("Editing")
        setName("");
        setPrice("");
        setCategory("");
        setCurrentItem(item)
    }

    const openPopupAdd = () => {
        popupIsEnabled(!popupEnabled);
        changeBrightness()
        setEditTitle("Adding")
        setName("");
        setPrice("");
        setCategory("");
        setCurrentItem()
    }

    const closePopUp = () => {
        popupIsEnabled(!popupEnabled);
        changeBrightness()
    }

    



    return (
        <div className="relative h-[100vh] w-[85vw] bg-white h-full drop-shadow-md rounded-xl border-solid border-3 border-[#D9D9D9]">
            <div className="p-[0.8vw] h-[100vh] flex flex-col bg-white rounded-xl" >
                <button onClick = {openPopupAdd} className="mb-[0.8vw] cursor-pointer bg-white drop-shadow-md rounded-xl border-solid border-3 border-[#D9D9D9] text-black rounded-lg shadow-md h-[5vw]">Add Item</button>
                <div className="overflow-auto">
                    <div>
                        {categories.map(category => (
                            <div key = {category.category}>
                                <h1 className="text-[1.5vw]">{category.category}:</h1>
                                <div className="flex flex-wrap gap-[1vw] mb-[2vw]">
                                    {items.filter(item => item.category === category.category).map(item => (
                                        <div className = "flex mt-4 p-2 bg-white drop-shadow-md rounded-xl border-solid border-3 border-[#D9D9D9] text-black rounded-lg shadow-md w-[15vw] h-[3.5vw]" key={item.id}>
                                            <div>
                                                <p>Name: {item.name} </p>
                                                <p>Price:${item.price.toFixed(2)}</p>
                                            </div>
                                            <p className="cursor-pointer ml-auto justify-self-center hover:underline" onClick = {() => openPopupEdit(item)}>edit</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>    

                </div>
            </div>
            {popupEnabled ? (
                        <div className = "absolute bottom-0 left-[-0.2vw] top-[-0.2vw] right-0 flex justify-center items-center w-[85vw] h-[100vh] bg-black/50">
                            <div className ="flex flex-col absolute p-12 max-w-[400px] w-full h-full max-h-[500px] bg-white">
                                <div className="flex justify-end">
                                    <button className="cursor-pointer text-black text-3xl w-10 h-10" onClick = {() => closePopUp()}>X</button>
                                </div>
                                <h1 className="text-black text-2xl mb-4 mx-auto">{editTitle} "{currentItem ? currentItem.name : "New Item"}"</h1>
                                {editTitle == "Editing" &&
                                    <form onSubmit={editItem} className="flex flex-col gap-[20px] mx-auto">
                                        <div className="mx-auto">
                                            <label>
                                                <input placeholder = {currentItem.name} onChange={getName} className = "border-gray-500 border-2 pl-[2px] pr-[2px] text-black"  value = {name} type="text"/>
                                            </label>
                                        </div>

                                        <div className="mx-auto">
                                            <label>
                                                <input placeholder= {currentItem.price.toFixed(2)} onChange={getPrice} className = "border-gray-500 border-2 pl-[2px] pr-[2px] text-black"  value = {price} type="number"/>
                                            </label>
                                        </div>
                                        
                                        
                                        <div className="mx-auto">
                                            <label>
                                                <input placeholder={currentItem.category} onChange={getCategory} className = "border-gray-500 border-2 pl-[2px] pr-[2px] text-black"  value = {category} type="text"/>
                                            </label>
                                        </div>
                                        
                                        <div className="flex gap-[1vw] mx-auto">
                                            <input className="cursor-pointer m-auto bg-white drop-shadow-md rounded-xl border-solid border-3 border-[#D9D9D9] text-black rounded-lg shadow-md w-32 h-12" type = "submit" value = "Save Changes"/>
                                            <input onClick = {() => deleteButton()}className="cursor-pointer m-auto bg-red-300  rounded-xl border-solid border-3 border-[#D9D9D9] text-black rounded-lg shadow-md w-32 h-12" type = "button" value = "Delete Item"/>
                                        </div>
                                    </form>
                                }
                                {editTitle == "Adding" &&
                                    <form onSubmit={addItem} className="flex flex-col gap-[20px] mx-auto">
                                        <div>
                                            <label>
                                                <input placeholder="Enter Item Name" required onChange={getName} className = "border-gray-500 border-2 pl-[2px] pr-[2px] text-black"  value = {name} type="text"/>
                                            </label>
                                        </div>

                                        <div>
                                            <label>
                                                <input placeholder="Enter Price" required onChange={getPrice} className = "border-gray-500 border-2 pl-[2px] pr-[2px] text-black"  value = {price} type="number"/>
                                            </label>
                                        </div>

                                        <div>
                                            <label>
                                                <input placeholder="Enter Category" required onChange={getCategory} className = "border-gray-500 border-2 pl-[2px] pr-[2px] text-black"  value = {category} type="text"/>
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