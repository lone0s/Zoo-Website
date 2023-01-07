
# AAW_PROJECT

## BDD

Choix tech : SQLite


|ANIMAUX|      USERS   |    ESPECE |    ENCLOS |       TOKEN   |    FAVORIS |    ROLE   |
|-------|   -----------|    -------|    -------|    -----------|    -       |    -      |
|id     |   id         |    id     |    id     |    id         |    user    |   id      |
|nom    |   ndc        |    nom    |    pos    |    user       |    animal  |   nom     |
|espece |   mdp        |           |           |    lifetime   |            |           |
|imagePath| role       |           |           |               |            |           |  

## PLAN DU SITE

Une page, une route

### Accueil 
* Map du zoo
### Formulaire d'inscription
### Formulaire de connexion 
### Liste animaux

## Composants 

* Menu
    * Bouton "Accueil" 
        *  Ne s'affiche pas si on est deja sur la __page d'accueuil__
    * Bouton "Connexion"
        * Ne s'affiche pas si on est deja __connecté__
    * Bouton "Inscription" 
        * Ne s'affiche pas si on est deja __connecté__
    * Bouton "Déconnexion"
        * Ne s'affiche pas si on est __pas__ connecté
    * Bouton "Animaux"
    * Bouton "Favoris"
        * Ne s'affiche pas si on est __pas__ connecté
## JS "Objets"
   * Route : `/_api/connectedUser`
      * User {
      id : int,
      authorisation_level : String,
   }
   
   * Route : `/_api/animals`
      * Animal {
      Name : String,
      Description : String,
      Specie : String,
      map_location : {enum},
   }

