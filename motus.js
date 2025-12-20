let niveaux = [];
let niveauActuel = 0;
let solution = "";
let tentatives = 0;

// Charger les niveaux selon la langue
async function chargerNiveaux(langue) {
    const res = await fetch(`niveaux_${langue}.json`);
    niveaux = await res.json();
    creerMenuNiveaux();
    chargerNiveau(0);
}

// Créer le menu des niveaux
function creerMenuNiveaux() {
    const liste = document.getElementById("listeNiveaux");
    liste.innerHTML = "";
    niveaux.forEach((niveau, index) => {
        const btn = document.createElement("button");
        btn.textContent = `Niveau ${niveau.numero}`;
        btn.onclick = () => chargerNiveau(index);
        liste.appendChild(btn);
    });
}

// Charger un niveau spécifique
function chargerNiveau(num) {
    niveauActuel = num;
    solution = niveaux[num].mot.toUpperCase();
    tentatives = 0;

    const grille = document.getElementById("grille");
    grille.innerHTML = "";
    grille.style.gridTemplateColumns = `repeat(${solution.length}, 60px)`;
    grille.style.gridTemplateRows = `repeat(6, 60px)`;

    for(let i = 0; i < 6 * solution.length; i++){
        const c = document.createElement("div");
        c.classList.add("case");
        grille.appendChild(c);
    }

    afficherMessage(`Niveau ${niveauActuel+1} chargé. Bonne chance !`);
}

// Validation du mot tapé
function submitMot() {
    const input = document.getElementById("inputMot");
    let mot = input.value.toUpperCase();

    if(mot.length != solution.length){
        afficherMessage(`Le mot doit faire ${solution.length} lettres.`);
        return;
    }
    if(tentatives >= 6){
        afficherMessage(`Vous avez déjà utilisé toutes vos tentatives. Le mot était : ${solution}`);
        return;
    }

    let cases = document.querySelectorAll(".case");
    let offset = tentatives * solution.length;

    for(let i = 0; i < solution.length; i++){
        cases[offset+i].textContent = mot[i];
        if(mot[i] === solution[i]) cases[offset+i].classList.add("vert");
        else if(solution.includes(mot[i])) cases[offset+i].classList.add("jaune");
        else cases[offset+i].classList.add("gris");
    }

    tentatives++;
    if(mot === solution){
        afficherMessage("Bravo ! Niveau réussi.");
    } else if(tentatives === 6){
        afficherMessage(`Partie terminée. Le mot était : ${solution}`);
    }

    input.value = "";
}

// Afficher un message
function afficherMessage(txt){
    document.getElementById("message").textContent = txt;
}

// Changement de langue
document.getElementById("langueSelect").addEventListener("change", (e) => {
    chargerNiveaux(e.target.value);
});

// Lancer le jeu au chargement
window.onload = () => {
    const langue = document.getElementById("langueSelect").value;
    chargerNiveaux(langue);
};
