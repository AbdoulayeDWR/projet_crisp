
// pages/api/oeuvres/[id].ts
import { NextApiRequest, NextApiResponse } from 'next';
import db from '@/utils/db';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  const { id } = body;
  if (id) {
    try {
      const database = await db;
      const row = await database.get('SELECT * FROM artworks WHERE id = ?', [id]);
      // res.send(row);
      return NextResponse.json(
        { message: row },
        { status: 200 }
      );
      //res.status(200).json(row);
    } catch (error) {
      console.error('Erreur lors de la récupération des détails de l\'œuvre:', error);
      return NextResponse.json(
        { message: 'Erreur serveur' },
        { status: 500 }
      );

      // res.status(500).json({ message: 'Erreur serveur' });
    }
  } else {
    return NextResponse.json(
      { message: 'Oeuvre non trouvée' },
      { status: 404 }
    );
    // res.send({ message: 'Oeuvre non trouvée' });

    // res.status(404).json({ message: 'Oeuvre non trouvée' });
  }
}
