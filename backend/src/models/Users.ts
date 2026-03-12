import { model, Schema } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
	email: string;
	password: string;
	comparePassword(candidate: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
	{
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
	},
	{ timestamps: true },
);

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

userSchema.methods.comparePassword = function (candidate: string) {
	console.log(candidate, this.password);
	return bcrypt.compare(candidate, this.password);
};

export const User = model<IUser>("User", userSchema);
