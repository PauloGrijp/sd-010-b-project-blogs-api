const { User } = require('../models/index');
const tokenGenerator = require('./util/tokenGenerator.js');

const createNewUser = async (newUSerInfo) => {
    const { email, password } = newUSerInfo; 
    await User.create(newUSerInfo);
    const token = tokenGenerator({ email, password });
    return token;
};

const findAllUsers = async () => {
    const response = await User.findAll().then((data) => {
        const allUsersInfo = [];
        data.forEach((userInfo) => {
            const { displayName, email, id, image } = userInfo;
            const publicInfo = { displayName, email, id, image };
            allUsersInfo.push(publicInfo); 
        });
        return allUsersInfo;
    });
    return response;
};

const findByEmail = async (email) => {
    const response = await User.findOne({ where: { email } });
    return response;
};

const findByEmailAndPassword = async (email, password) => {
    const response = await User.findOne({ where: { email, password } });
    return response;
};

const findById = async (id) => {
    const response = await User.findByPk(id).then((userInfo) => {
        if (!userInfo) return null;
        const { displayName, email, image } = userInfo;
        const numberId = Number(id);
        const publicInfo = { displayName, email, id: numberId, image };
        return publicInfo;
    });
    return response;
};

module.exports = {
    createNewUser,
    findAllUsers,
    findByEmail,
    findByEmailAndPassword,
    findById,
};