
export const Button = ({ children, className = '', variant = 'default', onClick , title }) => {
  const baseStyles = 'px-4 py-2 rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  let variantStyles = '';

  switch (variant) {
    case 'primary':
      variantStyles = 'bg-green-700 text-white hover:bg-green-800 focus:ring-green-500';
      break;
    case 'outline':
      variantStyles = 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-gray-400';
      break;
    case 'destructive':
      variantStyles = 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500';
      break;
    case 'ghost':
      variantStyles = 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-400';
      break;
    default:
      variantStyles = 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500';
  }

  return (
    <button
      title={title ? title : undefined}
      className={`${baseStyles} ${variantStyles} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};