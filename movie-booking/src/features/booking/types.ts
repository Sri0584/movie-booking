export interface BookingRequest {
	movieId: string;
	seats: string[];
	showTime: string;
}

export interface BookingResponse {
	id: string;
	user: string;
	movie: string;
	seats: string[];
	showTime: string;
	status: "PENDING" | "CONFIRMED" | "CANCELLED";
}
