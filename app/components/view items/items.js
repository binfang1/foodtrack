"use client";
import { GoPencil } from "react-icons/go";
import Create from "./creation";
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

export default function Items({setMessage, items, setItems, itemsList, setItemsList, ingredients, setCategoryPage}) {
    const [page, setPage] = useState("");
    const [currentItem, setCurrentItem] = useState();
    const [editTitle, setEditTitle] = useState("")
    const [price, setPrice] = useState(0.00);
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [id, setId] = useState("");
    const [inputFields, setInputFields] = useState([])

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
      }, [page]);

    useEffect(() => {
        setItems(items);
    }, [items])


    useEffect(() => {
        setItems(items);
    }, [itemsList]);

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

    const openEdit = (item) => {
        setEditTitle(`Editing "${item.name}"`)
        setName(item.name);
        setPrice(item.price);
        setCategory(item.category);
        addToInput(JSON.parse(item.ingredients), JSON.parse(item.ingredient_num));
        setCurrentItem(item)
        setId(item.id)
        setPage("Create")
    }

    const openAdd = () => {
        setEditTitle("Add New Item")
        setName("");
        setPrice("");
        setCategory("");
        setInputFields([])
        setCurrentItem("")
        setPage("Create")
    }

    



    return (
        <div className="relative h-[100vh] w-[85vw] bg-white h-full drop-shadow-md rounded-xl border-solid border-3 border-[#D9D9D9]">
            {page != "Create" &&
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
                                            <p>Price:</p>
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
                                                        <p key = {index} className="text-[0.9vw] capitalize">{ingredient} {JSON.parse(item.ingredient_num)[index]}</p>
                                                    ))
                                                }
                                                </div>
                                                <GoPencil className="cursor-pointer hover:underline ml-auto mr-[1vw] text-[0.9vw]" onClick = {() => openEdit(item)}/>
                                            </div>
                
                                        </div>
                                        
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>    
                        
                </div>
                <button onClick = {openAdd} className="mt-auto mb-[1.5vw] cursor-pointer bg-white drop-shadow-sm border-solid border-2 border-[#D9D9D9] text-gray-black h-[3vw] text-[2vw]">+</button>
            </div>
            }
            {page ? (
                <div>
                    <Create setMessage = {setMessage} setCategoryPage={setCategoryPage} setItemsList={setItemsList} ingredients = {ingredients} inputFields={inputFields} setInputFields={setInputFields} setPage = {setPage} currentItem={currentItem} editTile={editTitle} setEditTitle={setEditTitle} price={price} setPrice={setPrice} name={name} setName={setName} category={category} setCategory={setCategory} id={id} setId={setId}></Create>
                </div>
            ) : ("")

            }
        </div>
    );
}