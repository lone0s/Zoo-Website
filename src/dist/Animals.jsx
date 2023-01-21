import ReactDOM from "react-dom";
import * as Animal from "../animals";

import React from "react";

class AnimalsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { animals : [] };
    }

    componentDidMount() {
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
                    console.log(this)
                }
            )
        ;
    }

    render() {
        console.log('Component rendered')

        return(
            <li> { this.state.animals.map( ( obj ) => {
                return (
                    <ul>
                        <div id = {obj.name} className= "animalDisplay">
                            <img src={obj.imgPath} alt={obj.imgPath}/>
                            <h4>{obj.name}</h4>
                            <p>{obj.nomComplet}</p>
                        </div>
                    </ul>
                )
            } ) } </li>
        )
    }
}

ReactDOM.render(<AnimalsList/>, document.getElementById("root"))