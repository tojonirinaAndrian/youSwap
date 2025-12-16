'use client';
import { useGlobalStore } from "@/store/use-global-store";
import ToastNotification from "./toastNotification";

export default function ToastNotificationsWrapper () {
    const { openToasts } = useGlobalStore();
    return <div className="fixed bottom-5 px-5 space-y-2 z-20">
        {(openToasts.map((toast) => {
            return <div key={toast.id}>
                <ToastNotification toastType={toast.toastCurrentType} content={toast.toastContent} toastId={toast.id} />
            </div>
        }))}
    </div>
}