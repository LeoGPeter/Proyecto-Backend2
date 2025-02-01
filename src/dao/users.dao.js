import UserModel from "./models/user.model.js";

class UserDao {
  async getAll() {
    return await UserModel.find();
  }

  async getById(id) {
    return await UserModel.findById(id);
  }

  async getByEmail(email) {
    return await UserModel.findOne({ email });
  }

  async create(userData) {
    return await UserModel.create(userData);
  }

  async update(id, newData) {
    return await UserModel.findByIdAndUpdate(id, newData, { new: true });
  }

  async delete(id) {
    return await UserModel.findByIdAndDelete(id);
  }
}

export default new UserDao();
