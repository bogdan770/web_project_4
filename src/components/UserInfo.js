export class UserInfo {
  constructor({ userName, userJob }) {
    this._userName = document.querySelector(userName);
    this._userJob = document.querySelector(userJob);
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      job: this._userJob.textContent,
    };
  }

  setUserInfo({ userN: name, userJ: job }) {
    this._userJob.textContent = job;
    this._userName.textContent = name;
  }
}
