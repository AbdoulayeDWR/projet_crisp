// pages/api/oeuvres/[id].ts
import { NextApiRequest, NextApiResponse } from 'next';
import db from '@/utils/db';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const database = await db;
    const rows = await database.all('SELECT * FROM artworks');
    // res.send(row);
    return NextResponse.json(
      { message: rows },
      { status: 200 }
    );
    //res.status(200).json(row);
  } catch (error) {
    console.error('Erreur lors de la récupération d\'une oeuvre:', error);
    return NextResponse.json(
      { message: 'Erreur' },
      { status: 500 }
    );

    // res.status(500).json({ message: 'Erreur serveur' });
  }
}