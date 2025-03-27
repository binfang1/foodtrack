import { NextResponse, NextRequest } from 'next/server'
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
      'SELECT * FROM `raw`'
    );
  
    //console.log(results); // results contains rows returned by server
    //console.log(fields); // fields contains extra meta data about results, if available
    console.log("Connected to Raw!")
    return NextResponse.json(results)
  } catch (err) {
    console.log(err);
  }

  // response with the JSON object

}

export async function POST(request) {
    try {
        const { name, price, threshold, stock, buy_amount } = await request.json()

        const [results, fields] = await connection.query(
            'INSERT INTO raw (name, price, threshold, stock, buy_amount) VALUES (?,?,?,?,?)',
            [name, price, threshold, stock, buy_amount]
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
  const { id, name, price, threshold, stock, buy_amount } = await request.json();

  try {
    const [results, fields] = await connection.query(
      'UPDATE raw SET name = ?, price = ?, threshold = ?, stock = ?, buy_amount = ? WHERE id = ?', 
      [name, price, threshold, stock, buy_amount, id]
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

export async function DELETE(request) {
  const { id } = await request.json();

  try {
    const [results, fields] = await connection.query(
      'DELETE FROM raw WHERE id = ?', [id]
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


