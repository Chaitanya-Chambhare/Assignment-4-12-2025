/**
 * Toast
 * Simple reusable toast component.
 * Props:
 * - visible: boolean
 * - message: string
 */
function Toast({ visible, message }) {
  return (
    <div className={`toast ${visible ? "show" : ""}`}>
      {message}
    </div>
  );
}

export default Toast;
