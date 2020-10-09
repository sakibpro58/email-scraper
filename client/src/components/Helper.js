import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.css';

const showNotification = (message = 'Something went wrong', type = 'error') => {
    iziToast.show({
        title: '',
        message: message,
        messageSize: 12,
        position: 'topRight',
        theme: 'dark',
        pauseOnHover: true,
        timeout: 5000,
        progressBarColor: type === 'success' ? '#00ffb8' : '#ffafb4',
        color: type === 'success' ? '#565c70' : '#565c70',
        messageColor: type === 'success' ? '#00ffb8' : '#ffafb4',
        icon: type === 'success' ? 'mdi mdi-check' : 'mdi mdi-alert-circle-outline'
    });
};

const textEllipsis = (str, length, ending = '...') => {
    if (length == null) {
      length = 100;
    }
    if (str.length > length) {
      return str.substring(0, length - ending.length) + ending;
    } else {
      return str;
    }
};


const Helper = {
    serverURL: window.location.origin,
    showNotification: showNotification,
    textEllipsis: textEllipsis
}

export default Helper;