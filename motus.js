let niveauActuel = 0;
let niveaux = []; // sera chargé depuis niveaux.json
let solution = "";
let tentatives = 0;

async function chargerNiveaux(){
    let req = await fetch("niveaux.json"); // charge la liste des mots
    niveaux = await req.json();
    chargerNiveau(0); // commence au niveau 0
}

function chargerNiveau(num){
    niveauActuel = num;
    let mot = niveaux[num].mot.toUpperCase(); // mot du niveau choisi
    solution = mot;
    tentatives = 0;

    const grille = document.getElementById("grille");
    grille.innerHTML = ""; // reset grille
    
    // grille automatique selon la longueur du mot
    grille.style.gridTemplateColumns = `repeat(${mot.length}, 60px)`;
    grille.style.gridTemplateRows = `repeat(6, 60px)`;

    for(let i=0;i<6 * mot.length;i++){
        let c = document.createElement("div");
        c.classList.add("case");
        grille.appendChild(c);
    }
}

let tentatives = 0;

const grille = document.getElementById("grille");

function submitMot(){
    const input = document.getElementById("inputMot");
    let mot = input.value.toUpperCase();

    if(mot.length != solution.length){
        afficherMessage(`Ce niveau demande un mot de ${solution.length} lettres`);
        return;
    }

    if(tentatives >= 6){
        afficherMessage("Perdu. Niveau suivant ?");
        return;
    }

    let cases = document.querySelectorAll(".case");
    let offset = tentatives * solution.length;

    for(let i=0;i<solution.length;i++){
        cases[offset+i].textContent = mot[i];
        
        if(mot[i] === solution[i]) cases[offset+i].classList.add("vert");
        else if(solution.includes(mot[i])) cases[offset+i].classList.add("jaune");
        else cases[offset+i].classList.add("gris");
    }

    tentatives++;

    if(mot === solution){
        afficherMessage("Bravo ! Niveau réussi.");
    }

    input.value = "";
}

function afficherMessage(txt){
    document.getElementById("message").textContent = txt;
}

chargerNiveaux(); // démarre le jeu au niveau 0 automatiquement
