/**Imports**/
import React from "react";
import ReactDOM from "react-dom";
import * as User from "../user";
import {generateJWT} from "../token";

/**Composant**/
class Connexion extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			courriel: "",
			motDePasse: "",
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleInputChange(event) {
		event.preventDefault();
		const target = event.target;
		this.setState({
			[target.name]: target.value,
		});
	}

	handleSubmit(event) {
		event.preventDefault();

		let bodyParam = JSON.stringify({"courriel": this.state.courriel,"motDePasse": this.state.motDePasse});

		fetch('/_api/connectionUser', {
			method:"POST",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: bodyParam
		})
			.then((res) => res.json())

		/*
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ nomUtilisateur: this.state.courriel, mdp: this.state.motDePasse})
		};

		let idUtilisateur;
		fetch('/_api/verifyUser', requestOptions)
			.then((res) => res.json())
			.then((eventsReponse) => {
				idUtilisateur = eventsReponse
				console.log(eventsReponse)
			})
			*/
	}

	render() {
		return(
			<div>
				<form onSubmit={this.handleSubmit}>
					<div className="row justify-content-center">
						<div className="col-xs-12 col-sm-10">
							<div className="card mb-5">
								<div className="card-header text-center" style={{background: '#dee2e6'}}>
									<h3>Connexion</h3>
								</div>
								<div className="card-body">
									<div className="form-control">
										<label htmlFor="courriel">Courriel</label>
										<input
											type="text"
											id="courriel"
											name="courriel"
											value={this.state.courriel}
											onChange={this.handleInputChange}
											className="form-control"
											required autoFocus
										/>
										<br/>
										<label htmlFor="motDePasse">Mot de passe</label>
										<input
											type="password"
											id="motDePasse"
											name="motDePasse"
											value={this.state.motDePasse}
											onChange={this.handleInputChange}
											className="form-control"
											required
										/>
										<br/>
										<div className="row">
											<div className="col text-end">
												<button
													className="btn btn-lg btn-primary pull-right text-end"
													type="submit"
												>
													Connexion
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</form>
			</div>
		)
	}
}


/**Render**/
ReactDOM.render(<Connexion/>, document.getElementById("connexion"))