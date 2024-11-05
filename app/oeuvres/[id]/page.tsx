"use client";

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Head from 'next/head';

// Définissez l'interface pour l'objet Oeuvre
interface Oeuvre {
  id: number;
  art_name: string;
  art_desc: string;
}

export default function OeuvreDetails() {
  const pathname = usePathname();
  const id = pathname.split("/").pop(); // Récupère l'ID de l'œuvre depuis l'URL
  const [oeuvre, setOeuvre] = useState<Oeuvre | null>(null);

  useEffect(() => {
    const fetchOeuvre = async () => {
      if (id) {
        try {
          const response = await fetch(`/api/oeuvre`, {
            method: 'POST',
            body: JSON.stringify({ id: id }),
            headers: { 'Content-Type': 'application/json' }
          });
          const data = await response.json();
          setOeuvre(data.message);

          // Enregistrer la visite dans la base de données
          await fetch('/api/views', {
            method: 'POST',
            body: JSON.stringify({ artworkId: id }), // Envoie l'ID de l'œuvre visitée
            headers: { 'Content-Type': 'application/json' }
          });
        } catch (error) {
          console.error('Erreur lors de la récupération des détails de l\'œuvre:', error);
        }
      }
    };

    fetchOeuvre();
  }, [id]);

  if (!oeuvre) {
    return <div>Chargement...</div>;
  }

  return (
    <div>
      <Head>
        <title>Détails de l'œuvre</title>
      </Head>
      <h1>Détails de l'œuvre</h1>
      <p>ID : {oeuvre.id}</p>
      <p>Nom : {oeuvre.art_name}</p>
      <p>Description : {oeuvre.art_desc}</p>
    </div>
  );
}
