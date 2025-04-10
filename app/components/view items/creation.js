import { useEffect, useState } from "react";
import { GoMoveToStart } from "react-icons/go";
import { GoTrash } from "react-icons/go";
import styles from "../../styles/styles.module.css";

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


export default function Create({setItemsList, id, setId, currentItem, editTile, price, setPrice, name, setName, category, setCategory, setPage, inputFields, setInputFields, ingredients, setCategoryPage}) {

    
    let list1 = [];
    let list2 = [];
    
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

    useEffect (() => {
        setInputFields(inputFields)
    }, [inputFields])
    
    
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

    const back = () => {
        setPage("");
        setName("");
        setPrice("");
        setCategory("");
        setId("");
        setItemsList([]);
        setCategoryPage("Default")
    }

    const saveChanges = () => {
        event.preventDefault();
        if (organizeItems()) {
            alert("Duplicate Ingredient Found, please change");
            return;
        }

        putData().then((response) => console.log("Item Updated"))
        back()
    }

    const addItem = () => {
        event.preventDefault();
        if (organizeItems()) {
            alert("Duplicate Ingredient Found, please change");
            return;
        }
        setItemsList([]);
        postData().then((response) => console.log("Item added"));
        back()
    }

    const deleteItem = () => {
        event.preventDefault();
        setItemsList([]);
        deleteData().then((response) => console.log("Item Deleted"));
        back()
    }


    return (
        <div className="h-[100vh] p-[0.7vw]">
            <div className="flex align-center">
                <GoMoveToStart onClick={() => back()} className={`${styles.general_button} ${styles.back_button}`}/>
                <h1 className="text-[3vw] ml-auto mt-[-1vw]">{editTile}</h1>
            </div>
            <form  onSubmit = {() => addItem()} className="flex flex-col m-auto gap-[1.7vw] w-[30vw] h-[52vw]">
                <label className="text-[1.5vw] flex flex-col text-left">
                    <p>Item Name:</p>
                    <input value = {name} onChange = {getName} placeholder="Item Name"className = "rounded-md w-full h-[3vw] border-gray-500 border-2 pl-[1vw] pr-[0.1vw] text-black" type="text" required/>
                </label>

                <label className="text-[1.5vw] flex flex-col text-left">
                    <p>Price:</p>
                    <input value = {price} onChange = {getPrice} placeholder="Price" className = "rounded-md w-full h-[3vw] border-gray-500 border-2 pl-[1vw] pr-[0.1vw] text-black" type="number" min="0" step ="0.01" required/>
                </label>

                <label className="text-[1.5vw] flex flex-col text-left">
                    <p>Category:</p>
                    <input value = {category} onChange = {getCategory} placeholder="Category" className = "rounded-md w-full h-[3vw] border-gray-500 border-2 pl-[1vw] pr-[0.1vw] text-black"  type="text" required/>
                </label>

                {inputFields.length != 0 && ( 
                <div className="mx-auto flex flex-col gap-[1vw] overflow-auto max-h-[15vw] border-gray-500 border-2 rounded-md p-[0.5vw] w-full">
                    {inputFields.map((ingredient, index) =>
                    <div key = {index} className="flex gap-[0.5vw] mr-[0.5vw]">
                    <select value = {ingredient.ingredient} onChange = {(event) => handleIngredient(index, event)} className = "text-[1.5vw] rounded-md h-[3vw] w-2/3 border-gray-500 border-2 pl-[0.1vw] pr-[0.1vw] text-black mx-auto">
                        {   
                            
                            ingredients.map((ingredient, index) => (
                                    <option key = {index} className="text-[1.5vw]">{ingredient.name}</option>
                            ))
                        }
                    </select>
                    <input placeholder={ingredient.amount} onChange = {(event) => handleAmount(index, event)} className= "text-[1.5vw] text-left rounded-md w-1/5 border-gray-500 border-2 pl-[0.5vw] pl-[0.1vw] text-black" step="0.1" min = "0.1" type="number"></input>
                        <GoTrash onClick = {(event) => deleteIngredient(index, event)} className="cursor-pointer text-[1.5vw] m-auto"></GoTrash>
                    </div>
                    )}
                </div>
                )}
                <div className="mx-auto">
                    <input onClick = {() => handleAddFields()}className="text-[1vw] cursor-pointer bg-white drop-shadow-md border-solid border-3 border-[#D9D9D9] text-black rounded-lg shadow-md w-[14vw] h-[3vw] m-auto" type = "button" value = "Add Ingredient"/>
                </div>
                

                {id ? (
                    <div className="flex  gap-[2vw]">
                        <input onClick={saveChanges} className="text-[1vw] cursor-pointer bg-white drop-shadow-md border-solid border-3 border-[#D9D9D9] text-black rounded-lg shadow-md w-[14vw] h-[3vw] m-auto" type = "button" value = "Save Changes"/>
                        <input onClick={deleteItem} className="text-[1vw] cursor-pointer bg-red-300 drop-shadow-md text-black rounded-lg shadow-md w-[14vw] h-[3vw] m-auto" type = "button" value = "Delete Ingredient"/>
                    </div>
                ) : (
                    <input  className="text-[1vw] cursor-pointer bg-white drop-shadow-md border-solid border-3 border-[#D9D9D9] text-black rounded-lg shadow-md w-[30vw] h-[3vw] mx-auto" type = "submit" value = "Add Item"/>
                )}
               
            </form>
        </div>
)}