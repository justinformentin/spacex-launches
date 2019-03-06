import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const successNotify = (name) => {
  toast.success(`${name} Saved!`, {
    position:toast.POSITION.BOTTOM_LEFT,
    hideProgressBar: true,
    autoClose: 2000
  });
};
