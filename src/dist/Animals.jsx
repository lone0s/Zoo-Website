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
            <div className="row justify-content-center">
                <div className="col-xs-12 col-sm-10">
                    <div className="card mb-5">
                        <div className="card-header text-center" style={{background: '#dee2e6'}}>
                            <h3>Affichage des animaux</h3>
                        </div>
                        <div className="card-body">
                            <ul>
                            { this.state.animals.map( ( obj ) => {
                                return (
                                    <li id={obj.name}>
                                            <img src={obj.imgPath} alt={obj.imgPath}/>
                                            <h4>{obj.name}</h4>
                                            <p>{obj.nomComplet}</p>
                                    </li>
                                )})
                            }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<AnimalsList/>, document.getElementById("root"))