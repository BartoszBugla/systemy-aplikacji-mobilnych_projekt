import { apiClient } from "@/lib/api";
navigator.serviceWorker.register("/sw.js");

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export const initializePush = async () => {
  const swRegistration = await navigator.serviceWorker.ready;

  const subscription = await swRegistration.pushManager.getSubscription();

  if (!subscription) {
    const vapidPublicKey =
      "BGMtpZEa7G1Lo48R69MoSOe0nfoDiFrwygvYrl0rtQm1ctvapWXlnMCwhVMnbhur9EUcde9EvsxzERzF7fonEMk";

    const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);

    const newSubscription = await swRegistration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: convertedVapidKey,
    });

    await apiClient.api.pushMessageControllerRegister({
      subscription: newSubscription,
    });
  }
};
