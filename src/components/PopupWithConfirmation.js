import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
    constructor(selector, handleFormSubmit) {
        super(selector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector(".form");
    }

    setEventListeners() {
        this._form.addEventListener("submit", (event) => {
            event.preventDefault();
            this._handleFormSubmit()
        });
    }

    get initialCard() {
        return this._initialCard;
      }
    
    set initialCard(value) {
        this._initialCard = value;
      }

    close() {
        super.close();
    }
}