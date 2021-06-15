import { toast } from "react-toastify";
export const createNotification = (type, message) => {
    switch (type) {
        case "success":
            toast.success(message, {
                position: "top-right",
                closeOnClick: true,
            });
            break;
        case "error":
            toast.error(message, {
                position: "top-right",
                closeOnClick: true,
            });
            break;
    }
};
