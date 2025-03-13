"use client";

export default function OrderItem() {
    return (
        <div className="p-[12px] w-full bg-white drop-shadow-md border-solid border-3 border-[#D9D9D9]">
            <p>ID</p>
            <p>CLIENT</p>
            <p>CREATION TIME</p>
            <p>STATUS</p>
            <div className="py-12">
                <p>ITEM 1</p>
                <p>ITEM 2</p>
                <p>ITEM 3</p>
            </div>
        </div>
    );
}

