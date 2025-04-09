import axios from "axios";
import { use, useEffect, useState } from "react";
import { GoMoveToStart } from "react-icons/go";
import { GoTrash } from "react-icons/go";
import { GoFileDirectory } from "react-icons/go";
import { GoX } from "react-icons/go";
import { GoCheck } from "react-icons/go";



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


export default function Create({setMessage, setItemsList, id, setId, currentItem, editTile, price, setPrice, name, setName, category, setCategory, setPage, inputFields, setInputFields, ingredients, setCategoryPage}) {
    const checkImage = () => {
        var image = new Image();
        image.src = `/item_images/${id}.png`;
        console.log(image)
        if (image.width == 0) {
            return {img : "", object : ""};
         } else {
            return {img : `/item_images/${id}.png`, object : false};
         }
    }

    const [files, setFile] = useState(() => checkImage());
    console.log(files)
    let list1 = [];
    let list2 = [];

    
    const uploadFile = (event) => {
        const object = event.target.files[0];
        const updateFile = {img: URL.createObjectURL(object), object : object}
        setFile(updateFile);
    }

    useEffect (() => {
        setFile(files)
        console.log(files)
    }, [files]);

    async function postFile() {
        const formData = new FormData();
        formData.append('file', files.object);
        const url = "http://localhost:3000/api/images";
        const {data} = await axios.post(url, formData)
        console.log(data)

    }
    
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
        values.push({ingredient: value, amount: 0});
        setInputFields(values)
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
        setFile("")
    }

    const saveChanges = () => {
        event.preventDefault();
        if (organizeItems()) {
            setMessage("Error: Duplicate Entry found!");
            return;
        }

        putData().then((response) => setMessage("Item Updated"))
        back()
    }

    const addItem = () => {
        event.preventDefault();
        if (organizeItems()) {
            setMessage("Error: Duplicate Entry found!");
            return;
        }
        setItemsList([]);
        postData().then((response) => setMessage("Item added"));
        back()
    }

    const deleteItem = () => {
        event.preventDefault();
        setItemsList([]);
        deleteData().then((response) => setMessage("Item Deleted"));
        back()
    }

    const removeImage = () => {
        setFile({img : "", object : ""});
    }


    return (
        <div className="h-[100vh]">
            <GoMoveToStart onClick={() => back()} className="cursor-pointer text-[3vw] p-[0.4vw] border-1 rounded-3xl solid mt-[1vw] ml-[1vw]"/>
            <h1 className="text-[3vw] absolute top-0 right-[1vw] bottom-0 mx-auto">{editTile}</h1>
            <div className="flex justify-center gap-[2.5vw] h-full mt-[2vw]">
                <form  onSubmit = {() => addItem()} className="flex flex-col gap-[1.7vw] w-[30vw]">

                        <label className="text-[1.5vw] flex flex-col text-left">
                            <p>Item Name:</p>
                            <input value = {name} onChange = {getName} placeholder="Item Name"className = "rounded-md w-full h-[3vw] border-gray-500 border-2 pl-[1vw] pr-[0.1vw] text-black" type="text" required/>
                        </label>
                    <div className="flex gap-[1vw]">
                        <label className="text-[1.5vw] flex flex-col text-left">
                            <p>Price:</p>
                            <input value = {price} onChange = {getPrice} placeholder="Price" className = "rounded-md w-full h-[3vw] border-gray-500 border-2 pl-[1vw] pr-[0.1vw] text-black" type="number" min="0" step ="0.01" required/>
                        </label>


                        <label className="text-[1.5vw] flex flex-col text-left">
                            <p>Category:</p>
                            <input value = {category} onChange = {getCategory} placeholder="Category" className = "rounded-md w-full h-[3vw] border-gray-500 border-2 pl-[1vw] pr-[0.1vw] text-black"  type="text" required/>
                        </label>
                    </div>



                    {inputFields.length != 0 && 
                    <label className="text-[1.5vw] flex flex-col text-left">Ingredients:
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
                    </label>
                    }
                    <div className="mx-auto">
                        <input onClick = {() => handleAddFields()}className="text-[1vw] cursor-pointer bg-white drop-shadow-md border-solid border-3 border-[#D9D9D9] text-black rounded-lg shadow-md w-[30vw] h-[3vw] m-auto" type = "button" value = "Add Ingredient"/>
                    </div>
                    

                    {id ? (
                        <div className="flex gap-[1vw]">
                            <input onClick={saveChanges} className="text-[1vw] cursor-pointer bg-white drop-shadow-md border-solid border-3 border-[#D9D9D9] text-black rounded-lg shadow-md w-[14vw] h-[3vw] m-auto" type = "button" value = "Save Changes"/>
                            <input onClick={deleteItem} className="text-[1vw] cursor-pointer bg-red-300 drop-shadow-md text-black rounded-lg shadow-md w-[14vw] h-[3vw] m-auto" type = "button" value = "Delete Item"/>
                        </div>
                    ) : (
                        <input  className="text-[1vw] cursor-pointer bg-white drop-shadow-md border-solid border-3 border-[#D9D9D9] text-black rounded-lg shadow-md w-[30vw] h-[3vw] mx-auto" type = "submit" value = "Add Item"/>
                    )}
                
                </form>
                {/*
                <div>
                    <p className="text-[1.5vw]">Image:</p>
                    <div className="w-[31vw] h-[31vw] border-solid border-black border-2 rounded-lg shadow-md ">
                        {files.img ? (
                            <div className="w-full h-full rounded-lg relative">
                                <GoX className="absolute text-black text-[3vw] right-0 cursor-pointer"/>           
                                <GoX onClick = {removeImage} className="absolute text-white text-[3vw] right-0 cursor-pointer hover:opacity-[50%] text-shadow-lg"/>           
                                <img className = "w-full h-full rounded-lg" src={(files.img)}/>
                            </div>

                        ) : (
                            <div className = "w-full h-full relative">
                                <input className = "cursor-pointer w-full h-full opacity-0 relative z-10" onChange={uploadFile} type="file"></input>
                                <div className="rounded-lg bg-stone-100 w-full h-full absolute top-0 z-1 flex flex-col text-[2vw] text-center justify-center">
                                    <GoFileDirectory className="text-[3vw] mx-auto "/>
                                    <p>Upload Image</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                */}
            </div>
        </div>
)}