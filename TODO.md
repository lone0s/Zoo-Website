* Widget Menu
    
## API Routes :
 * `/_api/connectedUser`
   * Contiens l'utilisateur connecté
 * `/_api/animals`
   * Contiens la liste des annimaux

## Pages
 * Acceuil
   * Widget
   * Acceuil.html
   * CSS (Optionel)
 * Connexion / Inscription
   * Widget
   * InscriptionConnexion.html
   * CSS (Optionel)
 * ZooMap
   * Widget
   * ZooMap.html
   * CSS (Optionel)
 * AnimalList.html
   * CSS (Optionel)
   * Côté Admin (Optionel)
     * Ajout d'un animal
     * Suppression d'un animal
     * Modifier un animal
   * Côté User
 * ConnectedUsers.html (admin only) (Optionel)
   * Permet à un admin de déconnecter un User
   * CSS (Optionel)

## Objets JS :
 * Animals
   * Coral [Enclos]
     * Enum correspondant aux enclos de la BDD
 * User
   * User auth level (enum)
     * Admin
     * Customer

## BDD :
 ### Ajout :
   * Animal
   * Utilisateur
   * Token
   * Espèce
 ### Suppresion :
   * Token
   * Animal
 ### Accès :
   * Animaux w/ enclos
   * User w/ token
   * Animaux par enclos
