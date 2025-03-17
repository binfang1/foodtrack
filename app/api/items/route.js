import { NextResponse, NextRequest } from 'next/server'
import mysql from  'mysql2/promise';

const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'foodtrack',
  password: 'foodtrack'
});

export async function GET(request) {

  try {
    const [results, fields] = await connection.query(
      'SELECT * FROM `items`'
    );
  
    console.log(results); // results contains rows returned by server
    console.log(fields); // fields contains extra meta data about results, if available

    return NextResponse.json(results)
  } catch (err) {
    console.log(err);
  }

  // response with the JSON object

}

export async function POST(request) {
    try {
        
        const { name, price, description } = await request.json()

        const [results, fields] = await connection.query(
            'INSERT INTO items (name, price, description) VALUES (?,?,?)',
            [name, price, description]
        );

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
  // response with the JSON object
}

export async function PUT(request) {
  const { id, name, price, desc } = await request.json();

  try {
    const [results, fields] = await connection.query(
      'UPDATE items VALUES (?, ?, ?) WHERE id = ?', 
      [name, price, desc, id]
    )

    return NextResponse.json();
  } catch (err) {
    console.log(err);
  }
}

export async function DELETE(request) {
  const { id } = await request.json();

  try {
    const [results, fields] = await connection.query(
      'DELETE FROM items WHERE id = ?', [id]
    )

    return NextResponse.json();
  } catch (err) {
    console.log(err);
  }
}


