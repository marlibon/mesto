export class UserInfo {
  constructor(selectors) {
    const { selectorProfileTitle, selectorProfileSubtitle } = selectors;
    this._profileTitle = document.querySelector(selectorProfileTitle);
    this._profileSubtitle = document.querySelector(selectorProfileSubtitle);
  }
  getUserInfo() {
    return {
      name: this._profileTitle.textContent,
      activity: this._profileSubtitle.textContent,
    };
  }
  setUserInfo(title, subtitle) {
    this._profileTitle.textContent = title;
    this._profileSubtitle.textContent = subtitle;
  }
}
