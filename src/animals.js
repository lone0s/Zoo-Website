export function getAnimal (identifier) {
    //TODO : Fecth dans la base de donnee l'animal portant l'identificateur donne (nom / espece / id / ...) ; renvoyer le resultat.

    return {
        name : /*TODO*/ undefined,
        description : /*TODO*/ "Not implemented yet",
        coral : /*TODO*/ undefined,
    }
}

export function getAllAnimals() {
    //TODO : renvoye la liste des animals
    return undefined;
}

export const Corals = {
    //TODO : Les deux enclos ci-dessous ne sont que des EXEMPLES
    Principal : Coral("Prime", 0, 0),
    EnclosLions : Coral("enclos_0161563", 16, 59),
}
function Coral (name, x, y) {
    return {
        name : name,
        x : x,
        y : y,
    }
}
