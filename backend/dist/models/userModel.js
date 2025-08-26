import { Model, Schema, Types, model } from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});
// Login static method
userSchema.static("login", async function login(username, password) {
    if (!username || !password) {
        throw new Error("All fields are required.");
    }
    const user = await this.findOne({ username });
    if (!user) {
        throw new Error("Username is not found.");
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw new Error("Password is incorrect.");
    }
    return user;
});
// Signup static method
userSchema.static('signup', async function signup(username, password) {
    if (!username || !password) {
        throw new Error("All fields are required.");
    }
    if (!validator.isAlphanumeric(username)) {
        throw new Error("Username must contain only letters and numbers.");
    }
    if (!validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    })) {
        let errorMessage = 'Password must include:';
        errorMessage += '\n • At least 8 characters';
        errorMessage += '\n • At least 1 lowercase letter';
        errorMessage += '\n • At least 1 uppercase letter';
        errorMessage += '\n • At least 1 number';
        errorMessage += '\n • At least 1 symbol';
        throw new Error(errorMessage);
    }
    ;
    const exists = await this.findOne({ username });
    if (exists) {
        throw new Error("Username already exists.");
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await this.create({ username, password: hash });
    return user;
});
const User = model("User", userSchema);
export default User;
//# sourceMappingURL=userModel.js.map