"use client"
import { useState, useEffect } from "react"

export default function Alert({message, setMessage}) {
    
    useEffect(() => {
        setTimeout(() => {
            setMessage("")
            console.log("timeout")
        }, 5000)
    }, [message])

    return (
        <div className="absolute bottom-[5vw] left-[0.5vw]">
            {message ? (
                <div className="text-[1vw] w-[13.8vw] h-[3vw] bg-white drop-shadow-md rounded-xl border-solid border-3 border-[#D9D9D9] text-black rounded-lg text-center ">
                    {message.toLowerCase().includes("error") ? ( 
                        <p className="text-red-500 w-full h-full leading-[3vw]">{message}</p>
                    ) : (
                        <p className="text-green-500 w-full h-full leading-[3vw]">{message}</p>
                    )}
                </div>
            ) : (" ")}
        </div>
    )
}