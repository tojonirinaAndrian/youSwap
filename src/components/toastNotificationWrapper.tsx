'use client';
import { useGlobalStore } from "@/store/use-global-store";
import ToastNotification from "./toastNotification";

export default function ToastNotificationsWrapper () {
    const { openToasts } = useGlobalStore();
    return <div className="fixed bottom-5 px-5 space-y-1">
        {(openToasts.map((toast) => {
            return <>
                <ToastNotification toastType={toast.toastCurrentType} content={toast.toastContent + toast.id} toastId={toast.id} />
            </>
        }))}
    </div>
}