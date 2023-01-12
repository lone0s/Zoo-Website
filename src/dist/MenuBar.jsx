/**Imports**/
import React from "react";
import ReactDOM from "react-dom";
import Roles from "./roles";

/**Composant**/
class MenuBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            connectedUser : {
                id : 0,
                ndc : "Steduthu_admin",
                mdp : "1532",
                role : Roles.Admin,
            }
        }
    }

    componentDidMount() { //TODO : recuperer la personne connectee pour effectuer les affichages en consequence
        /*fetch('/_api/connectedUser')
            .then((res) => res.json())
            .then((eventsReponse) => {
                this.connectedUser = eventsReponse
                this.setState({state : connectedUser : eventsReponse})
            })
        this.render()*/
    }

    render(){
        console.log("rendering")
        console.log(this)
        return(
            <nav>
                {window.location.pathname === "acceuil" ? <a/> : <a id="acceuil" className='menu_button' href="/acceuil">Acceuil&nbsp;|&nbsp;</a>}
                <a id="zoo_map" className='menu_button' href="/zoo_map">Zoo map&nbsp;|&nbsp;</a>
                {this.state.connectedUser === undefined ? <a id="connexion" className='menu_button' href='/connexion'>Connexion&nbsp;|&nbsp;</a> : <a/>}
                {this.state.connectedUser === undefined ? <a id="inscription" className='menu_button' href='/inscription'>Inscription&nbsp;|&nbsp;</a> : <a/>}
                {this.state.connectedUser !==undefined ? <button id="disconnect" className='menu_button' onClick={() => {this.setState({connectedUser : undefined})}}>Disconnect</button> : <a/>}
                <a id="animal_all" className='menu_button' href='/animal/all'>Animal list&nbsp;|&nbsp;</a>
                {this.state.connectedUser === undefined ? <a/> : <a id="favorites" className="menu_button" href={'/favorites'}>Favorites</a>}
            </nav>
        )
    }
}


/**Render**/
ReactDOM.render(<MenuBar/>, document.getElementById("header"))