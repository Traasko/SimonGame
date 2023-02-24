class Button {
  constructor(color) {
    this.color = color;
    this.audio = new Audio(`audio/${color}.mp3`);
    this.element = document.getElementById(color);
    this.element.addEventListener('click', this.onClick.bind(this));
  }

  onClick() {
    this.audio.play();
  }

  activate() {
    this.element.classList.add('active');
    setTimeout(() => {
      this.element.classList.remove('active');
    }, 500);
  }
}
