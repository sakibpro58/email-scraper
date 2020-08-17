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
        progressBarColor: type === 'success' ? '#00ffb8' : '#ffafb4',
        color: type === 'success' ? '#565c70' : '#565c70',
        messageColor: type === 'success' ? '#00ffb8' : '#ffafb4',
        icon: type === 'success' ? 'mdi mdi-check' : 'mdi mdi-alert-circle-outline'
    });
};


const Helper = {
    serverURL: window.location.origin,
    showNotification: showNotification
}

export default Helper;