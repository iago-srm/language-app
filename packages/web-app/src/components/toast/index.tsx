import { ToastContainer, toast as toastifyToast} from 'react-toastify';
import { useColorTheme } from '@contexts';

export const Toast = () => {
  const { theme } = useColorTheme();
  return <ToastContainer
    position="top-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme={theme}
    />
}

export const successToast = (message: string) => toastifyToast.success(message);
export const errorToast = (message: string) => toastifyToast.error(message);
