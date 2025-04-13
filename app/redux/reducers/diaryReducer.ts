import { AnyAction } from 'redux';

const initialState = {
  loading: false,
  data: null,
};

export const diaryReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case 'LOADING_DIARY_YEAR':
      return { ...state, loading: true };
    case 'SET_DIARY_YEAR':
      return { loading: false, data: action.payload };
    default:
      return state;
  }
};
