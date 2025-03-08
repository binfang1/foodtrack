"use-client";

export default function GridItem({ id, name, price, itemsList, setItemsList }) {

    function onClick() {
        const newItemsList = [...itemsList]
        newItemsList.push({"name": name, "price": price});
        setItemsList(newItemsList);
        console.log(itemsList);
    }

    return (
        <div onClick={onClick} className="text-center flex flex-col justify-center h-full bg-sky-300" key={id}>
            <h2>{id}</h2>
            <h1>{name}</h1>
            <h3>{price}</h3>
            <h1>+</h1>
        </div>
    );

}