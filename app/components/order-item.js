"use client";

export default function OrderItem({order}) {
    console.log(order)
    return (
        <div className="p-[12px] w-full bg-white drop-shadow-md border-solid border-3 border-[#D9D9D9]">
            <p>{order.id}</p>
            <p>{order.client}</p>
            <p>{order.creation_datetime}</p>
            <p>{order.status}</p>
            <div className="py-12">
                <p>ITEM 1</p>
                <p>ITEM 2</p>
                <p>ITEM 3</p>
            </div>
        </div>
    );
}

