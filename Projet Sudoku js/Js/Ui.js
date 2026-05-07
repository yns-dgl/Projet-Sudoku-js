function creerGrilleHTML(grille) {

  const container = document.getElementById("grille");
  container.innerHTML = "";

  for (let i = 0; i < 9; i++) {

    for (let j = 0; j < 9; j++) {

      const input = document.createElement("input");

      if (grille[i][j] !== 0) {
        input.value = grille[i][j];
        input.disabled = true;
        input.classList.add("fixe");
      }

      input.dataset.ligne = i;
      input.dataset.colonne = j;

      /* ✅ blocs 3x3 */
      if ((i + 1) % 3 === 0) input.classList.add("ligne-bloc");
      if ((j + 1) % 3 === 0) input.classList.add("colonne-bloc");
      if (i % 3 === 0) input.classList.add("ligne-haut");
      if (j % 3 === 0) input.classList.add("colonne-gauche");

      /* ✅ limiter saisie 1-9 */
      input.addEventListener("input", function () {
        if (!/^[1-9]$/.test(input.value)) {
          input.value = "";
        }
      });

      /* ✅ suppression clavier */
      input.addEventListener("keydown", function (e) {

        if (
          (e.key === "Escape" ||
           e.key === "Delete" ||
           e.key === "Backspace")
          && !input.disabled
        ) {
          input.value = "";
          input.classList.remove("erreur");
        }

      });

      container.appendChild(input);
    }
  }
}