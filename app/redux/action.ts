export const loadDiaryYear = () => {
    return async (dispatch: any) => {
      dispatch({ type: 'DIARY_LOADING' });
  
      // Fake delay to simulate fetch
      setTimeout(() => {
        dispatch({
          type: 'DIARY_LOADED',
          payload: {
            trackedDayMap: {}, // fill this from API in real usage
            usesImperialUnits: false
          }
        });
      }, 1000);
    };
  };
  
  export const loadCalendarDay = (date: Date) => {
    return async (dispatch: any) => {
      dispatch({ type: 'CALENDAR_LOADING' });
  
      // Fake delay to simulate fetch
      setTimeout(() => {
        dispatch({
          type: 'CALENDAR_LOADED',
          payload: {
            trackedDay: {}, // Your tracked day info
            userActivities: [],
            breakfastIntake: [],
            lunchIntake: [],
            dinnerIntake: [],
            snackIntake: []
          }
        });
      }, 1000);
    };
  };
  
  
export const deleteIntakeItem = (intakeId: string, selectedDate: string) => {
  return (dispatch: any) => {
    dispatch({ type: 'DELETE_INTAKE_ITEM_REQUEST' });

    // Simulate async deletion (you would replace this with an API call)
    setTimeout(() => {
      dispatch({
        type: 'DELETE_INTAKE_ITEM_SUCCESS',
        payload: { intakeId, selectedDate },
      });
    }, 1000);
  };
};

export const deleteUserActivityItem = (activityId: string, selectedDate: string) => {
  return (dispatch: any) => {
    dispatch({ type: 'DELETE_ACTIVITY_ITEM_REQUEST' });

    // Simulate async deletion (you would replace this with an API call)
    setTimeout(() => {
      dispatch({
        type: 'DELETE_ACTIVITY_ITEM_SUCCESS',
        payload: { activityId, selectedDate },
      });
    }, 1000);
  };
};

export const updateHomePage = (newData: any) => {
  return (dispatch: any) => {
    dispatch({ type: 'UPDATE_HOME_PAGE_REQUEST' });

    // Simulate async update (you would replace this with an API call)
    setTimeout(() => {
      dispatch({
        type: 'UPDATE_HOME_PAGE_SUCCESS',
        payload: newData,
      });
    }, 1000);
  };
};