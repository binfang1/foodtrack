"use client";

import { useEffect } from "react";

export default function ItemList({ itemsList, subTotal, tax, total, setSubTotal, setTax, setTotal }) {

    useEffect(() => {
        let tempSubTotal = 0.00;
        itemsList.forEach(item => {
            tempSubTotal += item.price;
        });
        let tempTax = tempSubTotal * 0.05;
        let tempTotal = tempSubTotal + tempTax;
        setSubTotal(tempSubTotal);
        setTax(tempTax);
        setTotal(tempTotal);
        console.log(subTotal);
        console.log(tax);
        console.log(total);
    }, [itemsList]);



    function remove() {

    }

    return (
        <div className="flex h-full flex-row w-96">
            <div>
                {itemsList.map((item, index) => (
                    <p key={index}>{item.name} - {item.price}</p>
                    ))}
            </div>
            <div className="self-end">
                <p>SUBTOTAL: {subTotal}</p>
                <p>TAX: {tax}</p>
                <p>TOTAL: {total}</p>
                <button>SUBMIT</button>
            </div>
        </div>
    );

}