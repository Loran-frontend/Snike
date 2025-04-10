export type initialArrowStateType = {
	direction: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
};

type actionArrow = {
	type: 'CALC-DIRECTION';
	directionkey: string;
};

const initialArrowState: initialArrowStateType = {
	direction: 'DOWN',
};

export function ArrowReducer(
	state = initialArrowState,
	action: actionArrow
): initialArrowStateType {
	let directionNow = state.direction;
	switch (action.type) {
		case 'CALC-DIRECTION':
			switch (action.directionkey) {
				case 'ArrowUp':
				case 'w':
				case 'ц':
				case 'W':
				case 'Ц':
					if (state.direction !== 'DOWN') {
						directionNow = 'UP';
					}
					break;

				case 'ArrowLeft':
				case 'a':
				case 'ф':
				case 'A':
				case 'Ф':
					if (state.direction !== 'RIGHT') {
						directionNow = 'LEFT';
					}
					break;

				case 'ArrowRight':
				case 'd':
				case 'в':
				case 'В':
				case 'D':
					if (state.direction !== 'LEFT') {
						directionNow = 'RIGHT';
					}
					break;

				case 'ArrowDown':
				case 's':
				case 'ы':
				case 'S':
				case 'Ы':
					if (state.direction !== 'UP') {
						directionNow = 'DOWN';
					}
					break;

				default:
					directionNow = 'DOWN';
					break;
			}
			return { ...state, direction: directionNow };
		default:
			return state;
	}
}

export const actionCreatorCalcDirection = (directionkey: string) => ({
	type: 'CALC-DIRECTION',
	directionkey: directionkey,
});
