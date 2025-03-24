"use client";
import GridItem from "./grid-item";
import CategoryItem from "./category-item";
import { useEffect, useState } from "react";
import { GoMoveToStart } from "react-icons/go";



export default function ItemGrid({categoryPage, setCategoryPage,  itemGridEnabled, enableItemGrid, items, itemsList, setItemsList }) {
    let categories = [];
    let newItems = [];

    for (let i = 0; i < items.length; i++) {
        const category = new Object;
        if (categories.some(item => item.category == items[i].category)) { 
            const index = categories.findIndex(item => item.category == items[i].category);
            categories[index].object.push(items[i])
            newItems.push(items[i])
        }
        else {
            category.category = items[i].category;
            category.object = [items[i]];
            categories.push(category);
            newItems.push(items[i])
        }
    }
    categories.sort(function(a, b) {return a.category.localeCompare(b.category);});

    function inStock(data) {
        const newItemsList = [...itemsList]
        if (newItemsList.some(item => item.id == data.id)) {  
            const index = newItemsList.findIndex(item => item.id === data.id); 
            if (newItemsList[index].stock == 0) {
                return false;
            }
            else {
                return true;
            }
        }
        else if (data.stock == 0) {
            return false;
        }
        else {
            return true;
        }
    }

    function addGrid(amount) {
        let s = "";
        for (let i = 0; i < amount; i++) {
            s += "<p>Test</p>";
        }
        return s;
    }
    

    return ( 
        <div id = "darken-grid" className = "w-[55vw] h-[100vh] bg-[#D9D9D9]">
            <div className="gap-y-[1vw] h-[100vh] bg-white drop-shadow-md rounded-xl border-solid border-3 border-[#D9D9D9]
            max-[769px]:w-[70vw]">
                <div>
                    {categoryPage == "Default" &&
                        <div  className="flex flex-wrap w-[50vw] gap-[1vw] mx-auto mt-[1.625vw]">
                            {categories.map(item => (
                                <CategoryItem key = {item.category} enableItemGrid = {enableItemGrid} itemGridEnabled = {itemGridEnabled} name = {item.category} categoryPage = {categoryPage} setCategoryPage = {setCategoryPage}></CategoryItem>
                            ))}
                        </div>
                    }
                    {categoryPage != "Default" &&
                    <div>
                        <div>
                            <GoMoveToStart onClick={() => setCategoryPage("Default")} className="cursor-pointer text-[3vw] p-[0.4vw] border-1 rounded-3xl solid mt-[1vw] ml-[1vw]"/>
                        </div>
                        <div className="flex flex-wrap w-[50vw] gap-[1vw] mx-auto mt-[1.625vw]">
                            {newItems.filter(item => item.category === categoryPage).map(item => (
                                <GridItem available = {inStock(item)} key={item.id} enableItemGrid = {enableItemGrid} itemGridEnabled = {itemGridEnabled} id={item.id} name={item.name} price={item.price} stock = {item.stock} category = {item.category} itemsList={itemsList} setItemsList={setItemsList} ></GridItem>
                            ))}
                        </div>
                     </div>
                    }
                </div>

            </div>
        </div>
    );

}