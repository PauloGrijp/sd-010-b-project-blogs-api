class UserService {
  constructor(model, authService, constants, errorHandler) {
    const { statusCode, errorMessage } = constants;
    this.model = model;
    this.authService = authService;
    this.statusCode = statusCode;
    this.errorMessage = errorMessage;
    this.BAD_REQUEST = errorHandler;
    
    this.createUser = this.createUser.bind(this);
    this.listUsers = this.listUsers.bind(this);
    this.getUser = this.getUser.bind(this);
  }

  async createUser({ displayName, email, password, image }) {
    const data = { displayName, email, password, image };
    const payload = { displayName, email };

    await this.model.create(data);
    const token = this.authService.sign(payload);
    
    return token;
  }

  async listUsers() {
    const users = await this.model.findAll();
    return users;
  }

  async getUser(id) {
    const user = await this.model.findByPk(id);
    if (!user) { 
      throw new this.BAD_REQUEST(this.errorMessage.USER_NOT_FOUND, this.statusCode.NOT_FOUND); 
    }
    return user;
  }
}

module.exports = UserService;