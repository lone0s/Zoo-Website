/**Imports**/
import React from "react";
import ReactDOM from "react-dom";
import {getUser} from "./roles";
import {Urls} from "../urls";

/**Composant**/
class MenuBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            connectedUser : undefined
        }
    }

    componentDidMount() {
        this.setState({connectedUser : getUser()})
        this.render()
    }

    render(){
        return(
            <nav>
                {window.location.pathname === Urls.Acceuil ? <a/> : <button id="acceuil" className='menu_button' onClick={() => {window.location.href = Urls.Acceuil;}}>Acceuil;</button>}
                <button id="animal_all" className='menu_button' onClick={() => {window.location.href = Urls.AnimalsList;}}>Animal list</button>
                <button id="zoo_map" className='menu_button' onClick={() => {window.location.href = Urls.ZooMap;}}>Zoo map</button>
                {this.state.connectedUser === undefined ? <a/> : <button id="favorites" className="menu_button" onClick={() => {window.location.href = Urls.Favorites;}}>Favorites</button>}

                {this.state.connectedUser === undefined ? <button id="connexion" className='menu_button' onClick={() => {window.location.href = Urls.Connexion;}}>Connexion</button> : <a/>}
                {this.state.connectedUser === undefined ? <button id="inscription" className='menu_button' onClick={() => {window.location.href = Urls.Inscription;}}>Inscription</button> : <a/>}
                {this.state.connectedUser !==undefined ? <button id="disconnect" className='menu_button' onClick={() => {this.setState({connectedUser : undefined})}}>Disconnect</button> : <a/>}

            </nav>
        )
    }
}

/**Render**/
ReactDOM.render(<MenuBar/>, document.getElementById("header"))