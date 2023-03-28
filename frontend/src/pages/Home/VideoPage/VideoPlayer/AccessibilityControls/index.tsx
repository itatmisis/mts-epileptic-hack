import { Slider } from "@/components";
import { useEffect, useRef, useState } from "react";
import cl from "./styles.module.scss";
import { ReactComponent as ResetIcon } from "./assets/reset.svg";

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
        <div className={cl.option__body}>
          <div className={cl.option__title}>
            <p>Контрастность</p>
            <div className={cl.option__value}>
              {Math.round(contrast * 100)}%
            </div>
          </div>
          <Slider
            min="0"
            max="2"
            step="0.01"
            value={contrast}
            onChange={(e) => setContrast(+e.target.value)}
          />
        </div>
        <button className={cl.option__reset} onClick={() => setContrast(1)}>
          <ResetIcon />
        </button>
      </div>
      <div className={cl.option}>
        <div className={cl.option__body}>
          <div className={cl.option__title}>
            <p>Насыщенность</p>
            <div className={cl.option__value}>
              {Math.round(saturation * 100)}%
            </div>
          </div>
          <Slider
            min="0"
            max="2"
            step="0.01"
            value={saturation}
            onChange={(e) => setSaturation(+e.target.value)}
          />
        </div>
        <button className={cl.option__reset} onClick={() => setSaturation(1)}>
          <ResetIcon />
        </button>
      </div>
      <div className={cl.option}>
        <div className={cl.option__body}>
          <div className={cl.option__title}>
            <p>Яркость</p>
            <div className={cl.option__value}>
              {Math.round(brightness * 100)}%
            </div>
          </div>
          <Slider
            min="0"
            max="2"
            step="0.01"
            value={brightness}
            onChange={(e) => setBrightness(+e.target.value)}
          />
        </div>
        <button className={cl.option__reset} onClick={() => setBrightness(1)}>
          <ResetIcon />
        </button>
      </div>
    </div>
  );
};

export default AccessibilityControls;
