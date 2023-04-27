import { CSSProperties, HTMLAttributes } from "react";
import cl from "./styles.module.scss";

interface SliderProps {
  value: number;
  min?: string;
  max?: string;
  step?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Slider = ({ value, ...props }: SliderProps) => {
  return (
    <input
      {...props}
      className={cl.slider}
      style={
        {
          "--value": value / parseInt(props.max!),
        } as CSSProperties
      }
      value={value}
      type="range"
    />
  );
};

export default Slider;
