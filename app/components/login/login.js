"use client";
import { useState, useEffect } from "react";
export default function Login({loggedIn, setLoggedIn, accounts}) {
    const [password, setPassword] = useState("");
    const [user, setUser] = useState("");
    

    const checkLogin = (event) => {
        event.preventDefault();
        console.log(password, user)
        console.log(accounts)
        if (accounts.some(account => account.username == user)) {
            const index = accounts.findIndex(account => account.username == user);
            if (accounts[index].password == password) {
                setLoggedIn(accounts[index]);
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
        <div className="w-[300px] h-[300px] mt-[200px] bg-white drop-shadow-md rounded-xl border-solid border-3 border-[#D9D9D9] m-auto">
            <form onSubmit={checkLogin} className="flex flex-col m-auto gap-[32px] text-center">
                <h1 className="text-[32px]">Login</h1>
                <label>Username:
                    <input onChange={getUser} className = "border-gray-500 border-2 pl-[2px] pr-[2px] text-black" type="text" required/>
                </label>
                <label>Password:
                    <input onChange={getPass} className = "border-gray-500 border-2 pl-[2px] pr-[2px] text-black" type="text" required/>
                </label>
                <input className="bg-white drop-shadow-md rounded-xl border-solid border-3 border-[#D9D9D9] text-black rounded-lg shadow-md w-32 h-12 m-auto" type = "submit" value = "Login"/>
            </form>
        </div>
    )
}