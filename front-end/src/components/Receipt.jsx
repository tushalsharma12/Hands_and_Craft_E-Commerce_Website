import PropTypes from 'prop-types';
import { format } from 'date-fns';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { Download, Printer, X } from 'lucide-react';

const Receipt = ({ orderData, onClose }) => {
  const downloadPDF = async () => {
    const receipt = document.getElementById('receipt');
    const canvas = await html2canvas(receipt);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`receipt-${orderData.orderId}.pdf`);
  };

  const printReceipt = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl relative animate-fadeIn">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </button>

        <div id="receipt" className="p-6">
          {/* Header */}
          <div className="text-center border-b pb-4">
            <h1 className="text-3xl font-extrabold text-black tracking-wide">Hands<span className='text-yellow-600'>&</span>Craft</h1>
            <p className="text-sm text-gray-500">Order Receipt</p>
            <p className="text-xs text-gray-400 mt-1">
              Receipt Generated: {format(new Date(), 'PPpp')}
            </p>
          </div>

          {/* Order Summary */}
          <div className="mt-6 bg-gray-50 rounded-xl p-4 shadow-sm">
            <div className="flex justify-between text-sm">
              {/* <div>
                <p className="text-gray-600">Order ID:</p>
                <p className="font-semibold text-gray-800">{orderData.orderId}</p>
              </div> */}
              <div className="text-left">
                <p className="text-gray-600">Status:</p>
                <p className="font-semibold text-green-600">Payment Successful</p>
              </div>
            </div>
            <div className="mt-3 text-sm text-gray-600">
              <p>Transaction ID:</p>
              <p className="font-mono text-xs text-blue-600">{orderData.paymentIntentId}</p>
            </div>
          </div>

          {/* Order Items */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Items Ordered</h3>
            <div className="overflow-hidden border rounded-lg">
              <table className="min-w-full text-sm">
                <thead className="bg-blue-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-gray-700 font-medium">Item</th>
                    <th className="px-4 py-2 text-right text-gray-700 font-medium">Qty</th>
                    <th className="px-4 py-2 text-right text-gray-700 font-medium">Price</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {orderData.items.map((item, index) => (
                    <tr key={index}>
                      <td className="px-4 py-3 text-gray-800">{item.title}</td>
                      <td className="px-4 py-3 text-right">{item.quantity}</td>
                      <td className="px-4 py-3 text-right">₹{item.price}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-100 font-bold text-blue-700 text-sm">
                    <td className="px-4 py-3 text-right" colSpan={2}>Total</td>
                    <td className="px-4 py-3 text-right">₹{orderData.totalAmount}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="border-t bg-white px-6 py-4 flex justify-between rounded-b-2xl">
          <button
            onClick={onClose}
            className="text-sm text-gray-600 hover:text-red-600 font-medium transition"
          >
            Close
          </button>
          <div className="flex gap-2">
            <button
              onClick={downloadPDF}
              className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </button>
            <button
              onClick={printReceipt}
              className="flex items-center gap-1 px-4 py-2 bg-gray-700 text-white rounded-md text-sm hover:bg-gray-800"
            >
              <Printer className="w-4 h-4" />
              Print
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

Receipt.propTypes = {
  orderData: PropTypes.shape({
    orderId: PropTypes.string.isRequired,
    paymentIntentId: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
      })
    ).isRequired,
    totalAmount: PropTypes.number.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Receipt;
