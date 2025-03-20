"use client";

export default function Settings({setLoggedIn,  setItemsList, setPage}) {

    function LogOut() {
        setItemsList([]);
        setLoggedIn();
        setPage("home");
      }

    return (
        <div className="p-[16px] w-[1700px] flex flex-col bg-white h-full drop-shadow-md rounded-xl border-solid border-3 border-[#D9D9D9]">
            <a className="cursor-pointer" onClick = {() => LogOut()}>Log Out</a>
        </div>
    );
}