import ReactDOM from "react-dom";
import * as Animal from "../animals";

import React from "react";

function Animal(props) {
    console.log(props)
    return <h1>{props.target}</h1>;
}

function AnimalsList() {
    let animalsJSObj;
    fetch('/_api/connectedUser')
        .then((res) => res.json())
        .then((eventsReponse) => {
            animalsJSObj = eventsReponse
            console.log(eventsReponse)
        })
    console.log(animalsJSObj)

    return <li> { animalsJSObj.map( (Object) => <ul><Animal target={Object}/></ul> ) } </li>
}

ReactDOM.render(<AnimalsList></AnimalsList>, document.getElementById("root"))