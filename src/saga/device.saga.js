import { call, put } from "redux-saga/effects";
import { ApiConstants, EnvConstants } from "src/const";
import { deviceActions } from "src/redux-store/store";
import { DeviceService } from "src/services";

export function* getDeviceListSaga(action) {
  try {
    const response = yield call(
      DeviceService.getDeviceListService,
      action.payload
    );
    if (response.status === ApiConstants.STT_OK) {
      yield put(deviceActions.getDeviceListSuccess(response.data.data));
    } else {
      yield put(deviceActions.deviceFailure(response.data));
    }
  } catch (error) {
    EnvConstants.IS_DEV && console.log(error);
    yield put(deviceActions.deviceFailure(error));
  }
}
