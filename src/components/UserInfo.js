export default class UserInfo {
  constructor({ userNameSelector, userDescriptionSelector, userPhotoSelector }) {
    this._userNameElement = document.querySelector(userNameSelector);
    this._userDescriptionElement = document.querySelector(userDescriptionSelector);
    this._userPhoto = document.querySelector(userPhotoSelector);
  }

  getUserInfo() {
   return {
    username: this._userNameElement.textContent,
    description: this._userDescriptionElement.textContent
   }
  }

  setUserInfo({username, description, photo}) {
    this._userNameElement.textContent = username;
    this._userDescriptionElement.textContent = description;
    this._userPhoto.src = photo;
  }
}
