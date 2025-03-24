"use client";

export default function Sidebar() {


    return (
        <div className="w-[220px] bg-[#E4E4EF]">
            <div className="bg-white h-full drop-shadow-md rounded-xl border-solid border-3 border-[#D9D9D9] p-[8px]  flex flex-col">
                <div className="px-[8px] text-[14px]">
                    <h1 className="text-[#757575]">Welcome PLACEHHOLDER</h1>
                    <h2 className="font-semibold text-[20px] mb-[-10px]"><a href="/">FoodTrack</a></h2>
                    <hr className="border-[#D9D9D9] my-[20px]"></hr>
                </div>
                <div className = "text-[18px] h-[880px]">
                    <a href="/" className="px-[8px]">Home</a>
                    <hr className="border-[#D9D9D9] my-[20px] mx-[8px]"></hr>
                    <a className="px-[8px]">Items</a>
                    <hr className="border-[#D9D9D9] my-[20px] mx-[8px]"></hr>
                    <a href="/orders" className="px-[8px]">Orders</a>
                    <hr className="border-[#D9D9D9] my-[20px] mx-[8px]"></hr>
                    <a className="px-[8px]">History</a>
                    <hr className="border-[#D9D9D9] my-[20px] mx-[8px]"></hr>
                    <a className="px-[8px]">Accounts</a>
                    <hr className="border-[#D9D9D9] my-[20px] mx-[8px]"></hr>
                </div>
                <a className="px-[8px] mb-[24px]">Settings</a>
            </div>
        </div>
    );

}

