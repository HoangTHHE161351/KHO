import { call, put } from "redux-saga/effects";
import { ApiConstants, EnvConstants } from "src/const";
import { roomActions } from "src/redux-store/store";
import { RoomService } from "src/services";

export function* getRoomListSaga({ payload }) {
  try {
    const response = yield call(RoomService.getRoomList, payload);
    if (response.status === ApiConstants.STT_OK) {
      yield put(roomActions.getRoomListSuccess(response.data.data));
    } else {
      yield put(roomActions.roomFailure(response.data));
    }
  } catch (error) {
    EnvConstants.IS_DEV && console.log(error);
    yield put(roomActions.roomFailure(error));
  }
}
