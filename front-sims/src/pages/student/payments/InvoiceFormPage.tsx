
import React, { useState } from 'react';
import { 
  PlusCircle, 
  Save, 
  Printer, 
  Download, 
  X,
  FileText,
  User,
  BookOpen,
  Calendar,
  ChevronDown,
  CheckCircle,
  Circle
} from 'lucide-react';

const InvoiceFormPage: React.FC = () => {
  const [activeFeeType, setActiveFeeType] = useState('other');
  const [formData, setFormData] = useState({
    customerName: '',
    programme: '',
    class: '',
    expireDate: '',
    description: ''
  });
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  
  // Mock data for items
  const items = [
    { id: 1, code: '142301120001', name: 'Progress report', description: 'Provisional Results for 1 Year', amount: 2000.00 },
    { id: 2, code: '', name: '', description: 'Provisional Results for 2 Years', amount: 4000.00 },
    { id: 3, code: '', name: '', description: 'Provisional Results for 4 Years', amount: 8000.00 },
    { id: 4, code: '142202120147', name: 'Appeal', description: '', amount: 5000.00 },
    { id: 5, code: '142202120366', name: 'Provisional statement of results', description: '', amount: 8000.00 },
    { id: 6, code: '142201020046', name: 'TRANSCRIPT FEE', description: '', amount: 10000.00 },
    { id: 7, code: '142201290009', name: 'IDENTITY CARD', description: 'Replacement', amount: 5000.00 }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleItemSelection = (id: number) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(itemId => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const calculateTotal = () => {
    return items
      .filter(item => selectedItems.includes(item.id))
      .reduce((sum, item) => sum + item.amount, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Invoice created successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center">
              <FileText className="mr-2 text-blue-600" size={24} />
              Add/Edit Invoice
            </h1>
            <p className="text-gray-600">Manage university financial transactions</p>
          </div>
          <div className="flex space-x-2">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center">
              <Save className="mr-2" size={18} />
              Save Draft
            </button>
            <button className="bg-white text-blue-600 border border-blue-200 hover:bg-blue-50 px-4 py-2 rounded-lg flex items-center">
              <X className="mr-2" size={18} />
              Cancel
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Action Menu */}
          <div className="lg:w-1/4 bg-white rounded-xl shadow-sm border border-gray-200 p-4 h-fit">
            <h2 className="font-semibold text-gray-700 mb-3">ACTION MENU</h2>
            <ul className="space-y-2">
              {['Tuition Fee', 'Meals Fee', 'Carry/Retake/Repeater Fee', 'Other Fee'].map((fee, index) => (
                <li key={index}>
                  <button
                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center justify-between transition-colors ${
                      activeFeeType === fee.toLowerCase().replace(/\s+/g, '-')
                        ? 'bg-blue-100 text-blue-700 border border-blue-200'
                        : 'hover:bg-gray-100'
                    }`}
                    onClick={() => setActiveFeeType(fee.toLowerCase().replace(/\s+/g, '-'))}
                  >
                    <span className="font-medium">{fee}</span>
                    <ChevronDown size={18} />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Main Form */}
          <div className="lg:w-3/4">
            {/* Fee Details Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <h2 className="font-semibold text-xl text-gray-800 mb-4 flex items-center">
                {activeFeeType === 'other' ? 'Other Fee' : activeFeeType.replace(/-/g, ' ')}
                <span className="ml-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  {activeFeeType === 'other' ? 'Custom' : 'Standard'}
                </span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="customerName"
                      value={formData.customerName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter customer name"
                    />
                    <User className="absolute right-3 top-2.5 text-gray-400" size={18} />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Programme</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="programme"
                      value={formData.programme}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Select programme"
                    />
                    <BookOpen className="absolute right-3 top-2.5 text-gray-400" size={18} />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
                  <input
                    type="text"
                    name="class"
                    value={formData.class}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter class"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expire Date</label>
                  <div className="relative">
                    <input
                      type="date"
                      name="expireDate"
                      value={formData.expireDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <Calendar className="absolute right-3 top-2.5 text-gray-400" size={18} />
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter description"
                />
              </div>
            </div>

            {/* Items Selection Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-xl text-gray-800">Select Item</h2>
                <button className="text-blue-600 hover:text-blue-800 flex items-center">
                  <PlusCircle className="mr-1" size={18} />
                  Add Custom Item
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item Code</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item Name</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount (TZS)</th>
                      <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Pick</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {items.map((item) => (
                      <tr 
                        key={item.id} 
                        className={`hover:bg-gray-50 cursor-pointer ${
                          selectedItems.includes(item.id) ? 'bg-blue-50' : ''
                        }`}
                        onClick={() => toggleItemSelection(item.id)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.code || '-'}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {item.name || '-'}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {item.description || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                          {selectedItems.includes(item.id) ? (
                            <CheckCircle className="text-green-500 mx-auto" size={20} />
                          ) : (
                            <Circle className="text-gray-300 mx-auto" size={20} />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Summary and Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div className="mb-4 md:mb-0">
                  <h3 className="font-semibold text-lg text-gray-800">Invoice Summary</h3>
                  <p className="text-gray-600">
                    {selectedItems.length} items selected | Total: TZS {calculateTotal().toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <button 
                    className="bg-white border border-blue-200 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg flex items-center"
                  >
                    <Printer className="mr-2" size={18} />
                    Print Preview
                  </button>
                  <button 
                    className="bg-white border border-blue-200 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg flex items-center"
                  >
                    <Download className="mr-2" size={18} />
                    Download PDF
                  </button>
                  <button 
                    onClick={handleSubmit}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center"
                  >
                    <PlusCircle className="mr-2" size={18} />
                    Create Invoice
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceFormPage;