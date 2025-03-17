"use client";

export default function OrderItem({order}) {
    var counter = 1;
    return (
        
        <div className="p-[12px] w-full bg-white drop-shadow-md border-solid border-3 border-[#D9D9D9]">
            <p>{order.id}</p>
            <p>{order.client}</p>
            <p>{order.creation_datetime}</p>
            <p>{order.status}</p>
            <div className="py-12">
                {JSON.parse(order.items).map(item => (
                    <p key = {counter++}>{item.name}</p>
                ))}
            </div>
        </div>
    );
}

