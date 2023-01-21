import ReactDOM from "react-dom";
import * as Animal from "../animals";

import React from "react";
import {getUser} from "../user.js";

function Animal(props) {
    console.log(props)
    return <h1>{props.target}</h1>;
}

class AnimalsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            animals: undefined,
        };
    }

    /*componentDidMount() {
        console.log("Componnent mounted")
        fetch('/_api/animals')
            .then(
                (res) => {
                    console.log("RESPONSE : ", res);
                    return res.json()
                }
            )
            .then(
                (eventsReponse) => {
                    console.log("EVENT RESPONSE : ", eventsReponse);
                    this.setState({animals : eventsReponse})
                }
            )
        ;

        this.render()
    }*/

    render() {
        console.log('Component rendered')
        fetch('/_api/animals')
            .then(
                (res) => {
                    console.log("RESPONSE : ", res);
                    return res.json()
                }
            )
            .then(
                (eventsReponse) => {
                    console.log("EVENT RESPONSE : ", eventsReponse);
                    this.setState({animals : eventsReponse})
                    console.log(this)
                }
            )
        ;

        console.log("Rendering")
        return(
            <li> { this.state.animals.map( ( obj ) => <ul><Animal target={ obj }/></ul> ) } </li>
        )
    }
}

ReactDOM.render(<AnimalsList/>, document.getElementById("root"))