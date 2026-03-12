import { useState } from "react";
import { Button, Text, FlexLayout } from "@salt-ds/core";
import "./SeatSelector.css";

interface SeatSelectorProps {
	onSeatsSelected: (seats: string[]) => void;
}

const ROWS = 8;
const COLS = 10;
const ROW_LABELS = ["A", "B", "C", "D", "E", "F", "G", "H"];

const SeatSelector = ({ onSeatsSelected }: SeatSelectorProps) => {
	const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

	const toggleSeat = (row: number, col: number) => {
		const seatId = `${ROW_LABELS[row]}${col + 1}`;
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

	return (
		<div className='seat-selector-container'>
			<div className='seat-grid-wrapper'>
				<div className='seat-grid'>
					{/* Row labels */}
					<div className='row-labels'>
						<div />
						{ROW_LABELS.map((label) => (
							<div key={label} className='row-label'>
								{label}
							</div>
						))}
					</div>

					{/* Seats */}
					{Array.from({ length: ROWS }).map((_, row) => (
						<div key={row} className='seat-row'>
							<div className='row-label'>{ROW_LABELS[row]}</div>
							{Array.from({ length: COLS }).map((_, col) => {
								const seatId = `${ROW_LABELS[row]}${col + 1}`;
								const isSelected = selectedSeats.includes(seatId);
								return (
									<button
										key={seatId}
										className={`seat ${isSelected ? "selected" : ""}`}
										onClick={() => toggleSeat(row, col)}
										title={seatId}
									>
										{col + 1}
									</button>
								);
							})}
						</div>
					))}

					{/* Column numbers */}
					<div className='col-labels'>
						<div />
						{Array.from({ length: COLS }).map((_, col) => (
							<div key={col} className='col-label'>
								{col + 1}
							</div>
						))}
					</div>
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
