import PropTypes from 'prop-types';
import { format } from 'date-fns';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { Download, Printer } from 'lucide-react';

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg md:max-w-2xl">
        <div className="p-4 md:p-6" id="receipt">
          <div className="text-center border-b pb-4">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">Payment Receipt</h2>
            <p className="text-gray-500 text-sm md:text-base">Order #{orderData.orderId}</p>
            <p className="text-gray-500 text-sm md:text-base">{format(new Date(), 'PPP')}</p>
          </div>

          <div className="mt-4 md:mt-6 space-y-3">
            <div className="flex justify-between text-sm md:text-base">
              <span className="text-gray-600">Payment Status:</span>
              <span className="font-semibold text-green-600">Successful</span>
            </div>
            <div className="flex justify-between text-sm md:text-base">
              <span className="text-gray-600">Transaction ID:</span>
              <span className="font-mono">{orderData.paymentIntentId}</span>
            </div>
          </div>

          <div className="mt-4 md:mt-6">
            <h3 className="font-semibold text-gray-800 mb-2">Order Details</h3>
            <div className="border rounded-lg overflow-hidden overflow-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 md:px-4 py-2 text-left text-xs md:text-sm font-semibold text-gray-600">Item</th>
                    <th className="px-3 md:px-4 py-2 text-right text-xs md:text-sm font-semibold text-gray-600">Qty</th>
                    <th className="px-3 md:px-4 py-2 text-right text-xs md:text-sm font-semibold text-gray-600">Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {orderData.items.map((item, index) => (
                    <tr key={index}>
                      <td className="px-3 md:px-4 py-2 text-xs md:text-sm text-gray-800">{item.title}</td>
                      <td className="px-3 md:px-4 py-2 text-xs md:text-sm text-gray-800 text-right">{item.quantity}</td>
                      <td className="px-3 md:px-4 py-2 text-xs md:text-sm text-gray-800 text-right">₹{item.price}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-gray-50">
                  <tr>
                    <td colSpan="2" className="px-3 md:px-4 py-2 text-right font-semibold text-xs md:text-sm">Total:</td>
                    <td className="px-3 md:px-4 py-2 text-right font-semibold text-xs md:text-sm">₹{orderData.totalAmount}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>

        <div className="border-t px-4 md:px-6 py-3 md:py-4 flex justify-between items-center bg-gray-50 rounded-b-lg">
          <button
            onClick={onClose}
            className="px-3 md:px-4 py-2 text-gray-600 hover:text-gray-800 text-sm md:text-base"
          >
            Close
          </button>
          <div className="flex gap-1 md:gap-2">
            <button
              onClick={downloadPDF}
              className="flex items-center gap-1 md:gap-2 px-3 md:px-4 py-2 bg-blue-600 text-white rounded text-sm md:text-base hover:bg-blue-700"
            >
              <Download className="w-4 h-4" />
              Download
            </button>
            <button
              onClick={printReceipt}
              className="flex items-center gap-1 md:gap-2 px-3 md:px-4 py-2 bg-gray-600 text-white rounded text-sm md:text-base hover:bg-gray-700"
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
