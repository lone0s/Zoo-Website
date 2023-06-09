/**Imports**/
import React from "react";
import ReactDOM from "react-dom";
import * as User from "../user.js";

/**Composant**/
class Inscription extends React.Component {
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

		fetch('/_api/inscriptionUser', {
			method:"POST",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({"courriel": this.state.courriel,"motDePasse": this.state.motDePasse})
		})
			.then((res) => {
				let utilisateur = res.json();
				utilisateur.then((result) => {
					if (JSON.stringify(result) !== "{}") {
						window.location.replace("/connexion");
					}
				})
			})
	}

	render() {
		return(
			<div>
				<form onSubmit={this.handleSubmit}>
					<div className="row justify-content-center">
						<div className="col-xs-12 col-sm-10">
							<div className="card mb-5">
								<div className="card-header text-center" style={{background: '#dee2e6'}}>
									<h3>Inscription</h3>
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
													Inscription
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
ReactDOM.render(<Inscription/>, document.getElementById("inscription"))