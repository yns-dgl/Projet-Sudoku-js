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

      if ((i + 1) % 3 === 0) input.classList.add("ligne-bloc");
      if ((j + 1) % 3 === 0) input.classList.add("colonne-bloc");
      if (i % 3 === 0) input.classList.add("ligne-haut");
      if (j % 3 === 0) input.classList.add("colonne-gauche");

      /* ✅ saisie + avance automatique */
      input.addEventListener("input", function () {
        if (!/^[1-9]$/.test(input.value)) {
          input.value = "";
          return;
        }

        let ni = parseInt(input.dataset.ligne);
        let nj = parseInt(input.dataset.colonne) + 1;

        if (nj > 8) { nj = 0; ni++; }
        if (ni > 8) return;

        let cible = document.querySelector(
          `#grille input[data-ligne="${ni}"][data-colonne="${nj}"]`
        );
        while (cible && cible.disabled) {
          nj++;
          if (nj > 8) { nj = 0; ni++; }
          if (ni > 8) return;
          cible = document.querySelector(
            `#grille input[data-ligne="${ni}"][data-colonne="${nj}"]`
          );
        }

        if (cible) cible.focus();
      });

      /* ✅ suppression + navigation clavier */
      input.addEventListener("keydown", function (e) {

        if (["Escape", "Delete", "Backspace"].includes(e.key) && !input.disabled) {
          input.value = "";
          input.classList.remove("erreur");
        }

        const arrows = { ArrowUp: [-1,0], ArrowDown: [1,0], ArrowLeft: [0,-1], ArrowRight: [0,1] };
        if (!arrows[e.key]) return;
        e.preventDefault();

        const [di, dj] = arrows[e.key];
        const ni = parseInt(input.dataset.ligne) + di;
        const nj = parseInt(input.dataset.colonne) + dj;

        if (ni < 0 || ni > 8 || nj < 0 || nj > 8) return;

        const cible = document.querySelector(
          `#grille input[data-ligne="${ni}"][data-colonne="${nj}"]`
        );
        if (cible) cible.focus();
      });

      container.appendChild(input);
    }
  }
}