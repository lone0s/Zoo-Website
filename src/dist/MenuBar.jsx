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
    }

    render(){ //TODO
        return(
            <div>Menu Bar</div>
        )
    }
}


/**Render**/
ReactDOM.render(<MenuBar/>, document.getElementById("root"))