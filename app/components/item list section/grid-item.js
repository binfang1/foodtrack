"use-client";

export default function GridItem({ id, name, price, itemsList, setItemsList }) {

    function onClick() {
        const newItemsList = [...itemsList]
        if (newItemsList.some(item => item.name == name)) {
            const index = newItemsList.findIndex(item => item.name === name);
            const oldPrice = newItemsList[index].price / newItemsList[index].quantity
            newItemsList[index].quantity += 1;
            newItemsList[index].price = newItemsList[index].price + oldPrice;
        }
        else {
            newItemsList.push({"quantity": 1, "name": name, "price": price});
        }
        setItemsList(newItemsList);
        console.log(itemsList);
    }

    return (
        <div onClick={onClick} className="cursor-pointer text-center flex flex-col justify-center h-[7.8vw] w-[9.12vw] bg-white drop-shadow-md border-solid border-3 border-[#D9D9D9] text-[0.84vw]" key={id}>
            <h2>{id}</h2>
            <h1>{name}</h1>
            <h3>${price.toFixed(2)}</h3>
        </div>
    );

}