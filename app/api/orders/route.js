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
      'SELECT * FROM `orders`'
    );
  
    //console.log(results); // results contains rows returned by server
    //console.log(fields); // fields contains extra meta data about results, if available
    console.log("Connected to Orders!")
    return NextResponse.json(results)
  } catch (err) {
    console.log(err);
  }

  // response with the JSON object


}

export async function POST(request) {
  try {
      
      const { client, subtotal, tax, total, items, notes, status, creation_datetime, completed_datetime, payment_status, pickup_datetime, payment_method } = await request.json()

      const [results, fields] = await connection.query(
          'INSERT INTO orders (client, subtotal, tax, total, items, notes, status, creation_datetime, completed_datetime, payment_status, pickup_datetime, payment_method) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)',
          [client, subtotal, tax, total, items, notes, status, creation_datetime, completed_datetime, payment_status, pickup_datetime, payment_method]
      );
      console.log(client, subtotal, tax, total, items, notes, status, creation_datetime, completed_datetime, payment_status, pickup_datetime, payment_method)

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

export async function DELETE(request) {
  const { id } = await request.json();

  try {
    const [results, fields] = await connection.query(
      'DELETE FROM order WHERE id = ?', [id]
    )

    return NextResponse.json();
  } catch (err) {
    console.log(err);
  }
}

export async function PUT(request) {
  const { id, client, subtotal, tax, total, items, notes, status, creation_datetime, completed_datetime } = await request.json();

  try {
    const [results, fields] = await connection.query(
      'UPDATE order VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) WHERE id = ?', 
      [client, subtotal, tax, total, items, notes, status, creation_datetime, completed_datetime, id]
    )

    return NextResponse.json();
  } catch (err) {
    console.log(err);
  }

}



