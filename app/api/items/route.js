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