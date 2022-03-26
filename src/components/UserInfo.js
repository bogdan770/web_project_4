export class UserInfo {
  constructor({ userName, userJob, userImage }) {
    this._userName = document.querySelector(userName);
    this._userJob = document.querySelector(userJob);
    this._userImage = document.querySelector(userImage);
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      about: this._userJob.textContent,
    };
  }

  setUserInfo({ name, about, avatar }) {
    this._userJob.textContent = about;
    this._userName.textContent = name;
    this._userImage.style.backgroundImage = `url("${avatar}")`;
  }
}
