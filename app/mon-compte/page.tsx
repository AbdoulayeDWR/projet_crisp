"use client";

import { useEffect, useState } from "react";
import { Crisp } from "crisp-sdk-web";
import { getSession } from "@/utils/sessions";

// Définition du type pour une œuvre
type Oeuvre = {
  id: number;
  art_name: string;
  art_desc: string;
};

export default function Home() {
  // État pour stocker les œuvres
  const [oeuvres, setOeuvres] = useState<Oeuvre[]>([]);

  // Fonction pour se connecter à Crisp
  const userLogin = () => {
    Crisp.configure(process.env.NEXT_PUBLIC_WEBSITE_ID || "", {
      autoload: false,
    });
    Crisp.setTokenId("token");
    Crisp.load();
    Crisp.chat.open();
  };

  // Fonction pour récupérer les œuvres depuis l'API
  const fetchOeuvres = async () => {
    try {
      console.log("Tentative de récupération des œuvres depuis l'API...");
      const response = await fetch("/api/oeuvres");
      console.log("Réponse brute de l'API:", response);

      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des œuvres");
      }

      const data = await response.json();
      console.log("Données JSON récupérées:", data);
      setOeuvres(data); // Mise à jour de l'état avec les données récupérées
    } catch (error) {
      console.error("Erreur lors de la récupération des œuvres :", error);
    }
  };

  // Fonction pour afficher les œuvres dans le bot Crisp
  // Fonction pour afficher les œuvres dans le bot Crisp
const showCarousel = () => {
  try {
    // Vérifiez si des œuvres sont présentes dans l'état
    if (oeuvres.length === 0) {
      console.log("Aucune œuvre trouvée dans l'état. Assurez-vous que fetchOeuvres fonctionne correctement.");
      return;
    }

    // Construisez la liste pour le carousel Crisp avec les données des œuvres
    const list = oeuvres.map((oeuvre) => ({
      title: oeuvre.art_name,
      description: oeuvre.art_desc,
      actions: [
        {
          label: "Voir Détails",
          url: `/oeuvres/${oeuvre.id}`, // Lien vers la page de détails de l'œuvre
        },
      ],
    }));

    // Affichez le carousel dans Crisp
    Crisp.message.show("carousel", {
      text: "Voici la liste des œuvres :",
      targets: list,
    });
    console.log("Carousel affiché avec succès dans Crisp.");
  } catch (error) {
    console.error("Erreur lors de l'affichage du carousel dans Crisp :", error);
  }
};


  // useEffect pour initialiser la page
  useEffect(() => {
    const initPage = async () => {
      const session = await getSession();
      console.log("Session utilisateur :", session);

      userLogin(); // Connexion à Crisp
      await fetchOeuvres(); // Récupère les œuvres depuis l'API
    };

    initPage();
  }, []);

  return (
    <>
      <h1>Mon compte</h1>
      <p>Bienvenue sur la page Mon compte. Voici vos œuvres dans le bot Crisp.</p>
      <button onClick={showCarousel}>Afficher le carousel</button>
    </>
  );
}
