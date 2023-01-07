* Widget Menu
    
## API Routes :
 * `/_api/connectedUser`
   * Contiens l'utilisateur connecté
 * `/_api/animals`
   * Contiens la liste des annimaux

## Pages
 * Acceuil
   * Widget Acceuil
   * Acceuil.html
   * CSS (Optionel)
 * Connexion / Inscription
   * Widget Connect
   * InscriptionConnexion.html
   * CSS (Optionel)
 * ZooMap
   * Widget Enclos
    * Prends en argument un x et un y en arguments, affiche la liste des annimaux à cet enclos aux coordonnes indiquees sur la page
   * ZooMap.html
   * CSS (Optionel)
 * AnimalList.html
   * CSS (Optionel)
   * Widget Admin (Optionel)
     * Ajout d'un animal
     * Suppression d'un animal
     * Modifier un animal
   * Widget User
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
   * Enclos


# Attribution des tâches :
  ## Alessandro :
   * Connexion / Inscription
   * CSS Global
   * 
  ## Souhail :
   * BDD
   * Acceuil
   * 
  ## Erwann :
   * Widget Menu
   * AnimalList côté user
   * AnimalList côté admin
## Ibrahïm :
   * Mapping BDD / Objet JS Animals
   * Mapping BDD / Objet JS User
   * `/_api/connectedUser`
   * `/_api/animals`
   * ZooMap
