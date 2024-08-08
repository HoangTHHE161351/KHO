import { instanceAPIMain } from "src/api";
import { ApiConstants } from "src/const";

export const getStrangeListLogs = ({ params }) =>
    instanceAPIMain.get(ApiConstants.GET_STRANGE_LOGS + '?search=' + params?.search + '&type=' + params?.type + '&roomId='
        + params?.roomId + '&date=' + params?.date + '&page=' + params?.page + '&size=' + params?.size);

export const getScheduleStrange = (params) =>
    instanceAPIMain.get(ApiConstants.GET_SCHEDULE_LOG, { params })