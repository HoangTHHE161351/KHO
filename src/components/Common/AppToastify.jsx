import { Bounce, toast } from "react-toastify";
import { AppConstants } from "src/const";

const notifyDefault = (message) => {
  toast(message, {
    position: "bottom-left",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });
};

const notifySuccess = (message) => {
  toast.success(message, {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Bounce,
  });
};

const notifyError = (message) => {
  toast.error(message, {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Bounce,
  });
};

const notifyWarning = (message) => {
  toast.warning(message, {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Bounce,
  });
};

const AppToastNotify = ({ type, message }) => {
  switch (type) {
    case AppConstants.NOTIFY_TYPE.SUCCESS:
      notifySuccess(message);
      break;
    case AppConstants.NOTIFY_TYPE.ERROR:
      notifyError(message);
      break;
    case AppConstants.NOTIFY_TYPE.WARNING:
      notifyWarning(message);
      break;

    default:
      notifyDefault(message);
      break;
  }
};

export default AppToastNotify;
