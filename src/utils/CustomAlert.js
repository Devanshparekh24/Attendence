let showAlertHandler = null;

export const registerAlert = (fn) => {
  showAlertHandler = fn;
};

const CustomAlert = {
  alert: (title, message) => {
    if (showAlertHandler) {
      showAlertHandler(title, message);
    }
  },
};

export default CustomAlert;