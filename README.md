
# AAW_PROJECT

## BDD

Choix tech : SQLite


|ANIMAUX|      USERS   |    ESPECE |    ENCLOS |       TOKEN   |    FAVORIS |    ROLE   |
|-------|   -----------|    -------|    -------|    -----------|    -       |    -      |
|id     |   id         |    id     |    id     |    id         |    user    |   id      |
|nom    |   ndc        |    nom    |    pos    |    user       |    animal  |     nom   |
|espece |   mdp        |           |           |    lifetime   |            |           |
|       |   role       |           |           |               |            |           |  

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
        *  Ne s'affiche pas si on est deja sur la page d'accueuil
    * Bouton "Connexion"
        * Ne s'affiche pas si on est deja connecté
    * Bouton "Inscription" 
        * Ne s'affiche pas si on est deja connecté
    * Bouton "Déconnexion"
        * Ne s'affiche pas si on est pas connecté
    * Bouton "Animaux"
    * Bouton "Favoris"
        * Ne s'affiche pas si on est pas connecté
    

