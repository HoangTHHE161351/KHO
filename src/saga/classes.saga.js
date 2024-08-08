import { call, put } from "redux-saga/effects";
import { ApiConstants, EnvConstants } from "src/const";
import { classesActions } from "src/redux-store/store";
import { ClassService } from "src/services";

export function* getClassListSaga(action) {
  try {
    const response = yield call(ClassService.getClassesList, action.payload);
    if (response.status === ApiConstants.STT_OK) {
      yield put(classesActions.getClassesListSuccess(response.data.data));
    } else {
      yield put(classesActions.classFailure(response.data));
    }
  } catch (error) {
    EnvConstants.IS_DEV && console.log(error);
    yield put(classesActions.classFailure(error));
  }
}
