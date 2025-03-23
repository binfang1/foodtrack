"use client";
import GridItem from "./grid-item";

export default function ItemGrid({ items, itemsList, setItemsList }) {

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
                <div className="flex flex-wrap w-[50vw] gap-[1vw] m-auto mt-[1.625vw]">
                    {items.map(item => (
                        <GridItem key={item.id} id={item.id} name={item.name} price={item.price} itemsList={itemsList} setItemsList={setItemsList} ></GridItem>
                    ))}
                </div>

            </div>
        </div>
    );

}