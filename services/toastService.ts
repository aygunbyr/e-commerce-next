import { toast, ToastOptions } from 'react-toastify';

class ToastService {
  static success(message: string, options?: ToastOptions): void {
    toast.success(message, options);
  }

  static error(message: string, options?: ToastOptions): void {
    toast.error(message, options);
  }

  static info(message: string, options?: ToastOptions): void {
    toast.info(message, options);
  }

  static warning(message: string, options?: ToastOptions): void {
    toast.warning(message, options);
  }
}

export default ToastService;
