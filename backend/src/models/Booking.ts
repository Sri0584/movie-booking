import { model, Schema, Types } from "mongoose";

export interface IBooking extends Document {
	user: Types.ObjectId;
	movie: Types.ObjectId;
	showTime: Date;
	seats: string[];
	status: "PENDING" | "CONFIRMED" | "CANCELLED";
}

const bookingSchema = new Schema<IBooking>(
	{
		user: { type: Schema.Types.ObjectId, ref: "User", required: true },
		movie: { type: Schema.Types.ObjectId, ref: "Movie", required: true },
		showTime: { type: Date, required: true },
		seats: [{ type: String, required: true }],
		status: {
			type: String,
			enum: ["PENDING", "CONFIRMED", "CANCELLED"],
			default: "PENDING",
		},
	},
	{ timestamps: true },
);
export const Booking = model<IBooking>("Booking", bookingSchema);
