export function SnakeMove(indexHead: number, direction: string | undefined) {
	let result = 0;
	switch (direction) {
		case 'UP':
			result = indexHead - 10;
			if (result < 0) {
				result += 100;
			}
			return result;
		case 'DOWN':
			result = indexHead + 10;
			if (result >= 100) {
				result -= 100;
			}
			return result;
		case 'LEFT':
			result = indexHead - 1;
			if (result % 10 === 9 || result === -1) {
				result += 10;
			}
			return result;
		case 'RIGHT':
			result = indexHead + 1;
			if (result % 10 === 0) {
				result -= 10;
			}

			return result;
		default:
			console.log('ERROR DIRECTION');
			break;
	}
}
