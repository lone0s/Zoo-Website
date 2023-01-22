/**Imports**/
import React from "react";
import ReactDOM from "react-dom";
import {Urls} from "../urls";
import Cookies from 'js-cookie';

/**Composant**/
class MenuBar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            connectedUser : undefined
        }

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
                    this.setState({connectedUser: token.id})
                })
            })

        this.handleDemandeDeconnexion = this.handleDemandeDeconnexion.bind(this);
    }

    componentDidMount() {
        this.render();
    }

    handleDemandeDeconnexion(event) {
        event.preventDefault();

        fetch('/_api/jwt/delete', {
            method:"POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({idUtilisateur: this.state.connectedUser})
        })
            .then((res) => {
                res.json().then((result) => {
                    if (JSON.stringify(result.resultApi) !== "{}") {
                        if (result.resultApi === "ok") {
                            try {
                                Cookies.remove("test");
                                window.location.replace("/");
                            }
                            catch (e) {
                                console.log(e);
                            }
                        }
                    }
                })
            })
    }

    render() {
        return(
            <div>
                <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                    <div className="container-fluid">
                        <a className="navbar-brand" href={Urls.Acceuil}>Accueil</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        {this.state.connectedUser === undefined ? (
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav me-auto mb-2 mb-md-0">
                                    <li className="nav-item">
                                        <nobr>
                                            <a
                                                className="navbar-link"
                                                href={Urls.Inscription}
                                            >Inscription
                                            </a>
                                        </nobr>
                                    </li>
                                    <li className="nav-item">
                                        <nobr>
                                            <a
                                                className="navbar-link"
                                                href={Urls.Connexion}
                                            >Connexion
                                            </a>
                                        </nobr>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav me-auto mb-2 mb-md-0">
                                    <li className="nav-item">
                                        <nobr>
                                            <a
                                                className="navbar-link"
                                                href={Urls.AnimalsList}
                                            >Animal list
                                            </a>
                                        </nobr>
                                    </li>
                                    <li className="nav-item">
                                        <nobr>
                                            <a
                                                className="navbar-link"
                                                href={Urls.ZooMap}
                                            >Zoo map
                                            </a>
                                        </nobr>
                                    </li>
                                    <li className="nav-item">
                                        <nobr>
                                            <a
                                                className="navbar-link"
                                                href={Urls.Favorites}
                                            >Favorites
                                            </a>
                                        </nobr>
                                    </li>
                                </ul>
                                <a
                                    className="btn btn-danger my-2 my-sm-0"
                                    onClick={this.handleDemandeDeconnexion}
                                >Déconnexion
                                </a>
                            </div>
                        )}
                    </div>
                </nav>
                <br/>
                <br/>
                <br/>
            </div>
        )
    }
}

/**Render**/
ReactDOM.render(<MenuBar/>, document.getElementById("header"))