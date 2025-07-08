import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ErrorModal from '../../components/error';
import LoadingModal from '../../components/loading';

const Invoice = () => {
  const { id } = useParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [receiptDetails, setReceiptDetails] = useState({});
  const [errorType, setErrorType] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReceiptDetails = async () => {
      try {
        const URL = `${import.meta.env.VITE_DOMAIN_BACKUP}${import.meta.env.VITE_API_GET_RECEIPT_BY_ID}${id}`;
        const response = await fetch(URL);
        const result = await response.json();

        if (result.success) {
          setReceiptDetails(result.receipt);
          setBooks(result.orders);
        } else if (!result.success) {
          setErrorType('not_found');
          setLoading(false);
          return;
        } else {
          setErrorType('server_error');
          setLoading(false);
          return;
        }
      } catch {
        setErrorType('server_error');
        setLoading(false);
        return;
      } finally {
        setLoading(false);
      }
    };

    fetchReceiptDetails();
  }, [id]);

  if (errorType === 'not_found') {
    return (
      <ErrorModal
        title='Không tìm thấy hóa đơn'
        message={`Hóa đơn ${id} không tồn tại hoặc đã xảy ra lỗi kết nối. Vui lòng kiểm tra lại mã hóa đơn và thử lại sau.`}
        icon='🔍'
      />
    );
  }

  if (errorType === 'server_error') {
    return (
      <ErrorModal
        title='Lỗi hệ thống'
        message='Đã xảy ra lỗi khi tải dữ liệu. Vui lòng thử lại sau ít phút.'
        icon='⚠️'
      />
    );
  }

  if (errorType === 'network_error') {
    return (
      <ErrorModal
        title='Lỗi kết nối'
        message='Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng.'
        icon='📡'
      />
    );
  }
  if (loading) {
    return <LoadingModal />;
  }

  return (
    <div className='min-h-screen bg-gray-50 p-6'>
      <div className='max-w-4xl mx-auto'>
        <div className='mb-6'>
          <button
            className='bg-green-600 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors'
            onClick={() => navigate(-1)}
          >
            ← Quay lại
          </button>
        </div>
        <h3 className='text-2xl font-bold text-gray-800 mb-6'>Chi tiết đơn hàng {id}</h3>

        {loading ? (
          <p className='text-gray-600'>Đang tải...</p>
        ) : (
          <div className='bg-white rounded-lg shadow-lg p-6 max-h-[80vh] overflow-y-auto'>
            <div className='bg-gray-50 p-4 rounded-lg space-y-3'>
              <div className='flex justify-between'>
                <span className='font-medium text-gray-700'>Tên Thu Ngân:</span>
                <span className='text-gray-900'>{receiptDetails.name_cashier || 'N/A'}</span>
              </div>

              <div className='flex justify-between'>
                <span className='font-medium text-gray-700'>Thời gian:</span>
                <span className='text-gray-900'>
                  {receiptDetails.createAt ? receiptDetails.createAt.replace('T', ' ').slice(0, 19) : 'N/A'}
                </span>
              </div>

              <div className='flex justify-between'>
                <span className='font-medium text-gray-700'>Thanh toán:</span>
                <span className='text-gray-900'>
                  {receiptDetails.payment_method === 'cash' ? 'Tiền mặt' : 'Chuyển khoản'}
                </span>
              </div>
            </div>

            <div className='overflow-x-auto mb-6'>
              <table className='w-full border-collapse border border-gray-300'>
                <thead>
                  <tr className='bg-gray-100'>
                    <th className='border border-gray-300 px-4 py-2 text-left'>STT</th>
                    <th className='border border-gray-300 px-4 py-2 text-left'>Mã sách</th>
                    <th className='border border-gray-300 px-4 py-2 text-left'>Tên sách</th>
                    <th className='border border-gray-300 px-4 py-2 text-center'>Số lượng</th>
                    <th className='border border-gray-300 px-4 py-2 text-right'>Đơn giá</th>
                    <th className='border border-gray-300 px-4 py-2 text-right'>Thành tiền</th>
                  </tr>
                </thead>
                <tbody>
                  {books.map((book, index) => (
                    <tr key={book.id_product} className='hover:bg-gray-50 cursor-pointer transition-colors'>
                      <td className='border border-gray-300 px-4 py-2 text-center'>{index + 1}</td>
                      <td className='border border-gray-300 px-4 py-2'>{book.id_product}</td>
                      <td className='border border-gray-300 px-4 py-2'>{book.name}</td>
                      <td className='border border-gray-300 px-4 py-2 text-center'>{book.quantity}</td>
                      <td className='border border-gray-300 px-4 py-2 text-right'>
                        {parseFloat(book.price).toLocaleString('vi-VN')} ₫
                      </td>
                      <td className='border border-gray-300 px-4 py-2 text-right font-semibold'>
                        {(book.quantity * book.price).toLocaleString('vi-VN')} ₫
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className='bg-gray-50 p-4 rounded-lg space-y-3'>
              <div className='flex justify-between'>
                <span className='font-medium text-gray-700'>Tổng tiền:</span>
                <span className='text-gray-900'>
                  {Math.floor(receiptDetails.total_amount).toLocaleString('vi-VN')} ₫
                </span>
              </div>
              <div className='flex justify-between'>
                <span className='font-medium text-gray-700'>Tiền giảm:</span>
                <span className='text-gray-900'>
                  {receiptDetails.voucher ? Math.floor(receiptDetails.voucher).toLocaleString('vi-VN') : 0} ₫
                </span>
              </div>
              <div className='flex justify-between border-t pt-3'>
                <span className='font-bold text-lg text-gray-800'>Thành tiền:</span>
                <span className='font-bold text-lg text-red-600'>
                  {receiptDetails.voucher
                    ? Math.floor(receiptDetails.total_amount - receiptDetails.voucher).toLocaleString('vi-VN')
                    : Math.floor(receiptDetails.total_amount).toLocaleString('vi-VN')}{' '}
                  ₫
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Invoice;
