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
        <div className="grid grid-cols-6 grid-rows-4 w-full gap-4 bg-sky-200">
            {items.map(item => (
                <GridItem key={item.id} id={item.id} name={item.name} price={item.price} itemsList={itemsList} setItemsList={setItemsList} ></GridItem>
            ))}
        </div>
    );

}