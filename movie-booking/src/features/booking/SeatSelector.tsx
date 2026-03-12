import { useState } from "react";
import { Button, Text, FlexLayout } from "@salt-ds/core";
import "./SeatSelector.css";

interface SeatSelectorProps {
	onSeatsSelected: (seats: string[]) => void;
}

const COLS = 10;
const ROW_LABELS_BASIC = ["A", "B", "C", "D", "E", "F", "G", "H"];
const ROW_LABELS_PREMIUM = ["I", "J", "K", "L"];
const ROW_LABELS_VIP = ["M", "N", "O", "P"];
const HIDDEN_SEATS_COL = [5, 6]; // Example: Hide seats 6 and 7 in each row (0-indexed)
const HIDDEN_SEATS_ROW = ["D", "L", "O", "B"]; // Example: Hide row D and L

const SeatSelector = ({ onSeatsSelected }: SeatSelectorProps) => {
	const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

	const toggleSeat = (row: number, col: number, section: string) => {
		const rowLabels =
			section === "BASIC" ? ROW_LABELS_BASIC
			: section === "PREMIUM" ? ROW_LABELS_PREMIUM
			: ROW_LABELS_VIP;
		const seatId = `${section}-${rowLabels[row]}${col + 1}`;
		setSelectedSeats((prev) =>
			prev.includes(seatId) ?
				prev.filter((s) => s !== seatId)
			:	[...prev, seatId].sort(),
		);
	};

	const handleConfirm = () => {
		if (selectedSeats.length > 0) {
			onSeatsSelected(selectedSeats);
		}
	};

	const handleClear = () => {
		setSelectedSeats([]);
	};

	const hidden = (seatId: string, col: number) => (
		<button key={seatId} className='seat hidden' title={seatId}>
			{col + 1}
		</button>
	);

	return (
		<div className='seat-selector-container'>
			<div className='seat-grid-wrapper'>
				<div className='seat-grid'>
					{/* Seats */}
					<Text className='section-label'>BASIC</Text>
					{Array.from({ length: ROW_LABELS_BASIC.length }).map((_, row) => (
						<div key={row} className='seat-row'>
							<div className='row-label'>{ROW_LABELS_BASIC[row]}</div>
							{Array.from({ length: COLS }).map((_, col) => {
								const seatId = `BASIC-${ROW_LABELS_BASIC[row]}${col + 1}`;
								const isSelected = selectedSeats.includes(seatId);
								const isHidden =
									HIDDEN_SEATS_COL.includes(col) &&
									HIDDEN_SEATS_ROW.includes(ROW_LABELS_BASIC[row]);
								if (isHidden) {
									return hidden(seatId, col);
								}
								return (
									<button
										key={seatId}
										className={`seat ${isSelected ? "selected" : ""}`}
										onClick={() => toggleSeat(row, col, "BASIC")}
										title={seatId}
									>
										{col + 1}
									</button>
								);
							})}
						</div>
					))}
					<Text className='section-label'>PREMIUM</Text>
					{Array.from({ length: ROW_LABELS_PREMIUM.length }).map((_, row) => (
						<div key={row} className='seat-row'>
							<div className='row-label'>{ROW_LABELS_PREMIUM[row]}</div>
							{Array.from({ length: COLS }).map((_, col) => {
								const seatId = `PREMIUM-${ROW_LABELS_PREMIUM[row]}${col + 1}`;
								const isSelected = selectedSeats.includes(seatId);
								const isHidden =
									HIDDEN_SEATS_COL.includes(col) &&
									HIDDEN_SEATS_ROW.includes(ROW_LABELS_PREMIUM[row]);
								if (isHidden) {
									return hidden(seatId, col);
								}
								return (
									<button
										key={seatId}
										className={`seat ${isSelected ? "selected" : ""}`}
										onClick={() => toggleSeat(row, col, "PREMIUM")}
										title={seatId}
									>
										{col + 1}
									</button>
								);
							})}
						</div>
					))}
					<Text className='section-label'>VIP</Text>
					{Array.from({ length: ROW_LABELS_VIP.length }).map((_, row) => (
						<div key={row} className='seat-row'>
							<div className='row-label'>{ROW_LABELS_VIP[row]}</div>
							{Array.from({ length: COLS }).map((_, col) => {
								const seatId = `VIP-${ROW_LABELS_VIP[row]}${col + 1}`;
								const isSelected = selectedSeats.includes(seatId);
								const isHidden =
									HIDDEN_SEATS_COL.includes(col) &&
									ROW_LABELS_VIP[row] &&
									HIDDEN_SEATS_ROW.includes(ROW_LABELS_VIP[row]);
								if (isHidden) {
									return hidden(seatId, col);
								}
								return (
									<button
										key={seatId}
										className={`seat ${isSelected ? "selected" : ""}`}
										onClick={() => toggleSeat(row, col, "VIP")}
										title={seatId}
									>
										{col + 1}
									</button>
								);
							})}
						</div>
					))}
				</div>

				{/* Screen */}
				<div className='screen'>SCREEN</div>
			</div>

			{/* Selection info */}
			<div className='selection-info'>
				{selectedSeats.length > 0 ?
					<>
						<Text>
							<strong>Selected Seats:</strong> {selectedSeats.join(", ")}
						</Text>
						<FlexLayout gap={2}>
							<Button onClick={handleConfirm}>Confirm Booking</Button>
							<Button onClick={handleClear}>Clear Selection</Button>
						</FlexLayout>
					</>
				:	<Text>Select seats to book</Text>}
			</div>
		</div>
	);
};

export default SeatSelector;
