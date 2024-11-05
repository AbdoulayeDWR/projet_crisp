"use server";

import { NextResponse } from "next/server";
import { open } from "sqlite";
import sqlite3 from "sqlite3";
import { getSession } from "@/utils/sessions"; // Assurez-vous d'avoir cette fonction pour récupérer la session de l'utilisateur

async function openDb() {
  return open({
    filename: './database.db', // Chemin vers votre base de données
    driver: sqlite3.Database,
  });
}

export async function POST(req: Request) {
  const session = await getSession(); // Récupère la session de l'utilisateur connecté

  if (!session) {
    return NextResponse.json({ error: 'Utilisateur non authentifié' }, { status: 403 });
  }

  const userId = session.rowid; // ID de l'utilisateur
  const { artworkId } = await req.json(); // L'ID de l'œuvre doit être passé dans le corps de la requête
  const visitedAt = new Date().toISOString(); // Date et heure de la visite

  const db = await openDb();
  
  try {
    await db.run(
      `INSERT INTO visites (userId, artworkId, visitedAt) VALUES (?, ?, ?)`,
      [userId, artworkId, visitedAt]
    );
    return NextResponse.json({ message: 'Visionnage enregistré avec succès.' }, { status: 200 });
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement du visionnage:', error);
    return NextResponse.json({ error: 'Erreur lors de l\'enregistrement du visionnage.' }, { status: 500 });
  }
}
