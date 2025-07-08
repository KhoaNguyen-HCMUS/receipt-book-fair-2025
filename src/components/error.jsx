const ErrorModal = ({
  title = 'Lỗi',
  message = 'Vui lòng kiểm tra lại mã hóa đơn hoặc thử lại sau.',
  buttonText = 'Quay lại trang chủ',
  onButtonClick = () => (window.location.href = '/'),
  icon = '❌',
}) => {
  return (
    <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
      <div className='bg-white p-8 rounded-lg shadow-lg text-center max-w-md'>
        <div className='text-red-500 text-6xl mb-4'>{icon}</div>
        <h2 className='text-2xl font-bold text-gray-800 mb-4'>{title}</h2>
        <p className='text-gray-600 mb-6'>{message}</p>
        <button
          onClick={onButtonClick}
          className='cursor-pointer bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors'
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default ErrorModal;
