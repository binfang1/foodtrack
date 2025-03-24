import { NextResponse, NextRequest } from 'next/server';
import mysql from  'mysql2/promise';

const connection = await mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  database: 'foodtrack',
  password: 'foodtrack'
});

export async function GET(request) {

  try {
    const [results, fields] = await connection.query(
      'SELECT * FROM `accounts`'
    );
  
    //console.log(results); // results contains rows returned by server
    //console.log(fields); // fields contains extra meta data about results, if available
    console.log("Connected to Accounts!")
    return NextResponse.json(results)
  } catch (err) {
    console.log(err);
  }

  // response with the JSON object


}

export async function DELETE(request) {
  const { id } = await request.json();

  try {
    const [results, fields] = await connection.query(
      'DELETE FROM accounts WHERE id = ?', [id]
    )

    return new Response(JSON.stringify(
      { message: "success" },
      {
        headers: { "content-type": "application/json" },
        status: 200,
      }
    )
  );
  } catch (err) {
    console.log(err);
  }
}

export async function POST(request) {
  const {username, password, type } = await request.json();

  try {
    const [results, fields] = await connection.query(
      'INSERT INTO accounts (username, password, type) VALUES (?,?,?)', 
      [username, password, type]
    )

    return NextResponse.json(results)
  } catch (err) {
    console.log(err);
  }
}

export async function PUT(request) {
  const { id, username, password, type } = await request.json();

  try {
    const [results, fields] = await connection.query(
      'UPDATE accounts SET username=?, password=?, type=? WHERE id = ?', 
      [username, password, type, id]
    )

    return new Response(JSON.stringify(
      { message: "success" },
      {
        headers: { "content-type": "application/json" },
        status: 200,
      }
    )
  );
  } catch (err) {
    console.log(err);
  }
}