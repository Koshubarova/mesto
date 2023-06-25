export default class UserInfo {
  constructor({ userNameSelector, userDescriptionSelector }) {
    this._userNameElement = document.querySelector(userNameSelector);
    this._userDescriptionElement = document.querySelector(userDescriptionSelector);
  }

  getUserInfo() {
   return {
    username: this._userNameElement.textContent,
    description: this._userDescriptionElement.textContent
   }
  }

  setUserInfo({username, description}) {
    this._userNameElement.textContent = username;
    this._userDescriptionElement.textContent = description;
  }
}
