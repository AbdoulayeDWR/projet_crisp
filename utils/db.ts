import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Fonction pour initialiser la base de données
async function initializeDb() {
  return open({
    filename: './database.db', // Chemin vers le fichier SQLite à la racine du projet
    driver: sqlite3.Database,
  });
}

// Export de l'instance de la base de données pour une utilisation dans d'autres fichiers
const db = initializeDb();
export default db;
