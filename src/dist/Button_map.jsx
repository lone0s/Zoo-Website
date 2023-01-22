/**Imports**/
import React ,{useState}from "react";
import ReactDOM, {render} from "react-dom";
//import * as Db from "/database/db.js"; commit tout que je tente de chez moi parce que là je comprend rien ok (pas sur la main hein) oui
// cest ecrit commit to ibrahim 2 sa passe ? je comprend pas la question, juste commit sur une de tes branches ok
// comment etre sur que je commit sur ma branche ?
// la branche actuel est affiché en bas à droite

import {Urls} from "../urls.js"; // nickel ! ???? je sais pas vas su rla page stp


// import ReactDOM from "react-dom"; // dans zoomap => une image du zoo d'afficher
// // a partir de là, des <a> avec du css pour positionner le lien et en background du a mettre ton animal (enfin je sais plus sur quoi on doit clique
// // mais tu vois le genre
// // J'aurais pas fait de html dans un fichier, suit moi...
// import * as Db from "/database/db.js"; //j'ai pas finir le button mais en gros ses lui qui contient les image des animau et
// 									// mais comment utiliser le donner de l'enclo dans un fichier css ok


//regarde dans mes comit y pas se fichier chelou
// essaye de faire un git > add en faisant un clic droit sur le fichier
// sa a marcher je test le tout mientenant OK
//sa maffiche rien en gros en bas du fichier j'ai fait ReactDOM.render(<Button_map/>, document.getElementById("le-zoo"))
// et dans le fichier zoo =.html j'ai

class Button_map extends React.Component {

	//const [a1 ,setA1] = useState(Db.getEnclosId(0))
	//const [a2 ,setA2] = useState(Db.getEnclosId(1))
	//const [a3 ,setA3] = useState(Db.getEnclosId(3))

	render()
	{
		return (
			<div>

				<img src={"https://images.twinkl.co.uk/tr/image/upload/t_illustration/illustation/zoo-map-example-without-animals-or-landmarks.png"}
					 style={{
						 position: "absolute",
						 margin: "auto",
						 top: "50%",
						 left: "50%",
						 transform: "translate(-50%, -50%)",
						 width: "100%",
						 height: "100%"
				}}>

				</img>

				<a href={Urls.Acceuil}>
					<img src={"https://dbdzm869oupei.cloudfront.net/img/sticker/preview/6010.png"}
											style={{
												position: "absolute" ,
												top: "15%",
												left: "30%" ,
												width: "100px",
												height: "140px"}}>

					</img>
				</a>
				<a href={Urls.Acceuil}>
					<img src={"https://www.c-stickers.fr/1010-thickbox_default/sticker-tete-de-leopard.jpg"}
						 style={{
							 position: "absolute" ,
							 top: "62%",
							 left: "30%" ,
							 width: "120px",
							 height: "160px"}}>

					</img>
				</a>
				<a href={Urls.AnimalsList}>
					<img src={"https://cdn-icons-png.flaticon.com/512/4081/4081495.png"}
						 style={{
							 position: "absolute" ,
							 top: "62%",
							 left: "50%" ,
							 width: "120px",
							 height: "150px"}}>

					</img>
				</a>
				<a href={Urls.AnimalsList}>
					<img src={"https://static.vecteezy.com/system/resources/previews/001/199/294/non_2x/leopard-head-png.png"}
						 style={{
							 position: "absolute" ,
							 top: "15%",
							 left: "60%" ,
							 width: "120px",
							 height: "150px"}}>

					</img>
				</a>
				<a href={Urls.AnimalsList}>
					<img src={"https://static.vecteezy.com/system/resources/previews/001/199/327/original/tiger-head-png.png"}
						 style={{
							 position: "absolute" ,
							 top: "39%",
							 left: "30%" ,
							 width: "120px",
							 height: "150px"}}>

					</img>
				</a>
				<a href={Urls.AnimalsList}>
					<img src={"https://www.pngmart.com/files/15/Vector-Elephant-PNG-Transparent.png"}
						 style={{
							 position: "absolute" ,
							 top: "40%",
							 left: "60%" ,
							 width: "100px",
							 height: "140px"}}>

					</img>
				</a>
				<a></a>
			</div>
		)
	}
}

ReactDOM.render(<Button_map/>, document.getElementById("le-zoo"))