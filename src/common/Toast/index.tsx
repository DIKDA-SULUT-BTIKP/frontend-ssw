import { toast } from 'react-hot-toast';

const ToastNotification = {
  success: (message: string) => {
    toast.success(message, {
      position: 'top-center',
      duration: 4000,
      style: {
        background: '#fff',
        color: '#000',
      },
    });
  },
  error: (message: string) => {
    toast.error(message, {
      position: 'top-center',
      duration: 4000,
      style: {
        background: '#fff',
        color: '#000',
      },
    });
  },
  loading: (message: string) => {
    return toast.loading(message, {
      position: 'top-center',
      style: {
        background: '#FFF',
        color: '#000',
      },
    });
  },
  dismiss: (toastId: any) => {
    toast.dismiss(toastId);
  },
};
export default ToastNotification;
