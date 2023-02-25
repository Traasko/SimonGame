class SimonGame {
  constructor() {
    this.let.suite = [];
    this.let.deuxiemeSuite = [];
    this.let.niveau = 0;
    this.boutonStart = document.querySelector('.js-start');
    this.span = document.querySelector('.js-span');
    this.titre = document.querySelector('.js-titre');
    this.couleurs = document.querySelector('.js-couleurs');
    this.prochainEtape = this.prochainEtape.bind(this);
    this.jouerTour = this.jouerTour.bind(this);
    this.debutPartie = this.debutPartie.bind(this);
    this.traitementClick = this.traitementClick.bind(this);
    this.debutPartie = this.debutPartie.bind(this);
    this.traitementClick = this.traitementClick.bind(this);
  }

  reinitialiserJeu(text) {
    alert(text);
    this.suite = [];
    this.deuxiemeSuite = [];
    this.niveau = 0;
    this.boutonStart.classList.remove('hidden');
    this.titre.textContent = 'Simon Game';
    this.span.classList.add('hidden');
    this.couleurs.classList.add('pasClicker');
  }

  chaqueTour(niveau) {
    this.couleurs.classList.remove('pasClicker');
    this.span.textContent = `À vous de jouer : ${niveau} click${
      niveau > 1 ? 's' : ''
    }`;
  }

  couleursActive(color) {
    const couleurr = document.querySelector(`[data-couleur='${color}']`);
    const sons = document.querySelector(`[data-sound='${color}']`);

    couleurr.classList.add('activer');
    sons.play();

    setTimeout(() => {
      couleurr.classList.remove('activer');
    }, 300);
  }

  jouerTour(prochaineSuite) {
    prochaineSuite.forEach((color, index) => {
      setTimeout(() => {
        this.couleursActive(color);
      }, (index + 1) * 600);
    });
  }

  prochainEtape() {
    const couleurSuite = ['rouge', 'vert', 'bleu', 'jaune'];
    const couleurAleatoire =
      couleurSuite[Math.floor(Math.random() * couleurSuite.length)];
    return couleurAleatoire;
  }

  prochainCycle() {
    this.niveau += 1;

    this.couleurs.classList.add('pasClicker');
    this.span.textContent = 'Ecoutez-bien';
    this.titre.textContent = `Niveau ${this.niveau} sur 10`;

    const prochaineSuite = [...this.suite];
    prochaineSuite.push(this.prochainEtape());
    this.jouerTour(prochaineSuite);

    this.suite = [...prochaineSuite];
    setTimeout(() => {
      this.chaqueTour(this.niveau);
    }, this.niveau * 600 + 1000);
  }

  traitementClick(couleur) {
    const index = this.deuxiemeSuite.push(couleur) - 1;
    const sons = document.querySelector(`[data-sound='${couleur}']`);
    sons.play();

    const nombreClick = this.suite.length - this.deuxiemeSuite.length;

    if (this.deuxiemeSuite[index] !== this.suite[index]) {
      this.reinitialiserJeu('Game Over! Voulez-vous réssayer ?');
      return;
    }

    if (this.deuxiemeSuite.length === this.suite.length) {
      if (this.deuxiemeSuite.length === 10) {
        this.reinitialiserJeu(
          'Félicitation vous avez réussi tous les niveaux !'
        );
        return;
      }

      this.deuxiemeSuite = [];
      this.span.textContent = 'Bravo! Continuez !';
      setTimeout(() => {
        this.prochainCycle();
      }, 1000);
    }
  }
  debutPartie() {
    boutonStart.classList.add('hidden');
    span.classList.remove('hidden');
    span.textContent = 'Ecoutez-bien';
    this.prochainCycle();
    console.log('test');
    this.boutonStart.addEventListener('click', this.debutPartie);
    this.couleurs.forEach((couleur) => {
      couleur.addEventListener('click', (event) => {
        const { couleur } = event.target.dataset;
        if (couleur) this.traitementClick(couleur);
      });
    });
  }
}
