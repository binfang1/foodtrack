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
        <div className="text-[18px] pl-[32px] py-[32px] flex h-full flex-col w-[390px] bg-white h-full drop-shadow-md rounded-xl border-solid border-3 border-[#D9D9D9]">
            <div className="overflow-auto touch-auto">
                {itemsList.map((item, index) => (
                    <div key={index} className="w-full">
                        <div className="flex py-[4px]">
                            <p>{item.name}:</p>
                            <p className="ml-auto pr-[32px]">${item.price}</p>
                        </div>
                        <hr className="border-[#D9D9D9] my-[20px] mb-[40px] mr-[32px]"></hr>
                    </div>
                    ))}
            </div>
            <div className="mt-auto pr-[32px]">
                <hr className="border-[#D9D9D9] my-[32px]"></hr>

                <div className="flex py-[4px]">
                    <p>SubTotal:</p>
                    <p className="ml-auto">${subTotal}</p>
                </div>

                <div className="flex py-[4px]">
                    <p>Tax:</p>
                    <p className="ml-auto">${tax}</p>
                </div>

                <div className="flex py-[4px]">
                    <p>Total:</p>
                    <p className="ml-auto">${total}</p>
                </div>
                
                <div className="flex justify-between mt-[32px]">
                    <button className="py-[14px] w-[136px] bg-[#BABABA] drop-shadow-sm border-solid border-2 border-[#D9D9D9]">Save</button>
                    <button className="py-[14px] w-[136px] drop-shadow-sm border-solid border-2 border-[#D9D9D9]">Pay</button>
                </div>
                
            </div>
        </div>
    );

}