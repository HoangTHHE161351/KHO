import { call, put } from "redux-saga/effects";
import { ApiConstants, EnvConstants } from "src/const";
import { subjectActions } from "src/redux-store/store";
import { SubjectService } from "src/services";

export function* getSubjectListSaga(action) {
  try {
    const response = yield call(
      SubjectService.getSubjectListService,
      action.payload
    );
    if (response.status === ApiConstants.STT_OK) {
      yield put(subjectActions.getSubjectListSuccess(response.data.data));
    } else {
      yield put(subjectActions.subjectFailed(response.data));
    }
  } catch (error) {
    EnvConstants.IS_DEV && console.log(error);
    yield put(subjectActions.subjectFailed(error));
  }
}
