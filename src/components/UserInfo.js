export default class UserInfo {
  constructor({ profileName, profileAbout, profileAvatar }) {
    this._name = profileName;
    this._about = profileAbout;
    this._avatar = profileAvatar;
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

  setUserAvatar(userInfo) {
    this._avatar.src = userInfo.avatar;
  }

  setUserId(userId) {
    this._userId = userId;
  }

  getUserId() {
    return this._userId;
  }
}