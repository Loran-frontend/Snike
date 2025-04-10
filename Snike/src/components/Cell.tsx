import clsx from 'clsx';

export function Cell({ content }: { content: string | null }) {
	return (
		<div
			className={clsx(
				content === 'snakeHead'
					? 'bg-green-400 border-4 border-red-900'
					: content === `snakeBody`
					? 'bg-green-400'
					: content === 'apple'
					? 'bg-red-600'
					: '',
				'h-12 w-12 border border-white'
			)}
		></div>
	);
}
