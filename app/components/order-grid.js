"use client";

import OrderItem from "./order-item";

export default function OrderGrid() {

    return (
        <div className="grid grid-cols-6 grid-rows-2 w-full gap-4 bg-sky-200">
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