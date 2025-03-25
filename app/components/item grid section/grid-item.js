"use-client";
import { useEffect, useState } from "react";


export default function GridItem({ status, itemGridEnabled, enableItemGrid, id, name, price, stock, category, itemsList, setItemsList }) {
    const [inStock, setStock] = useState(status);
    let value = status;
    if (stock == 0) {
        setStock(false);
    }

    useEffect(() => {
        setStock(inStock);
        console.log(inStock)
    }, [inStock])

    function changeStock(value) {
        setStock(value);
    }


    function onClick() {
        const newItemsList = [...itemsList]
        if (newItemsList.some(item => item.name == name)) {
            const index = newItemsList.findIndex(item => item.name === name);
            if (newItemsList[index].quantity == newItemsList[index].stock) {
                setStock(false);
                return;
            }
            const oldPrice = newItemsList[index].price / newItemsList[index].quantity
            newItemsList[index].quantity += 1;
            newItemsList[index].price = newItemsList[index].price + oldPrice;
            console.log(newItemsList[index])
            if (newItemsList[index].quantity == newItemsList[index].stock) {
                setStock(false);
            }
        }
        else {
            newItemsList.push({"id": id, "quantity": 1, "name": name, "price": price, "stock": stock, "category": category, "setter": function(value) {changeStock(value)}});
            if (newItemsList[newItemsList.length -1].quantity == newItemsList[newItemsList.length -1].stock) {
                setStock(false);
            }
        }
        setItemsList(newItemsList);
    }

    return (
        <div onClick={enableItemGrid ? onClick : undefined} className="cursor-pointer text-center flex flex-col justify-center h-[11.6vw] w-[9.12vw] bg-white drop-shadow-md border-solid border-3 border-[#D9D9D9] text-[0.84vw]" key={id}>
            {value ? (
            <img src={`item_images/${id}.png`}></img>

            ) : (
            <div className="relative">
                <img className = "opacity-[50%]" src={`item_images/${id}.png`}></img>
                <p className="absolute top-[50%] left-0 right-0 bottom-0 text-[1vw] drop-shadow-md">Unavailable</p>
            </div>
            )}

            <h1>{name}</h1>
            <h3>${price.toFixed(2)}</h3>
        </div>
    );

}