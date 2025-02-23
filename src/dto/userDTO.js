class userDTO {
    constructor(user) {
      this.userId = user._id;
      this.username = user.username;
      this.email = user.email;
    }
    static from(data) {
        return Array.isArray(data) 
          ? data.map(item => new userDTO(item))
          : [new userDTO(data)]; 
      }
  }

export default userDTO; 
