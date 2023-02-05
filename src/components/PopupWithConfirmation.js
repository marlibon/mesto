import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
    constructor(selector) {
        super(selector);
        this._form = this._popup.querySelector(".form");
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener("submit", (event) => {
            event.preventDefault();
            this._handleFormSubmit()

        })
    }


    handleSubmit(newHandleSubmit) {
        this._handleFormSubmit = newHandleSubmit;

        }
    open() {
        super.open();
    }

}