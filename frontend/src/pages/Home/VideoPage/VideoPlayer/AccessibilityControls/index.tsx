import { Slider } from "@/components";
import { useEffect, useRef, useState } from "react";
import cl from "./styles.module.scss";

interface AccessibilityPopupProps {
  onClose: () => void;
  contrast: number;
  saturation: number;
  brightness: number;
  setContrast: (value: number) => void;
  setSaturation: (value: number) => void;
  setBrightness: (value: number) => void;
}

const AccessibilityControls = ({
  onClose,
  contrast,
  saturation,
  brightness,
  setContrast,
  setSaturation,
  setBrightness,
}: AccessibilityPopupProps) => {
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (e.target == popupRef.current) {
        return;
      }
      onClose();
    });

    return () => {
      document.body.addEventListener("click", (e) => {
        if (e.target == popupRef.current) {
          return;
        }
        onClose();
      });
    };
  }, [onClose]);

  return (
    <div
      className={cl.accessibilityControls}
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

export default AccessibilityControls;
