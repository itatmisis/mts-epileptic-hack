import { Slider } from "@/components";
import { useEffect, useRef, useState } from "react";
import cl from "./styles.module.scss";

interface AccessibilityPopupProps {
  onClose: () => void;
  videoRef: React.RefObject<HTMLVideoElement>;
}

const AccessibilityPopup = ({ onClose, videoRef }: AccessibilityPopupProps) => {
  const popupRef = useRef<HTMLDivElement>(null);
  const [contrast, setContrast] = useState(1);
  const [saturation, setSaturation] = useState(1);
  const [brightness, setBrightness] = useState(1);

  useEffect(() => {
    videoRef.current!.style.filter = `contrast(${contrast}) saturate(${saturation}) brightness(${brightness})`;
  }, [contrast, saturation, brightness]);

  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (e.target == popupRef.current) {
        return;
      }
      // onClose();
    });

    return () => {
      document.body.addEventListener("click", (e) => {
        if (e.target == popupRef.current) {
          return;
        }
        // onClose();
      });
    };
  }, [onClose]);

  return (
    <div
      className={cl.accessibilityPopup}
      ref={popupRef}
      onClick={(e) => e.stopPropagation()}
    >
      <div className={cl.option}>
        <div className={cl.option__title}>Контрастность</div>
        <Slider
          min="0"
          max="2"
          step="0.01"
          value={contrast}
          onChange={(e) => setContrast(+e.target.value)}
        />
        <div className={cl.option__value}>{Math.round(contrast * 100)}%</div>
      </div>
      <div className={cl.option}>
        <div className={cl.option__title}>Насыщенность</div>
        <Slider
          min="0"
          max="2"
          step="0.01"
          value={saturation}
          onChange={(e) => setSaturation(+e.target.value)}
        />
        <div className={cl.option__value}>{Math.round(saturation * 100)}%</div>
      </div>
      <div className={cl.option}>
        <div className={cl.option__title}>Яркость</div>
        <Slider
          min="0"
          max="2"
          step="0.01"
          value={brightness}
          onChange={(e) => setBrightness(+e.target.value)}
        />
        <div className={cl.option__value}>{Math.round(brightness * 100)}%</div>
      </div>
    </div>
  );
};

export default AccessibilityPopup;
