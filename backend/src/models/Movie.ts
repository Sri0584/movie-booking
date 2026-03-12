import { model, Schema } from "mongoose";
export interface IMovie extends Document {
	title: string;
	poster: string;
	description: string;
	rating: number;
	durationMinutes: number;
}

const movieSchema = new Schema<IMovie>(
	{
		title: { type: String, required: true },
		poster: { type: String, required: true },
		description: { type: String, required: true },
		rating: { type: Number, default: 0 },
		durationMinutes: { type: Number, required: true },
	},
	{ timestamps: true },
);

export const Movie = model<IMovie>("Movie", movieSchema);
