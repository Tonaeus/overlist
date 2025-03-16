import { Model, Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

type IUser = {
	email: string;
	password: string;
};

type UserModel = Model<IUser> & {
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

userSchema.static('signup', async function signup(email: string, password: string) {
	if (!email || !password) {
		throw new Error("All fields must be filled.");
	}

	if (!validator.isEmail(email)) {
		throw new Error("Email is not valid.");
	}

	if (!validator.isStrongPassword(password)) {
		throw Error ("Password is not strong enough");
	}

	const exists = await this.findOne({ email });

	if (exists) {
		throw new Error("Email is already in use.")
	}

	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(password, salt);

	const user = await this.create({ email, password: hash });

	return user;
});

const User = model<IUser, UserModel>("User", userSchema);

export default User;
