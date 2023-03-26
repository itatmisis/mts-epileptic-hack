import { useEffect, useRef, useState } from "react";
import cl from "./styles.module.scss";

interface IModalProps {
  isOpen: boolean;
  onClose?: () => void;
  variant?: "default" | "small";
  renderContent: () => JSX.Element;
}

const Modal = ({
  isOpen,
  onClose,
  variant = "default",
  renderContent,
}: IModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isClosing, setIsClosing] = useState(false);

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && e.target === modalRef.current) {
      setIsClosing(true);
    }
  };

  useEffect(() => {
    // controlled input
    if (!onClose) return;

    if (isClosing) {
      setTimeout(() => {
        onClose();
        setIsClosing(false);
      }, 200);
    }
  }, [isClosing, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  });

  return (
    <>
      {isOpen && (
        <div
          className={`${cl.modal} ${isClosing ? cl.closing : ""} ${
            variant === "small" ? cl.small : ""
          }`}
          onClick={handleModalClick}
          ref={modalRef}
        >
          <div className={cl.modalContent}>{renderContent()}</div>
        </div>
      )}
    </>
  );
};

export default Modal;
