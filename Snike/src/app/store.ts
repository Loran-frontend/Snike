import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { ArrowReducer, initialArrowStateType } from './arrow-reducer';
import { initialSnakeStateType, SnakeReducer } from './snake-reducer';

export type rootStore = {
	snake: initialSnakeStateType;
	direction: initialArrowStateType;
};

const reducers = combineReducers({
	snake: SnakeReducer,
	direction: ArrowReducer,
});

export const store = configureStore({
	reducer: reducers,
});
