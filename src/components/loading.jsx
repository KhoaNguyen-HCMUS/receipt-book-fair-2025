export default function LoadingModal() {
  return (
    <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
      <div className='bg-white p-8 rounded-lg shadow-lg text-center max-w-md'>
        <h2 className='text-2xl font-bold text-gray-800 mb-4'>Đang tải...</h2>
        <p className='text-gray-600 mb-6'>Vui lòng đợi trong giây lát.</p>
        <div className='loader'></div>
      </div>
    </div>
  );
}
