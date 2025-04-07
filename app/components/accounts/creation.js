import { useEffect, useState } from "react";
import { IconName } from "react-icons/go";
import { GoMoveToStart } from "react-icons/go";
import { GoTrash } from "react-icons/go";
import styles from "../../styles/styles.module.css";




export default function Create({accounts , setAccounts, setPage, page, name, password, type, setName, setPassword, setType, id, setId, editTile}) {
    async function putData() {
        const url = "http://localhost:3000/api/accounts";
        try {
          const response = await fetch(url , {
            'method': 'PUT',
            'body': JSON.stringify(
                {  
                    username: name,
                    password: password,
                    type: type,
                    id: id
                },
              )
          });
          if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
          }
      
          const json = await response.json();
          return json;
        } catch (error) {
          console.error(error.message);
        }
    }
    
    
    async function postData() {
        const url = "http://localhost:3000/api/accounts";
        try {
            const response = await fetch(url , {
            'method': 'POST',
            'body': JSON.stringify(
                {  
                    username: name,
                    password: password,
                    type: type,
                },
                )
            });
            if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
            }
        
            const json = await response.json();
            return json;
        } catch (error) {
            console.error(error.message);
        }
    }

    async function deleteData() {
        const url = "http://localhost:3000/api/accounts";
        try {
            const response = await fetch(url , {
            'method': 'DELETE',
            'body': JSON.stringify(
                {  
                    id: id
                },
                )
            });
            if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
            }
        
            const json = await response.json();
            return json;
        } catch (error) {
            console.error(error.message);
        }
    }
    
    
    const getUser = (event) => {
        setName(event.target.value);
    };

    const getPassword = (event) => {
        setPassword(event.target.value);
    };

    const getType = (event) => {
        setType(event.target.value);
    }

    const back = () => {
        setPage("");
        setName("");
        setPassword("");
        setId("");
        setType("Server");
    }

    const saveChanges = () => {
        event.preventDefault();
        putData().then((response) => console.log("Account Updated"))
        back()
    }

    const addAccount = () => {
        event.preventDefault();
        postData().then((response) => console.log("Account added"));
        back()
    }

    const deleteAccount = () => {
        event.preventDefault();
        deleteData().then((response) => alert("Item Has Been deleted"));
        back()
    }
    


    return (
        <div className="h-[100vh] p-[0.7vw]">
            <GoMoveToStart onClick={() => back()} className={`${styles.general_button} ${styles.back_button}`}/>
            <form  onSubmit = {() => addAccount()} className="flex flex-col m-auto gap-[1.7vw] w-[75vw] h-[32vw] text-center">
                <h1 className="text-[3vw]">{editTile}</h1>

                <label className="text-[1vw] flex flex-col text-left mx-auto">
                    <p>Username:</p>
                    <input value = {name} onChange = {getUser} placeholder="Username"className = "w-[30vw] h-[2vw] border-gray-500 border-2 pl-[0.1vw] pr-[0.1vw] text-black" type="text" required/>
                </label>

                <label className="text-[1vw] flex flex-col text-left mx-auto">
                    <p>Password:</p>
                    <input value = {password} onChange = {getPassword} placeholder="Password" className = "p-[0.5vw] w-[30vw] h-[2vw] border-gray-500 border-2 pl-[0.1vw] pr-[0.1vw] text-black" type="text" required/>
                </label>
                
                <label className="text-[1vw] flex flex-col text-left mx-auto">
                    <p>Account Type:</p>
                    <select value = {type} onChange = {getType} className = "w-[30vw] h-[2vw] border-gray-500 border-2 pl-[0.1vw] pr-[0.1vw] text-black mx-auto">
                        <option>Server</option>
                        <option>Chef</option>
                        <option>Manager</option>
                    </select>
                </label>
                {id ? (
                    <div className="flex m-auto gap-[2vw]">
                        <input onClick={saveChanges} className="text-[1vw] cursor-pointer bg-white drop-shadow-md border-solid border-3 border-[#D9D9D9] text-black rounded-lg shadow-md w-[14vw] h-[3vw] m-auto" type = "button" value = "Save Changes"/>
                        <input onClick={deleteAccount} className="text-[1vw] cursor-pointer bg-red-300 drop-shadow-md text-black rounded-lg shadow-md w-[14vw] h-[3vw] m-auto" type = "button" value = "Delete Account"/>
                    </div>
                ) : (
                    <input  className="text-[1vw] cursor-pointer bg-white drop-shadow-md border-solid border-3 border-[#D9D9D9] text-black rounded-lg shadow-md w-[30vw] h-[3vw] m-auto" type = "submit" value = "Add Account"/>
                )}
               
            </form>
        </div>
)}