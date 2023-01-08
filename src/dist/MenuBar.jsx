/**Imports**/
import React from "react";
import ReactDOM from "react-dom";

/**Composant**/
class MenuBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() { //TODO : recuperer la personne connectee pour effectuer les affichages en consequence
        /*fetch('/api/events')
            .then((res) => res.json())
            .then((eventsReponse) => {
                // on met à jour l'état de notre composant
                // ce qui forcera son rendu, donc l'appel à la méthode render
                this.setState({events: eventsReponse})
            })*/
        this.render()
    }

    render(){ //TODO
        return(
            <nav>
                <a id="acceuil" className='menu_button' href="/acceuil">Acceuil</a>
                <a id="zoo_map" className='menu_button' href="/zoo_map">Zoo map</a>
                <a id="connexion" className='menu_button' href='/connexion'>Connexion</a>
                <a id="inscription" className='menu_button' href='/inscription'>Connexion</a>
                <a id="animal_all" className='menu_button' href='/animal/all'>Connexion</a>
            </nav>
        )
    }
}


/**Render**/
ReactDOM.render(<MenuBar/>, document.getElementById("header"))