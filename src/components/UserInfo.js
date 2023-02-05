export class UserInfo {
  constructor(selectors) {
    const { selectorProfileTitle, selectorProfileSubtitle, profileAvatar } = selectors;
    this._profileTitle = document.querySelector(selectorProfileTitle);
    this._profileSubtitle = document.querySelector(selectorProfileSubtitle);
    this._profileAvatar = document.querySelector(profileAvatar);
    this._id = "";

  }
  getUserInfo() {
    return {
      name: this._profileTitle.textContent,
      about: this._profileSubtitle.textContent,
      avatar: this._profileAvatar.src
    };
  }
  setUserInfo(title, subtitle) {
    this._profileTitle.textContent = title;
    this._profileSubtitle.textContent = subtitle;
  }

  setAvatar(link) {
    this._profileAvatar.src = link;
  }
  
  get id() {
    return this._id;
  }

  set id(value) {
    this._id = value;
  }

}
