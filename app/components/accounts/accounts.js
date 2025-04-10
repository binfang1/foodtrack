"use client";
import GridItem from "../item grid section/grid-item"
import { useState, useEffect } from "react";
import Create from "./creation";
import { GoPencil } from "react-icons/go";

async function getData() {
    const url = "http://localhost:3000/api/accounts";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const json = await response.json();
      return json;
    } catch (error) {
      console.error(error.message);
    }
  }

export default function Items({setMessage, accounts , setAccounts }) {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [type, setType] = useState("Server");
    const [page, setPage] = useState("");
    const acconutType = ["Manager", "Server", "Chef"]
    const [editTitle, setEditTitle] = useState("")
    const [id, setId] = useState("")

    useEffect(() => {
        getData().then((response) => setAccounts(response))
    }, [page]);


    const change = () => {
        setPage("Create");
        setEditTitle("Add New Account")
    }

    const edit = (data) => {
        setPage("Create");
        setEditTitle(`Editing "${data.username}"`)
        setName(data.username);
        setPassword(data.password);
        setType(data.type);
        setId(data.id);
    }

    return (
        <div className="relative h-[100vh] w-[85vw] bg-white h-full drop-shadow-md rounded-xl border-solid border-3 border-[#D9D9D9]">
            {page != "Create" && 
            <div className="p-[0.8vw] h-[100vh] flex flex-col bg-white rounded-xl" >
                <div className="overflow-auto">
                    <div>
                        {acconutType.map(type => (
                            <div key = {type}>
                                <h1 className="text-[1.5vw]">{type}:</h1>
                                <div className="flex flex-wrap gap-[1vw] mb-[2vw] text-[0.8vw]">
                                    {accounts.filter(account => account.type === type).map(account => (
                                        <div className = "flex mt-4 p-[0.5vw] bg-white drop-shadow-md rounded-xl border-solid border-3 border-[#D9D9D9] text-black rounded-lg shadow-md w-[15vw] h-[3.5vw]" key={account.id}>
                                            <div className="flex">
                                                <div className="p-[0.3vw]">
                                                    <p>{account.username} </p>
                                                </div>
                                            </div>
                                            <GoPencil className="cursor-pointer hover:underline ml-auto text-[0.9vw]" onClick = {() => edit(account)}/>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>    
                </div>
                <button onClick = {() => change()} className="mt-auto mb-[1.5vw] cursor-pointer bg-white drop-shadow-sm border-solid border-2 border-[#D9D9D9] text-gray-black h-[3vw] text-[2vw]">+</button>
            </div>
            }
            {page ? (
                <div>
                    <Create setMessage = {setMessage} accounts={accounts} setAccounts={setAccounts} setPage={setPage} page={page} name = {name} password = {password} type = {type} setName = {setName} setPassword = {setPassword} setType = {setType} id = {id} setId = {setId} editTile={editTitle}></Create>
                </div>
            ) : ("")}
        </div>
    )
}
        