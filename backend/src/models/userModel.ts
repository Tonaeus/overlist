import { Model, Schema, Types, model } from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

type IUser = {
	_id: Types.ObjectId;
	email: string;
	password: string;
};

type UserModel = Model<IUser> & {
	login(email: string, password: string): Promise<IUser>;
	signup(email: string, password: string): Promise<IUser>;
};

const userSchema = new Schema<IUser, UserModel>({
	email: {
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
userSchema.static("login", async function login(email: string, password: string) {
	if (!email || !password) {
		throw new Error("All fields must be filled.");
	}

	const user = await this.findOne({ email });

	if (!user) {
		throw new Error("Email does not exist.")
	}

	const match = await bcrypt.compare(password, user.password);

	if (!match) {
		throw new Error("Password is invalid.");
	}

	return user;
});

// Signup static method
userSchema.static('signup', async function signup(email: string, password: string) {
	if (!email || !password) {
		throw new Error("All fields must be filled.");
	}

	if (!validator.isEmail(email)) {
		throw new Error("Email is invalid.");
	}

	if (!validator.isStrongPassword(password)) {
		throw Error ("Password is invalid.");
	}

	const exists = await this.findOne({ email });

	if (exists) {
		throw new Error("Email already exists.");
	}

	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(password, salt);

	const user = await this.create({ email, password: hash });

	return user;
});

const User = model<IUser, UserModel>("User", userSchema);

export default User;
