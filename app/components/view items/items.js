"use client";
import { GoTrash } from "react-icons/go";
import GridItem from "../item grid section/grid-item"
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

  async function getIngredients() {
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

export default function Items({ categoryPage, setCategoryPage, enableSideBar, sideBarEnabled, items, itemsList, setItemsList, setPage, page, setItems, ingredients, setIngredients }) {
    const [popupEnabled, popupIsEnabled] = useState(false);
    const [currentItem, setCurrentItem] = useState();
    const [editTitle, setEditTitle] = useState("")
    const [price, setPrice] = useState(0.00);
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [toggle, setToggle] = useState(false);
    const [inputFields, setInputFields] = useState([])


    let list1 = [];
    let list2 = [];
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

    useEffect(() => {
        getData().then((response) => setItems(response))
        getIngredients().then((response) => setIngredients(response))
      }, []);

    useEffect(() => {
        setItems(items);
    }, [items])


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
                    ingredients: JSON.stringify(list1),
                    ingredient_num: JSON.stringify(list2),
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
                    ingredients: JSON.stringify(list1),
                    ingredient_num: JSON.stringify(list2)
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
        if (organizeItems()) {
            alert("Duplicate Ingredient Found, please change");
            return;
        }
        putData().then((response) => alert("Item Has Been Updated!"));
        setItemsList([]);
        popupIsEnabled(!popupEnabled);
        changeBrightness();
        getData().then((response) => setItems(response));
        setCategoryPage("Default");

    }

    const addItem = (event) => {
        event.preventDefault();
        if (organizeItems()) {
            alert("Duplicate Ingredient Found, please change");
            return;
        }
        postData().then((response) => alert("Item Has Been Added!"));
        setItemsList([]);
        popupIsEnabled(!popupEnabled);
        changeBrightness();
        getData().then((response) => setItems(response));
        setCategoryPage("Default");
    }

    const deleteItem = () => {
        event.preventDefault();
        deleteData().then((response) => alert("Item Has Been deleted"));
        setItemsList([]);
        popupIsEnabled(!popupEnabled);
        changeBrightness();
        getData().then((response) => setItems(response));
        setItems(items);
        setCategoryPage("Default");
    }

    const deleteButton = () => {
        deleteItem();
    }

    useEffect(() => {
        setItems(items);
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

    const getCategory = (event) => {
        event.preventDefault();
        setCategory(event.target.value)
    }

    const handleAddFields = () => {
        const values = [...inputFields];
        let value = ingredients[0].name;
        console.log(value);
        values.push({ingredient: value, amount: 0});
        setInputFields(values)
        console.log(inputFields);
    }

    const handleIngredient = (index, event) => {
        const values = [...inputFields];
        values[index].ingredient = event.target.value;
        setInputFields(values)
    }

    const handleAmount = (index, event) => {
        const values = [...inputFields];
        values[index].amount = event.target.value;
        setInputFields(values)
        console.log(values[index])
    }

    const deleteIngredient = (index, event) => {
        const values = [...inputFields];
        values.splice(index, 1)
        setInputFields(values)
    }

    const organizeItems = () => {
        for (let i = 0; i < inputFields.length; i++) {
            if (list1.includes(inputFields[i].ingredient)) {
                return true;
            }
            list1.push(inputFields[i].ingredient);
            list2.push(inputFields[i].amount);
        }
        return false;
    }

    useEffect (() => {
        setInputFields(inputFields)
    }, [inputFields])


    function addToInput(ingredient, amount)  {
        let list = [];
        for (let i = 0; i < ingredient.length; i++) {
            list.push({ingredient: ingredient[i], amount: amount[i]})
        }
        setInputFields(list);
    }

    const openPopupEdit = (item) => {
        popupIsEnabled(!popupEnabled);
        changeBrightness()
        setEditTitle("Editing")
        setName("");
        setPrice("");
        setCategory("");
        addToInput(JSON.parse(item.ingredients), JSON.parse(item.ingredient_num));
        setCurrentItem(item)
    }

    const openPopupAdd = () => {
        popupIsEnabled(!popupEnabled);
        changeBrightness()
        setEditTitle("Adding")
        setName("");
        setPrice("");
        setCategory("");
        let value = ingredients[0].name
        setInputFields([{ingredient : value, amount : "0"}])
        setCurrentItem()
    }

    const closePopUp = () => {
        popupIsEnabled(!popupEnabled);
        changeBrightness()
    }

    



    return (
        <div className="relative h-[100vh] w-[85vw] bg-white h-full drop-shadow-md rounded-xl border-solid border-3 border-[#D9D9D9]">
            <div className="p-[0.8vw] h-[100vh] flex flex-col bg-white rounded-xl" >
                <div className="overflow-auto">
                    <div>
                        {categories.map(category => (
                            <div key = {category.category}>
                                <h1 className="text-[1.5vw]">{category.category}:</h1>
                                
                                <div className="flex flex-col">
                                    <div className="mb-[0.8vw]">
                                        <div className="grid grid-cols-5 text-[0.9vw]">
                                            <p>Image:</p>
                                            <p>Name:</p>
                                            <p>price:</p>
                                            <p>Ingredients:</p>
                                            <p className="invisible">a</p>
                                        </div>
                                        <hr></hr>
                                    </div>
                                    
                                    {items.filter(item => item.category === category.category).map(item => (
                                        <div key={item.id}>
                                            <div className = "mb-[0.8vw] grid grid-cols-5 bg-white text-black text-black shadow-sm text-[0.9vw]">
                                                <img src={`/item_images/${item.id}.png`} className="w-[4vw] h-[4vw]"></img>
                                                <p className="text-[0.9vw]"> {item.name} </p>
                                                <p className="text-[0.9vw]">${item.price.toFixed(2)}</p>
                                                <div className="flex flex-col">
                                                {
                                                    JSON.parse(item.ingredients).map((ingredient, index) => (
                                                        <p key = {index} className="text-[0.9vw]">{ingredient} {JSON.parse(item.ingredient_num)[index]}</p>
                                                    ))
                                                }
                                                </div>
                                                <p className="cursor-pointer hover:underline ml-auto mr-[1vw] text-[0.9vw]" onClick = {() => openPopupEdit(item)}>Edit</p>
                                            </div>
                
                                        </div>
                                        
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>    
                        
                </div>
                <button onClick = {openPopupAdd} className="mt-auto mb-[1.5vw] cursor-pointer bg-white rounded-xl border-solid border-3 border-[#D9D9D9] text-black rounded-lg shadow-md h-[3vw] text-[0.9vw]">Add Item</button>
            </div>
            {popupEnabled ? (
                        <div className = "absolute bottom-0 left-[-0.2vw] top-[-0.2vw] right-0 flex justify-center items-center w-[85vw] h-[100vh] bg-black/50">
                            <div className ="flex flex-col absolute p-12 max-w-[40vw] w-full  bg-white">
                                <div className="flex justify-end">
                                    <button className="cursor-pointer text-black text-[2vw] w-[1.5vw] h-[1.5vw]" onClick = {() => closePopUp()}>X</button>
                                </div>
                                <h1 className="text-black text-[1.5vw] mb-4 mx-auto">{editTitle} "{currentItem ? currentItem.name : "New Item"}"</h1>
                                {editTitle == "Editing" &&
                                    <form onSubmit={editItem} className="flex flex-col gap-[1vw] mx-auto">
                                        <div className="">
                                            <label>
                                                <input placeholder = {currentItem.name} onChange={getName} className = "border-gray-500 border-2 pl-[0.1vw] pr-[0.1vw] text-black w-[12.2vw]"  value = {name} type="text"/>
                                            </label>
                                        </div>

                                        <div className="">
                                            <label>
                                                <input placeholder= {currentItem.price.toFixed(2)} step="0.01" min = "0" onChange={getPrice} className = "border-gray-500 border-2 pl-[0.1vw] pr-[0.1vw] text-black w-[12.2vw]"  value = {price} type="number"/>
                                            </label>
                                        </div>
                                        
                                        
                                        <div className="">
                                            <label>
                                                <input placeholder={currentItem.category} onChange={getCategory} className = "border-gray-500 border-2 pl-[0.1vw] pr-[0.1vw] text-black w-[12.2vw]"  value = {category} type="text"/>
                                            </label>
                                        </div>

                                        <div className="mx-auto flex flex-col gap-[1vw]">
                                            {inputFields.map((ingredient, index) =>
                                            <div key = {index} className="flex gap-[0.5vw]">
                                            <select value = {ingredient.ingredient} onChange = {(event) => handleIngredient(index, event)} className = "h-[2vw] w-[8.5vw] border-gray-500 border-2 pl-[0.1vw] pr-[0.1vw] text-black mx-auto">
                                                {   
                                                    
                                                    ingredients.map((ingredient, index) => (
                                                            <option key = {index} className="text-[0.9vw]">{ingredient.name}</option>
                                                    ))
                                                }
                                            </select>
                                            <input placeholder={ingredient.amount} onChange = {(event) => handleAmount(index, event)}className="text-center w-[3vw] border-gray-500 border-2 pl-[0.1vw] pl-[0.1vw] text-black" step="0.1" min = "0.1" type="number"></input>
                                            <GoTrash onClick = {(event) => deleteIngredient(index, event)} className="cursor-pointer text-[1.5vw] m-auto"></GoTrash>
                                            </div>
                                            )}
                                        </div>

                                        <div className="mx-auto">
                                            <input onClick = {() => handleAddFields()}className="cursor-pointer m-auto  rounded-xl border-solid border-3 border-[#D9D9D9] text-black rounded-lg shadow-md w-[10vw] h-[2.5vw]" type = "button" value = "Add Ingredient"/>
                                        </div>

                               
                                        
                                        <div className="flex gap-[1vw] mx-auto">
                                            <input className="cursor-pointer m-auto bg-white drop-shadow-md rounded-xl border-solid border-3 border-[#D9D9D9] text-black rounded-lg shadow-md w-[6.2vw] h-[2.5vw]" type = "submit" value = "Save Changes"/>
                                            <input onClick = {() => deleteButton()}className="cursor-pointer m-auto bg-red-300  rounded-xl border-solid border-3 border-[#D9D9D9] text-black rounded-lg shadow-md w-[6.2vw] h-[2.5vw]" type = "button" value = "Delete Item"/>
                                        </div>
                                    </form>
                                }
                                {editTitle == "Adding" &&
                                    <form onSubmit={addItem} className="flex flex-col gap-[1vw] mx-auto">
                                        <div className="">
                                            <label>
                                                <input placeholder = "Enter Item Name" onChange={getName} className = "border-gray-500 border-2 pl-[0.1vw] pr-[0.1vw] text-black w-[12.2vw]"  value = {name} type="text"/>
                                            </label>
                                        </div>

                                        <div className="">
                                            <label>
                                                <input placeholder= "Enter Price" step="0.01" min = "0" onChange={getPrice} className = "border-gray-500 border-2 pl-[0.1vw] pr-[0.1vw] text-black w-[12.2vw]"  value = {price} type="number"/>
                                            </label>
                                        </div>
                                        
                                        
                                        <div className="">
                                            <label>
                                                <input placeholder="Enter Category" onChange={getCategory} className = "border-gray-500 border-2 pl-[0.1vw] pr-[0.1vw] text-black w-[12.2vw]"  value = {category} type="text"/>
                                            </label>
                                        </div>

                                        <div className="mx-auto flex flex-col gap-4">
                                            {inputFields.map((ingredient, index) =>
                                            <div key = {index} className="flex gap-[0.5vw]">
                                            <select value = {ingredient.ingredient} onChange = {(event) => handleIngredient(index, event)} className = "h-[2vw] w-[8.5vw] border-gray-500 border-2 pl-[0.1vw] pr-[0.1vw] text-black mx-auto">
                                                {   
                                                    
                                                    ingredients.map((ingredient, index) => (
                                                            <option key = {index} className="text-[0.9vw]">{ingredient.name}</option>
                                                    ))
                                                }
                                            </select>
                                            <input placeholder={ingredient.amount} onChange = {(event) => handleAmount(index, event)}className="text-center w-[3vw] border-gray-500 border-2 pl-[0.1vw] pr-[0.1vw] text-black" step="0.1" min = "0.1" type="number"></input>
                                            <GoTrash onClick = {(event) => deleteIngredient(index, event)} className="cursor-pointer text-[1.5vw] m-auto"></GoTrash>
                                            </div>
                                            )}
                                        </div>

                                        <div className="mx-auto">
                                            <input onClick = {() => handleAddFields()}className="cursor-pointer m-auto  rounded-xl border-solid border-3 border-[#D9D9D9] text-black rounded-lg shadow-md w-[6.2vw] h-[2.5vw]" type = "button" value = "Add Ingredient"/>
                                        </div>

                                        

                                        <input className="cursor-pointer m-auto bg-white drop-shadow-md rounded-xl border-solid border-3 border-[#D9D9D9] text-black rounded-lg shadow-md w-[8vw] h-[2.5vw]" type = "submit" value = {currentItem ? "Save Changes" : "Save Item"}/>
                                    </form>
                                }
                            </div>
                        </div>
                    ) : ("")}
        </div>
    );
}