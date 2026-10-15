import mongoose from "mongoose";

const USR_ROLES = ["User", "Admin", "Superuser"];

const userSchema = new mongoose.Schema(
    {
        username: {type: String, required: true, unique: true, trim: true},
        name: {type: String, trim: true},
        email: {type: String, required: true, trim: true},
        password: {type: String, required: true, trim: true},
        role: {type: String, enum: USR_ROLES, default: 'User'},
    },
    {timestamps: true, _strict: true}
);


export const User = mongoose.model("User", userSchema);