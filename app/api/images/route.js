import { NextResponse, NextRequest } from 'next/server';
async function getData() {
    const url = "http://localhost:3000/api/items";
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


export async function POST(request, response) {
    const {file} = await request.json()
    console.log(file)


    
}