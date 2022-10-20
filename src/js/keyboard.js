export class Keyboard {
  #switchEl;
  #fontSelectEl;
  #containerEl;
  #keyboardEl;
  #inputGroupEl;
  #inputEl;
  #keyPress = false;
  #mouseDown = false;
  constructor () {
    this.#assignElement();
    this.#addEvent();
  }

  #assignElement () {
    this.#containerEl = document.getElementById("container");
    this.#switchEl = this.#containerEl.querySelector("#switch");
    this.#fontSelectEl = this.#containerEl.querySelector("#font");
    this.#keyboardEl = this.#containerEl.querySelector("#keyboard");
    this.#inputGroupEl = this.#containerEl.querySelector("#input-group");
    this.#inputEl = this.#inputGroupEl.querySelector("#input")
  }

  #addEvent () {
    this.#switchEl.addEventListener('change', this.#onChangeTheme);
    this.#fontSelectEl.addEventListener("change", this.#onChangeFont);
    document.addEventListener("keydown", this.#onkeyDown.bind(this));
    document.addEventListener("keyup", this.#onkeyUp.bind(this));
    this.#inputEl.addEventListener("input", this.#onInput);
    this.#keyboardEl.addEventListener("mousedown", this.#onMouseDown.bind(this));
    document.addEventListener("mouseup", this.#onMouseUp.bind(this));
  }

  #onInput (event) {
    event.target.value = event.target.value.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/, "");
  } 

  #onkeyDown (event) {
    if (this.#mouseDown) return;
    this.#keyPress = true;
    if (event.isComposing || event.keyCode === 229) {
      this.#inputGroupEl.classList += " error";
    } else {
      this.#inputGroupEl.calssList -= " error";
    };

    this.#keyboardEl.querySelector(`[data-code=${event.code}]`)
    ?.classList.add("active");
  }

  #onkeyUp (event) {
    if (this.#mouseDown) return;
    this.#keyPress = false;
    this.#keyboardEl.querySelector(`[data-code=${event.code}]`)
    ?.classList.remove("active")
  }

  #onChangeTheme (event) {
    document.documentElement.setAttribute(
      "theme",
      event.target.checked ? "dark-mode" : ""
    );
  }

  #onChangeFont (event) {
    document.body.style.fontFamily = event.target.value;
  }

  #onMouseDown (event) {
    if (this.#keyPress) return;
    this.#mouseDown = true;
    event.target.closest("div.key")?.classList.add("active");
  }

  #onMouseUp (event) {
    if (this.#keyPress) return;
    this.#mouseDown = false;
    const keyEl = event.target.closest("div.key");
    const isActive = !!keyEl?.classList.contains("active");
    const val = keyEl?.dataset.val;
    if (isActive && !!val && val !== "Space" && val !== "Backspace") {
      this.#inputEl.value += val;
    } else if (isActive && val === "Space") {
      this.#inputEl.value += " ";
    } else if (isActive && val === "Backspace") {
      this.#inputEl.value = this.#inputEl.value.slice(0, -1);
    }
    this.#keyboardEl.querySelector(".active")?.classList.remove("active")
  }
}
