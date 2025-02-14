interface Props {
  showAlert: boolean;
  type: "primary" | "secondary" | "warning" | "success" | "danger";
  heading: string;
  text: string;
  onClose: () => void;
}
const Alert = ({ showAlert, type, heading, text, onClose }: Props) => {
  const alertTypes = {
    primary: "alert-primary",
    secondary: "alert-secondary",
    success: "alert-success",
    danger: "alert-danger",
    warning: "alert-warning",
  };

  return (
    showAlert && (
      <div
        className={`alert ${alertTypes[type]} alert-dismissible`}
        role="alert"
      >
        <h4 className={`alert-heading d-flex align-items-center mb-1`}>
          {heading}
        </h4>
        <span>{text}</span>
        <button
          type="button"
          className="btn btn-close"
          aria-label="Close"
          onClick={onClose}
        >
        </button>
      </div>
    )
  );
};

export default Alert;
