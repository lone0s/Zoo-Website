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
            <div>Widget de la page d'accueil</div>
        )
    }
}


/**Render**/
ReactDOM.render(<Acceuil/>, document.getElementById("root"))