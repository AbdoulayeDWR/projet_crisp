"use client";

import { useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Head from 'next/head';

// Définissez l'interface pour l'objet Oeuvre
interface Oeuvre {
  id: number;
  art_name: string;
  art_desc: string;
}

export default function OeuvreDetails(params:any) {
  // Spécifiez le type de l'état oeuvre
  const [oeuvre, setOeuvre] = useState<Oeuvre | null>(null);
  const id = params.params.id;

  useEffect(() => {
    const fetchOeuvre = async () => {
      console.log(id);
      
      if (id) {
        try {
          const response = await fetch(`/api/oeuvre`, {
            method: 'POST',
            body: JSON.stringify({
              id: id
            })
          });
          const data = await response.json();
          setOeuvre(data.message);
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