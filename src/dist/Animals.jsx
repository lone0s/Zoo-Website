import ReactDOM from "react-dom";
import React from "react";

import Cookies from "js-cookie";

const connectedUser = () => {
    let v;
    fetch('/user/getConnectedUser', {
        method:"POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"token": Cookies.get('test')})
    })
        .then((res) => {
            res.json().then((token) => {
                v =  token.id;
            })
        })
    return v;
}

const CommuteFavorites = (id) => {
    //TODO
}

const HasFavorite = (id) => {
    return false;
}

class AnimalsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { animals : [] };
    }

    componentDidMount() {
        fetch('/_api/animals')
            .then(
                (res) => {
                    return res.json()
                }
            )
            .then(
                (eventsReponse) => {
                    this.setState({animals : eventsReponse})
                }
            )
        ;
    }

    render() {
        console.log(connectedUser())
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
                                        { connectedUser() !== undefined ?
                                            <button value={"Ajouter aux favoris"} onClick={CommuteFavorites(obj.id)}/> : <div/>
                                        }
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