import { call, put } from "redux-saga/effects";
import { ApiConstants, EnvConstants } from "src/const";
import { timeSlotActions } from "src/redux-store/store";
import { TimeSlotService } from "src/services";

export function* getTimeSlotsListSaga({ payload }) {
  try {
    const response = yield call(TimeSlotService.getTimeSlotsList, payload);
    if (response.status === ApiConstants.STT_OK) {
      yield put(timeSlotActions.getTimeSlotsListSuccess(response.data.data));
    } else {
      yield put(timeSlotActions.timeSlotFailure(response.data));
    }
  } catch (error) {
    EnvConstants.IS_DEV && console.log(error);
    yield put(timeSlotActions.timeSlotFailure(error));
  }
}

export function* getScheduleWeeksSaga({ payload }) {
  try {
    const response = yield call(TimeSlotService.getScheduleWeeks, payload);
    if (response.status === ApiConstants.STT_OK) {
      yield put(timeSlotActions.getScheduleWeeksSuccess(response.data.data));
    } else {
      yield put(timeSlotActions.timeSlotFailure(response.data));
    }
  } catch (error) {
    EnvConstants.IS_DEV && console.log(error);
    yield put(timeSlotActions.timeSlotFailure(error));
  }
}
