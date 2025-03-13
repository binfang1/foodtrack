"use client";

import OrderItem from "./order-item";

export default function OrderGrid() {

    return (
        <div className="p-[16px] w-[1700px] grid grid-cols-6 grid-rows-2 gap-4 bg-white h-full drop-shadow-md rounded-xl border-solid border-3 border-[#D9D9D9]">
                <OrderItem></OrderItem>
                <OrderItem></OrderItem>
                <OrderItem></OrderItem>
                <OrderItem></OrderItem>
                <OrderItem></OrderItem>
                <OrderItem></OrderItem>
                <OrderItem></OrderItem>
                <OrderItem></OrderItem>
                <OrderItem></OrderItem>
                <OrderItem></OrderItem>
                <OrderItem></OrderItem>
                <OrderItem></OrderItem>
        </div>
    );
}