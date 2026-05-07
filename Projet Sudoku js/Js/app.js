let grille = JSON.parse(JSON.stringify(grilleInitiale));

function getInputs() {
  return document.querySelectorAll("#grille input");
}

function lireGrille() {

  getInputs().forEach(input => {
    let i = input.dataset.ligne;
    let j = input.dataset.colonne;
    grille[i][j] = parseInt(input.value) || 0;
  });
}

function verifier() {

  lireGrille();
  let valide = true;

  getInputs().forEach(input => {

    input.classList.remove("erreur");

    let i = input.dataset.ligne;
    let j = input.dataset.colonne;
    let val = parseInt(input.value);

    if (!val) {
      valide = false;
      return;
    }

    grille[i][j] = 0;

    if (!estValide(grille, i, j, val)) {
      input.classList.add("erreur");
      valide = false;
    }

    grille[i][j] = val;
  });

  document.getElementById("message").textContent =
    valide ? "✅ Bravo !" : "❌ Erreurs";
}

function reset() {
  grille = JSON.parse(JSON.stringify(grilleInitiale));
  creerGrilleHTML(grille);
  document.getElementById("message").textContent = "";
}

/* INIT */
creerGrilleHTML(grille);

document.getElementById("checkBtn").addEventListener("click", verifier);
document.getElementById("resetBtn").addEventListener("click", reset);