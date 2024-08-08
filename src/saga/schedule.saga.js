import { call, put } from "redux-saga/effects";
import { ApiConstants, EnvConstants } from "src/const";
import { scheduleActions } from "src/redux-store/store";
import { ScheduleService } from "src/services";

export function* getScheduleListSaga(action) {
  try {
    const response = yield call(ScheduleService.getSchedule, action.payload);
    if (response.status === ApiConstants.STT_OK) {
      yield put(scheduleActions.getScheduleListSuccess(response.data.data));
    } else {
      yield put(scheduleActions.scheduleFailed(response.data));
    }
  } catch (error) {
    EnvConstants.IS_DEV && console.log(error);
    yield put(scheduleActions.scheduleFailed(error));
  }
}

export function* getScheduleStudentSaga(action) {
  try {
    const response = yield call(
      ScheduleService.getScheduleStudent,
      action.payload
    );
    if (response.status === ApiConstants.STT_OK) {
      yield put(scheduleActions.getScheduleStudentSuccess(response.data.data));
    } else {
      yield put(scheduleActions.scheduleFailed(response.data));
    }
  } catch (error) {
    EnvConstants.IS_DEV && console.log(error);
    yield put(scheduleActions.scheduleFailed(error));
  }
}
