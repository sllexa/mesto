export default class UserInfo {
  constructor({ profileName, profileAbout }) {
    this._name = document.querySelector(profileName);
    this._about = document.querySelector(profileAbout);
  }

  getUserInfo() {
    this._userInfo = {
      name: this._name.textContent,
      about: this._about.textContent
    }

    return this._userInfo;
  }

  setUserInfo(userInfo) {
    this._name.textContent = userInfo.name;
    this._about.textContent = userInfo.about;
  }
}