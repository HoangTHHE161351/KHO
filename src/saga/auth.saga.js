import { call, put } from "redux-saga/effects";
import { ApiConstants } from "src/const";
import { authActions } from "src/redux-store/store";
import { AuthService } from "src/services";

export function* requestLoginSaga(action) {
  try {
    const { username, password, onSuccess } = action.payload;
    const response = yield call(AuthService.requestLoginService, {
      username,
      password,
    });
    if (response.status === ApiConstants.STT_OK) {
      yield put(authActions.requestLoginSuccess(response.data.data.data));
      yield call(onSuccess);
    } else {
      yield put(authActions.authFailure(response));
    }
  } catch (error) {
    yield put(authActions.authFailure(error));
  }
}

export function* requestRegisterSaga(action) {
  try {
    const response = yield call(AuthService.requestRegisterService, {
      ...action.payload,
    });
    if (response.status === ApiConstants.STT_OK) {
      yield put(authActions.requestRegisterSuccess(response.data.data));
    } else {
      yield put(authActions.authFailure(response));
    }
  } catch (error) {
    yield put(authActions.authFailure(error));
  }
}

export function* getUserProfileSaga() {
  try {
    const response = yield call(AuthService.getUserProfile);
    if (response.status === ApiConstants.STT_OK) {
      yield put(authActions.getUserProfileSuccess(response.data.data.data));
    } else {
      yield put(authActions.authFailure(response));
    }
  } catch (error) {
    yield put(authActions.authFailure(error));
  }
}
