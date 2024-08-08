import { instanceAPIMain } from "src/api";
import { ApiConstants } from "src/const";

export const callModelAPI = () => instanceAPIMain.get(ApiConstants.CALL_MODELING_API);

export const sendLoadScheduleRq = () => instanceAPIMain.get(ApiConstants.SEND_LOAD_REQUEST_SCHEDULE_REQUEST);