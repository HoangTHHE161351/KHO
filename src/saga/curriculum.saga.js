import { call, put } from "redux-saga/effects";
import { ApiConstants, EnvConstants } from "src/const";
import { curriculumActions } from "src/redux-store/store";
import { CurriculumService } from "src/services";

export function* getCurriculumListSaga(action) {
  try {
    const response = yield call(
      CurriculumService.getCurriculumList,
      action.payload
    );
    if (response.status === ApiConstants.STT_OK) {
      yield put(curriculumActions.getCurriculumListSuccess(response.data.data));
    } else {
      yield put(curriculumActions.curriculumFailure(response.data));
    }
  } catch (error) {
    EnvConstants.IS_DEV && console.log(error);
    yield put(curriculumActions.curriculumFailure(error));
  }
}

export function* getCurriculumDetailSaga(action) {
  try {
    const response = yield call(
      CurriculumService.getCurriculumDetail,
      action.payload
    );
    if (response.status === ApiConstants.STT_OK) {
      yield put(curriculumActions.getCurriculumDetail(response.data.data));
    } else {
      yield put(curriculumActions.curriculumFailure(response.data));
    }
  } catch (error) {
    EnvConstants.IS_DEV && console.log(error);
    yield put(curriculumActions.curriculumFailure(error));
  }
}
