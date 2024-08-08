import { call, put } from "redux-saga/effects";
import { ApiConstants, EnvConstants } from "src/const";
import { userActions } from "src/redux-store/store";
import { UserService } from "src/services";

export function* getUserByTokenSaga(action) {
  try {
    const response = yield call(
      UserService.getUserByTokenService,
      action.payload.token
    );
    if (response.status === ApiConstants.STT_OK) {
      yield put(userActions.getUserByTokenSuccess(response.data.data));
    } else {
      yield call(action.payload.onError);
      yield put(userActions.userFailed(response.data));
    }
  } catch (error) {
    yield call(action.payload.onError);
    EnvConstants.IS_DEV && console.log(error);
    yield put(userActions.userFailed(error));
  }
}

export function* getUserListSaga(action) {
  try {
    const response = yield call(UserService.getUserListService, action.payload);
    if (response.status === ApiConstants.STT_OK) {
      yield put(
        userActions.getUserListSuccess({
          userList: response.data.data.content,
          totalElements: response.data.data.totalElements,
        })
      );
    } else {
      yield put(userActions.userFailed(response.data));
    }
  } catch (error) {
    EnvConstants.IS_DEV && console.log(error);
    yield put(userActions.userFailed(error));
  }
}

export function* getUserBlackListSaga(action) {
  try {
    const response = yield call(
      UserService.getUserBlackListService,
      action.payload
    );
    if (response.status === ApiConstants.STT_OK) {
      yield put(
        userActions.getUserBlackListSuccess({
          useBlackList: response.data.data.content,
          totalElements: response.data.data.totalElements,
        })
      );
    } else {
      yield put(userActions.userFailed(response.data));
    }
  } catch (error) {
    EnvConstants.IS_DEV && console.log(error);
    yield put(userActions.userFailed(error));
  }
}
