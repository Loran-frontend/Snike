import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { actionCreatorCalcDirection } from '../app/arrow-reducer';
import { actionCreatorCalcSnake } from '../app/snake-reducer';
import { rootStore, store } from '../app/store';
import { usePersistentTimer } from '../utils/usePersistentTimer';
import { Cell } from './Cell';

export default function Snake() {
	useEffect(() => {
		const cb = (e: KeyboardEvent) => {
			store.dispatch(actionCreatorCalcDirection(e.key));
		};

		window.addEventListener('keydown', e => cb(e));

		return () => {
			window.removeEventListener('keydown', e => cb(e));
		};
	}, []);

	usePersistentTimer(
		() => {
			store.dispatch(
				actionCreatorCalcSnake(store.getState().direction.direction)
			);
		},
		200,
		store.getState().snake.lose
	); // цикл игры

	const myCells = useSelector((state: rootStore) => {
		return state.snake.Cells.map((content, i) => (
			<Cell key={i} content={content} />
		));
	});

	const myScore = useSelector(() => {
		return store.getState().snake.score;
	});

	return (
		<div className='w-screen h-screen bg-slate-600 flex flex-col justify-center items-center'>
			<p className='text-3xl mb-3'>Счёт: {myScore}</p>
			<div className='grid grid-cols-10 grid-rows-10 bg-slate-900'>
				{myCells}
			</div>
		</div>
	);
}
