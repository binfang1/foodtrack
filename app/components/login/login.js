"use client";
import { useState, useEffect } from "react";
export default function Login({loggedIn, setLoggedIn, accounts, page, setPage}) {
    const [password, setPassword] = useState("");
    const [user, setUser] = useState("");
    

    const checkLogin = (event) => {
        event.preventDefault();
        if (accounts.some(account => account.username == user)) {
            const index = accounts.findIndex(account => account.username == user);
            if (accounts[index].password == password) {
                setLoggedIn(accounts[index]);
                if (accounts[index].type == "Chef") {
                    setPage("orders");
                }
                else {
                    setPage("home");
                }

            }
            else {
                alert('incorrect username and/or password')
            }
        }
        else {
            alert('incorrect username and/or password')
        }
    }

    const getUser = (event) => {
        setUser(event.target.value);
    };

    const getPass = (event) => {
        setPassword(event.target.value);
    };

    return (
        <div className="w-[100vw] h-[100vh] flex">
            <div className="w-[15.625vw] h-[15.625vw] bg-white drop-shadow-md rounded-xl border-solid border-3 border-[#D9D9D9] m-auto">
                <form onSubmit={checkLogin} className="flex flex-col m-auto gap-[1.7vw] text-center">
                    <h1 className="text-[1.7vw]">Login</h1>
                    <label className="text-[0.7vw]">
                        <input placeholder="Username" onChange={getUser} className = "text-[1.7vw]border-gray-500 border-2 pl-[0.1vw] pr-[0.1vw] text-black" type="text" required/>
                    </label>
                    <label className="text-[0.7vw]">
                        <input placeholder="password" onChange={getPass} className = "border-gray-500 border-2 pl-[0.1vw] pr-[0.1vw] text-black" type="password" required/>
                    </label>
                    <input className="text-[0.7vw] bg-white drop-shadow-md rounded-xl border-solid border-3 border-[#D9D9D9] text-black rounded-lg shadow-md w-[4.7vw] h-[1.6vw] m-auto" type = "submit" value = "Login"/>
                </form>
            </div>
        </div>
    )
}