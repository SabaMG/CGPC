import { useState, useEffect } from "react";
import { Button } from "@nextui-org/react";

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cookiesAccepted = document.cookie
      .split("; ")
      .find((row) => row.startsWith("cookiesAccepted="));

    if (!cookiesAccepted) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    document.cookie = "cookiesAccepted=true; path=/";
    setIsVisible(false);
  };

  const handleDecline = () => {
    document.cookie = "cookiesAccepted=false; path=/";
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 bg-opacity-90 text-white p-4 z-50">
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        <p className="text-sm">
          Nous utilisons des cookies pour améliorer votre expérience. En
          continuant, vous acceptez notre politique de cookies.
        </p>
        <div className="flex space-x-2">
          <Button color="success" auto size="sm" onPress={handleAccept}>
            Accepter
          </Button>
          <Button color="error" auto flat size="sm" onPress={handleDecline}>
            Refuser
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
