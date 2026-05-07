const grilleInitiale = [
[5,3,0,0,7,0,0,0,0],
[6,0,0,1,9,5,0,0,0],
[0,9,8,0,0,0,0,6,0],
[8,0,0,0,6,0,0,0,3],
[4,0,0,8,0,3,0,0,1],
[7,0,0,0,2,0,0,0,6],
[0,6,0,0,0,0,2,8,0],
[0,0,0,4,1,9,0,0,5],
[0,0,0,0,8,0,0,7,9]
];

function estValide(grille, ligne, col, valeur) {

  for (let i = 0; i < 9; i++) {
    if (grille[ligne][i] == valeur) return false;
    if (grille[i][col] == valeur) return false;
  }

  let startL = Math.floor(ligne / 3) * 3;
  let startC = Math.floor(col / 3) * 3;

  for (let i = startL; i < startL + 3; i++) {
    for (let j = startC; j < startC + 3; j++) {
      if (grille[i][j] == valeur) return false;
    }
  }

  return true;
}