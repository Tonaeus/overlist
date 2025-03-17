import { Model, Schema, Types, model } from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

type IUser = {
	_id: Types.ObjectId;
	username: string;
	password: string;
};

type UserModel = Model<IUser> & {
	login(username: string, password: string): Promise<IUser>;
	signup(username: string, password: string): Promise<IUser>;
};

const userSchema = new Schema<IUser, UserModel>({
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
userSchema.static("login", async function login(username: string, password: string) {
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
userSchema.static('signup', async function signup(username: string, password: string) {
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
	
			if (password.length < 8) {
					errorMessage += '\n • 8+ characters';
			}
			if (!/[a-z]/.test(password)) {
					errorMessage += '\n • 1 lowercase letter';
			}
			if (!/[A-Z]/.test(password)) {
					errorMessage += '\n • 1 uppercase letter';
			}
			if (!/[0-9]/.test(password)) {
					errorMessage += '\n • 1 number';
			}
			if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
					errorMessage += '\n • 1 symbol';
			}
	
			throw new Error(errorMessage);
	};

	const exists = await this.findOne({ username });

	if (exists) {
		throw new Error("Username already exists.");
	}

	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(password, salt);

	const user = await this.create({ username, password: hash });

	return user;
});

const User = model<IUser, UserModel>("User", userSchema);

export default User;
