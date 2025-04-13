import { AnyAction } from 'redux';

const initialState = {
  loading: false,
  data: null,
};

export const calendarDayReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case 'LOADING_CALENDAR_DAY':
      return { ...state, loading: true };
    case 'SET_CALENDAR_DAY':
      return { loading: false, data: action.payload };
    default:
      return state;
  }
};
