"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export default function Page1(){

    const userLogin = () => {
        // ... Ajouter votre propre logique ici (récupératio du token de l'utilisateur connecté par exemple)
        
        // Configuration de Crisp (obligatoire pour utiliser le bot sur votre site)
        Crisp.configure(process.env.NEXT_PUBLIC_WEBSITE_ID || "", {
            autoload: false, // Si vous voulez afficher le bot immédiatement, passez à 'true' ici
        });
        // Récupération de l'historique d'une conversation Crisp
        Crisp.setTokenId("token");
        // Affichage du bot (utile uniquement si 'autoload: false' dans la configuration)
        Crisp.load();
        // Ouverture du bot
        Crisp.chat.open();
    }

    useEffect(() => {
        userLogin()
    }, []);

    
      const showCarousel = ()=> {
        const list = [
            {
              title: "Slide 1 du carousel",
              description: "Description du slide 1",
              actions: [
                {
                  label: "Texte du bouton",
                  url: "/page-1",
                },
              ],
            },
            {
              title: "Slide 2 du carousel",
              description: "Description du slide 2",
              actions: [
                {
                  label: "Texte du bouton",
                  url: "/",
                },
              ],
            }
          ]
         
          // Affichage d'un carousel dans le bot
          Crisp.message.show("carousel", {
            text: "Voici la liste des oeuvres :",
            targets: list,
          });
    
      }

    return (
        <>
            <h1>Page 1</h1>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Esse autem magnam rerum placeat ipsum quidem provident dicta porro saepe quas? Debitis, ad alias quos exercitationem error libero! Soluta, praesentium? Minus?</p>
            <button onClick={showCarousel}>Afficher le carousel</button>
        </>
    );
}