import { useEffect, useRef, useState } from "react";
import cl from "./styles.module.scss";
import { ReactComponent as Close } from "./assets/close.svg";

interface IModalProps {
  isOpen: boolean;
  onClose?: () => void;
  title?: string;
  variant?: "default" | "small";
  renderContent: (onModalClose: () => void) => JSX.Element;
}

const Modal = ({
  isOpen,
  onClose,
  variant = "default",
  title,
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

  // useEffect(() => {
  //   document.body.style.overflow = isOpen ? "hidden" : "";

  //   return () => {
  //     document.body.style.overflow = "";
  //   };
  // });

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
          <div className={cl.modalContent}>
            {title && (
              <div className={cl.modalHeader}>
                <p className={cl.modalTitle}>{title}</p>
                <Close
                  className={cl.modalClose}
                  onClick={() => {
                    setIsClosing(true);
                  }}
                />
              </div>
            )}
            <div className={cl.modalBody}>
              {renderContent(() => setIsClosing(true))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
