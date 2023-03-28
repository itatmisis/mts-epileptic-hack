import cl from "./styles.module.scss";

interface AccessibilityPopupProps {
  onClose: () => void;
}

const AccessibilityPopup = ({  onClose }: AccessibilityPopupProps) => {
  return (
    <div className={cl.accessibilityPopup}>
      <h1></h1> AccessibilityPopup
    </div>
  );
};

export default AccessibilityPopup;
