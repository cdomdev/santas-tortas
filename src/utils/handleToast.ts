type PropToast = {
    setToastMessage: (message: string) => void;
    setShowToast: (show: boolean) => void;
    setBgToast: (background: string) => void;
    background: string;
    message: string;
  };
  
  export const handleToast = ({
    background,
    message,
    setBgToast,
    setShowToast,
    setToastMessage,
  }: PropToast) => {
    if (!setShowToast || !setBgToast || !setToastMessage) {
      console.error("Error: una de las funciones requeridas no está definida.");
      return;
    }
  
    setShowToast(true);
    setBgToast(background);
    setToastMessage(message);
  
    const timeoutId = setTimeout(() => {
      setShowToast(false);
    }, 5000);
  
    return () => clearTimeout(timeoutId);
  };
  