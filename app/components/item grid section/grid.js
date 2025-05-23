"use client";
import GridItem from "./grid-item";
import CategoryItem from "./category-item";
import { useEffect, useState } from "react";
import { GoMoveToStart } from "react-icons/go";
import styles from "../../styles/styles.module.css"



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
                        <div>
                        <div className="p-[0.2vw]">
                            <p className="invisible">a</p>
                        </div>
                        <div  className="flex flex-wrap w-[50vw] gap-[1vw] mx-auto mt-[1.625vw]">
                            {categories.map(item => (
                                <CategoryItem key = {item.category} enableItemGrid = {enableItemGrid} itemGridEnabled = {itemGridEnabled} name = {item.category} categoryPage = {categoryPage} setCategoryPage = {setCategoryPage}></CategoryItem>
                            ))}
                        </div>
                        </div>
                    }
                    {categoryPage != "Default" &&
                    <div>
                        <div className="p-[0.2vw]">
                            <GoMoveToStart onClick={() => setCategoryPage("Default")} className={`${styles.general_button} ${styles.back_button}`}/>
                        </div>
                        <div className="flex flex-wrap w-[50vw] gap-[1vw] mx-auto">
                            {newItems.filter(item => item.category === categoryPage).map(item => (
                                <GridItem key={item.id} enableItemGrid = {enableItemGrid} itemGridEnabled = {itemGridEnabled} id={item.id} name={item.name} price={item.price} ingredients = {JSON.parse(item.ingredients)} num_ingred = {JSON.parse(item.ingredient_num)} category = {item.category} itemsList={itemsList} setItemsList={setItemsList}></GridItem>
                            ))}
                        </div>
                     </div>
                    }
                </div>

            </div>
        </div>
    );

}