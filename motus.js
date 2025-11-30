// Liste de mots (à ajouter)
const mots = ["MAIRE","TABLE","NAGER","CHAIR","PLAGE","ROBOT","LAMPE","RUGIR","TIGRE"];
const solution = mots[Math.floor(Math.random() * mots.length)]; // aléatoire
let tentatives = 0;

const grille = document.getElementById("grille");

// création des 30 cases (6 lignes x 5 lettres)
for(let i=0;i<30;i++){
    let c = document.createElement("div");
    c.classList.add("case");
    grille.appendChild(c);
}

function submitMot(){
    const input = document.getElementById("inputMot");
    let mot = input.value.toUpperCase();

    if(mot.length != 5){
        afficherMessage("Mot invalide (5 lettres obligatoires)");
        return;
    }

    if(tentatives >= 6){
        afficherMessage("Partie terminée. Mot à trouver: " + solution);
        return;
    }

    let cases = document.querySelectorAll(".case");
    let offset = tentatives * 5;

    // vérification lettre par lettre
    for(let i=0;i<5;i++){
        cases[offset+i].textContent = mot[i];

        if(mot[i] === solution[i]) cases[offset+i].classList.add("vert");
        else if(solution.includes(mot[i])) cases[offset+i].classList.add("jaune");
        else cases[offset+i].classList.add("gris");
    }

    tentatives++;

    if(mot === solution){
        afficherMessage("Victoire ! Bien joué.");
    }
    input.value = "";
}

function afficherMessage(txt){
    document.getElementById("message").textContent = txt;
}

