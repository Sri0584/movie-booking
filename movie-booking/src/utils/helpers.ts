import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export const getRtkErrorMessage = (error: unknown): string => {
	if (!error) return "Unknown error";

	if (typeof error === "object" && error !== null && "status" in error) {
		const err = error as FetchBaseQueryError;
		return (err.data as any)?.message || `Error: ${err.status}`;
	}

	const err = error as SerializedError;
	return err.message || "Unknown error";
};
