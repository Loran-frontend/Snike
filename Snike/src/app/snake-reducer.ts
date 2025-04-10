import { getRandomNumber } from '../utils/getRandomNumber';
import { SnakeMove } from '../utils/SnakeMove';

export type TypeCells = Array<string | null>;
export type ActionType = {
	type: 'CALC-CELLS';
	direction: string;
};
export type initialSnakeStateType = {
	Cells: TypeCells;
	score: number;
	SnakeBody: number[];
	indexAplle: number;
	indexHead: number;
	lose: boolean;
};

const initialState: initialSnakeStateType = {
	Cells: new Array(10 * 10).fill(null),
	score: 0,
	SnakeBody: [],
	indexAplle: getRandomNumber(100),
	indexHead: 24,
	lose: false,
};

export function SnakeReducer(
	state = initialState,
	action: ActionType
): initialSnakeStateType {
	switch (action.type) {
		case 'CALC-CELLS': {
			let newScore = state.score;
			let newIndexApple = state.indexAplle;
			let newIndexHead = state.indexHead;
			let newSnakeBody = [...state.SnakeBody];
			let newLose = state.lose;

			const updateIndex = SnakeMove(state.indexHead, action.direction);

			// создание яблока
			function generateAppleIndex(snakeBody: number[]): number {
				const index = getRandomNumber(100);
				if (snakeBody.includes(index)) {
					return generateAppleIndex(snakeBody);
				} else {
					return index;
				}
			}

			const CellsEdit = state.Cells.map((item, index) => {
				// перенос головы, сбор яблока, проигрыш
				if (index === updateIndex) {
					if (index === state.indexAplle) {
						newScore += 1;
						newIndexApple = generateAppleIndex(newSnakeBody);
					}

					if (state.SnakeBody.includes(index)) {
						newLose = !newLose;
					}

					newIndexHead = index;
					return 'snakeHead';
				}

				// создание туловища после головы
				if (index === state.indexHead) {
					newSnakeBody = [...newSnakeBody, index];

					return 'snakeBody';
				}

				// удаление последнего сегмента
				if (
					state.SnakeBody[0] === index &&
					state.SnakeBody.length > state.score + 2
				) {
					newSnakeBody = newSnakeBody.filter((_, i) => i !== 0);
					return null;
				}

				if (index === state.indexAplle) {
					return 'apple';
				}

				return item;
			});

			return {
				...state,
				Cells: CellsEdit,
				score: newScore,
				indexAplle: newIndexApple,
				indexHead: newIndexHead,
				SnakeBody: newSnakeBody,
				lose: newLose,
			};
		}
		default:
			return state;
	}
}

export const actionCreatorCalcSnake = (direction: string) => ({
	type: 'CALC-CELLS',
	direction: direction,
});
