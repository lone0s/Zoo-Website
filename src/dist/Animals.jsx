import ReactDOM from "react-dom";
import Animal from "./animals";

import {getAnimaux} from '../../database/db';
import React from "react";

function Animal(props) {
    return <h1>{props.target}</h1>;
}

function AnimalsList() {
    let animalsJSObj = getAnimaux();

    return <li> { animalsJSObj.map( (Object) => <ul><Animal target={Object}/></ul> ) } </li>
}