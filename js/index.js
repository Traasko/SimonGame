//Déclaration des variables "let" car
//elle peuvent changer au cour du programme
let suite = [];
let deuxiemeSuite = [];
let niveau = 0;

//Déclaration des variables "const" qui elles ne changent pas
const boutonStart = document.querySelector('.js-start');
const span = document.querySelector('.js-span');
const titre = document.querySelector('.js-titre');
const couleurs = document.querySelector('.js-couleurs');

// Fonction qui permet de réinitialiser le programme
function reinitialiserJeu(text) {
  alert(text);
  suite = [];
  deuxiemeSuite = [];
  niveau = 0;
  boutonStart.classList.remove('hidden');
  titre.textContent = 'Simon Game';
  span.classList.add('hidden');
  couleurs.classList.add('pasClicker');
}

//Fonction qui permet à chaque tour d'afficher le nombre de click nécéssaire
// en fonction du niveau
function chaqueTour(niveau) {
  couleurs.classList.remove('pasClicker');
  span.textContent = `À vous de jouer : ${niveau} click${
    niveau > 1 ? 's' : ''
  }`;
}

//Fonction qui permet d'afficher les couleurs et
//le son de la couleur indiqué en même temps
function couleursActive(color) {
  const couleurr = document.querySelector(`[data-couleur='${color}']`);
  const sons = document.querySelector(`[data-sound='${color}']`);

  couleurr.classList.add('activer');
  sons.play();

  setTimeout(() => {
    couleurr.classList.remove('activer');
  }, 300);
}

//Fonction qui permet de jouer le prochaine tour
function jouerTour(prochaineSuite) {
  prochaineSuite.forEach((color, index) => {
    setTimeout(() => {
      couleursActive(color);
    }, (index + 1) * 600);
  });
}

//Fonction qui permet le lancement aleatoire des couleurs
function prochaineEtape() {
  const couleurSuite = ['rouge', 'vert', 'bleu', 'jaune'];
  const couleurAleatoire =
    couleurSuite[Math.floor(Math.random() * couleurSuite.length)];

  return couleurAleatoire;
}

//Fonction d'attente entre le début de la partie et le prochain "click"
function prochainCycle() {
  niveau += 1;

  couleurs.classList.add('pasClicker');
  span.textContent = 'Ecoutez-bien';
  titre.textContent = `Niveau ${niveau} sur 10`;

  const prochaineSuite = [...suite];
  prochaineSuite.push(prochaineEtape());
  jouerTour(prochaineSuite);

  suite = [...prochaineSuite];
  setTimeout(() => {
    chaqueTour(niveau);
  }, niveau * 600 + 1000);
}

//Fonction qui permet de traiter les "click"
function traitementClick(couleur) {
  const index = deuxiemeSuite.push(couleur) - 1;
  const sons = document.querySelector(`[data-sound='${couleur}']`);
  sons.play();

  const nombreClick = suite.length - deuxiemeSuite.length;

  if (deuxiemeSuite[index] !== suite[index]) {
    reinitialiserJeu('Game Over! Voulez-vous réssayer ?');
    return;
  }
  //Si le joueur atteint les 10 tours un message de réussite s'affiche
  if (deuxiemeSuite.length === suite.length) {
    if (deuxiemeSuite.length === 10) {
      reinitialiserJeu('Félicitation vous avez réussi tous les niveaux !');
      return;
    }

    //Message de réussite entre chaque click
    deuxiemeSuite = [];
    span.textContent = 'Bravo! Continuez !';
    setTimeout(() => {
      prochainCycle();
    }, 1000);
    return;
  }

  span.textContent = `À vous de jouer : ${nombreClick} click${
    nombreClick > 1 ? 's' : ''
  }`;
}

//Fonction qui permet de lancer le programme (jeu)
function debutPartie() {
  boutonStart.classList.add('hidden');
  span.classList.remove('hidden');
  span.textContent = 'Ecoutez-bien';
  prochainCycle();
}

boutonStart.addEventListener('click', debutPartie);
couleurs.addEventListener('click', (event) => {
  const { couleur } = event.target.dataset;
  console.log(couleur);
  if (couleur) traitementClick(couleur);
});
