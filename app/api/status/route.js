import { NextResponse, NextRequest } from 'next/server'
import mysql from  'mysql2/promise';

const connection = await mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  database: 'foodtrack',
  password: 'foodtrack'
});


export async function PUT(request) {
  const { status, completed_datetime, id } = await request.json();
  try {
    const [results,  fields] = await connection.query(
      'UPDATE orders SET status=?, completed_datetime=? WHERE id = ?', 
      [status, completed_datetime, id]
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