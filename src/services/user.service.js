import userModel from '../dao/models/user.model.js';

const userService = {
    findUserByEmail: async (email) => {
        return await userModel.findOne({ email });
    },

    createUser: async (userData) => {
        return await userModel.create(userData);
    }
};

export default userService;
