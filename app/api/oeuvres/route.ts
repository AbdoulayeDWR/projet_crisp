import { NextResponse } from 'next/server';
import db from '@/utils/db';

export async function GET(request: Request) {
  try {
    const query = `SELECT id, art_name, art_desc FROM artworks`;

    const oeuvres = await db.then((dbInstance) =>
      dbInstance.all(query)
    );

    if (!oeuvres || oeuvres.length === 0) {
      return NextResponse.json({ message: "Aucune œuvre trouvée" }, { status: 404 });
    }

    return NextResponse.json(oeuvres);
  } catch (error) {
    console.error("Erreur lors de la récupération des œuvres depuis la base de données :", error);
    return NextResponse.json({ error: "Erreur lors de la récupération des œuvres" }, { status: 500 });
  }
}
