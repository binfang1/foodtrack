import { NextResponse, NextRequest } from 'next/server'
import mysql from  'mysql2/promise';

const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'foodtrack',
  password: 'foodtrack'
});

export async function POST(request) {
    try {
        
        const { client, subtotal, tax, total, items, notes, status, creation_datetime, completed_datetime } = await request.json()

        const [results, fields] = await connection.query(
            'INSERT INTO orders (client, subtotal, tax, total, items, notes, status, creation_datetime, completed_datetime) VALUES (?,?,?,?,?,?,?,?,?)',
            [client, subtotal, tax, total, items, notes, status, creation_datetime, completed_datetime]
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