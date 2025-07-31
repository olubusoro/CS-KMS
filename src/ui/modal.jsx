import { Button } from "./button";

export const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-[1px] bg-black/60"
      onClick={onClose} // Close when clicking on the overlay
    >
      <div
        className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto pt-6"
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside content from closing modal
      >
        {children}
        <Button
          variant="ghost"
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-900"
          onClick={onClose}
        >
          &times;
        </Button>
      </div>
    </div>
  );
};