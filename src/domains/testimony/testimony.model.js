class Testimony {
  constructor(id, fullname, profileImage, testimony) {
    this.id = id;
    this.fullname = fullname;
    this.profileImage = profileImage;
    this.testimony = testimony;
  }

  toJSON() {
    return {
      id: this.id,
      fullname: this.fullname,
      profile_image: this.profileImage,
      testimony: this.testimony,
    };
  }
}

module.exports = { Testimony };
