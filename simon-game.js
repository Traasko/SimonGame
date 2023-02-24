class SimonGame {
  constructor() {
    // Créer des objets Audio pour les sons de bouton
    this.audioGreen = new Audio('audio/green.mp3');
    this.audioRed = new Audio('audio/red.mp3');
    this.audioYellow = new Audio('audio/yellow.mp3');
    this.audioBlue = new Audio('audio/blue.mp3');

    // Créer des objets Button pour les boutons de couleur
    this.greenButton = new Button('green', this.audioGreen);
    this.redButton = new Button('red', this.audioRed);
    this.yellowButton = new Button('yellow', this.audioYellow);
    this.blueButton = new Button('blue', this.audioBlue);

    this.sequence = [];
    this.level = 1;
    this.maxLevel = 20;
    this.isStrict = false;
    this.isPlaying = false;
  }

  start() {
    this.sequence = [];
    this.level = 1;
    this.isPlaying = true;
    this.generateSequence();
    this.playSequence();
  }

  generateSequence() {
    for (let i = 0; i < this.maxLevel; i++) {
      const randomColor = Math.floor(Math.random() * 4);
      this.sequence.push(randomColor);
    }
  }

  playSequence() {
    let i = 0;
    const interval = setInterval(() => {
      this.highlightButton(this.sequence[i]);
      i++;
      if (i >= this.level) {
        clearInterval(interval);
      }
    }, 1000);
  }

  addLevel() {
    this.level++;
    if (this.level > this.maxLevel) {
      alert('Félicitations !');
      this.isPlaying = false;
    } else {
      this.playSequence();
    }
  }

  checkAnswer(playerSequence) {
    for (let i = 0; i < playerSequence.length; i++) {
      if (playerSequence[i] !== this.sequence[i]) {
        if (this.isStrict) {
          alert('Perdu !');
          this.start();
        } else {
          alert('Encore une fois ?');
          this.playSequence();
        }
        return;
      }
    }
    if (playerSequence.length === this.sequence.length) {
      alert('Félicitations !');
      this.addLevel();
    }
  }

  toggleStrict() {
    this.isStrict = !this.isStrict;
  }

  highlightButton(color) {
    const buttonColors = {
      0: 'green',
      1: 'red',
      2: 'yellow',
      3: 'blue',
    };
    const buttonColor = buttonColors[color];
    const buttonElement = document.getElementById(buttonColor);

    buttonElement.classList.add('highlighted');
    setTimeout(() => {
      buttonElement.classList.remove('highlighted');
    }, 500);
  }
}
