import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from '../slices/user';
import scheduleReducer from '../slices/schedule';

const reducers = combineReducers({
	user: userReducer,
	schedule: scheduleReducer,
});
const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['user'],
};
const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});

export default store;
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
