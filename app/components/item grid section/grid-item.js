"use-client";
import { useEffect, useState } from "react";


export default function GridItem({itemGridEnabled, enableItemGrid, id, name, price, ingredients, num_ingred, category, itemsList, setItemsList }) {


    function onClick() {
        const newItemsList = [...itemsList]
        if (newItemsList.some(item => item.name == name)) {
            const index = newItemsList.findIndex(item => item.name === name);
            const oldPrice = newItemsList[index].price / newItemsList[index].quantity
            newItemsList[index].quantity += 1;
            newItemsList[index].price = newItemsList[index].price + oldPrice;
        }
        else {
            newItemsList.push({"id": id, "quantity": 1, "name": name, "price": price, "category": category, "ingredients": ingredients, "num_of": num_ingred })
        }
        setItemsList(newItemsList);
    }

    return (
        <div onClick={enableItemGrid ? onClick : undefined} className="cursor-pointer text-center flex flex-col justify-center h-[11.6vw] w-[9.12vw] bg-white drop-shadow-md border-solid border-3 border-[#D9D9D9] text-[0.84vw]" key={id}>
            <img src={`item_images/${id}.png`}></img>
            <h1>{name}</h1>
            <h3>${price.toFixed(2)}</h3>
        </div>
    );  

}