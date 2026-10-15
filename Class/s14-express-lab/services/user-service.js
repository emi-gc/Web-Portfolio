import {User} from "../models/user.js";

export const createUser = async ({username, name, email, password}) => {
    return User.create({username, name, email, password});
};

export const findUser = async (username) => {
    const userFound = await User.findOne({username}).catch((dbError) => console.error(dbError.nessage));
    return userFound;
}

export const findUsers = async (name) => {
    return await User.find({name}).sort({name: 1}).catch((dbError) => console.error(dbError.nessage));
}