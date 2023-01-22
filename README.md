
# AAW_PROJECT

## BDD

Choix tech : SQLite


|ANIMAUX|      USERS   |    ESPECE |    ENCLOS |       TOKEN   |    FAVORIS |    ROLE   |
|-------|   -----------|    -------|    -------|    -----------|    -       |    -      |
|id     |   id         |    id     |    id     |    id         |    user    |   id      |
|nom    |   ndc        |    nom    |    pos    |    user       |    animal  |   nom     |
|espece |   mdp        |           |           |    lifetime   |            |           |
|imagePath| role       |           |           |               |            |           |  

le champ imgPath indique le chemin de l'image 

## PLAN DU SITE

Une page, une route

### Accueil 
* Map du zoo
### Formulaire d'inscription
### Formulaire de connexion 
### Liste animaux

## Spécification des composants composants 

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


## Répartition des tâches :
   Voir TODO

