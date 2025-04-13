import { configureStore } from '@reduxjs/toolkit';
import { diaryReducer } from './reducers/diaryReducer';
import { calendarDayReducer } from './reducers/calendarDayReducer';

export const store = configureStore({
  reducer: {
    diary: diaryReducer,
    calendarDay: calendarDayReducer,
  },
});

// For types if you wanna be TypeScript cool
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
