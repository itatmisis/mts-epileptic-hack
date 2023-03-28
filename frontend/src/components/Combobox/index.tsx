import React from "react";
import { useState } from "react";
import cl from "./styles.module.scss";
import { ReactComponent as ArrowDown } from "./assets/arrow-down.svg";

interface ComboboxProps {
  options: string[];
  onChange: (value: string) => void;
}

const Combobox = ({ options, onChange }: ComboboxProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    onChange(option);
  };

  return (
    <div className={`${cl.combobox} ${isOpen ? cl.combobox__open : ""}`}>
      <div
        className={cl.combobox__selected}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {selectedOption}
        <ArrowDown className={cl.icon} />
      </div>
      {isOpen && (
        <div className={cl.combobox__options}>
          {options.map((option, index) => (
            <div
              key={index}
              className={cl.combobox__option}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Combobox;
