/**Imports**/
import React from "react";
import ReactDOM from "react-dom";

/**Composant**/
class Acceuil extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: []
        }
    }

    render(){ //TODO
        // List all users
        return(
            <div>Bienvenue au Zoo de la ville, l'endroit idéal pour une journée de découverte et d'aventure en famille.
                Nous abritons une variété d'animaux exotiques et locaux, des lions aux singes en passant par les éléphants et les girafes. Consultez notre section des animaux pour en savoir plus sur chacun d'eux.
                Notre zoo est ouvert tous les jours de la semaine, avec des horaires d'ouverture flexibles pour s'adapter à votre emploi du temps.
                Nous avons également des tarifs d'entrée abordables pour les adultes, les enfants et les familles. Ne manquez pas nos événements à venir, comme les spectacles d'animaux et les activités pour enfants.
                Si vous avez des questions ou souhaitez des informations complémentaires, n'hésitez pas à ne pas nous contacter parce que c'est pas notre problème.
                Nous espérons vous voir bientôt au Zoo de la ville pour une journée inoubliable ! </div>
        )
    }
}


/**Render**/
ReactDOM.render(<Acceuil/>, document.getElementById("root"))