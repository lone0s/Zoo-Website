/**Imports**/
import React from "react";
import ReactDOM from "react-dom";
import {getUser} from "../user";
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
            <div>
                <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                    <div className="container-fluid">
                        <a className="navbar-brand" href={Urls.Acceuil}>Accueil</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            {this.state.connectedUser === undefined ? (
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
                            ) : (
                                <div>
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
                                        onClick={() => {this.setState({connectedUser : undefined})}}
                                    >Déconnexion
                                    </a>
                                </div>
                            )}
                        </div>
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