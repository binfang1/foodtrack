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
        <div className="p-[16px] grid grid-cols-4 grid-rows-4 w-[1310px] gap-[34px] bg-white h-full drop-shadow-md rounded-xl border-solid border-3 border-[#D9D9D9]">
            {items.map(item => (
                <GridItem key={item.id} id={item.id} name={item.name} price={item.price} itemsList={itemsList} setItemsList={setItemsList} ></GridItem>
            ))}
        </div>
    );

}