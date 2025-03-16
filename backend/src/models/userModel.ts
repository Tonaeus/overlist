import { Model, Schema, model } from "mongoose";
import bcrypt from "bcrypt";

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
