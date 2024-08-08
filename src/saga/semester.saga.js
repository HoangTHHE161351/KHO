import { call, put } from "redux-saga/effects";
import { ApiConstants, EnvConstants } from "src/const";
import { semesterActions } from "src/redux-store/store";
import { SemesterService } from "src/services";

export function* getSemesterListSaga(action) {
  try {
    const response = yield call(SemesterService.getSemester, action.payload);
    if (response.status === ApiConstants.STT_OK) {
      yield put(semesterActions.getSemesterListSuccess(response.data.data));
    } else {
      yield put(semesterActions.semesterFailure(response.data));
    }
  } catch (error) {
    EnvConstants.IS_DEV && console.log(error);
    yield put(semesterActions.semesterFailure(error));
  }
}
