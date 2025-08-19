import React, { useState } from 'react';
import { Search, Wrench, Eye, Phone, Mail } from 'lucide-react';
import { useInventory } from '../../contexts/InventoryContext';
import { useAuth } from '../../contexts/AuthContext';
import { ServiceRequest } from '../../types';

export const ServiceManagement: React.FC = () => {
  const { serviceRequests, updateServiceStatus } = useInventory();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(null);
  const [showRequestModal, setShowRequestModal] = useState(false);

  const isAdminOrStaff = user?.role === 'admin' || user?.role === 'staff';
  
  // Filter service requests based on user role
  const userServiceRequests = isAdminOrStaff 
    ? serviceRequests 
    : serviceRequests.filter(r => r.customerId === user?.id);

  const filteredRequests = userServiceRequests.filter(request => {
    const matchesSearch = request.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.deviceType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.issue.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === '' || request.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const handleStatusChange = (requestId: string, newStatus: ServiceRequest['status']) => {
    updateServiceStatus(requestId, newStatus);
  };

  const viewRequestDetails = (request: ServiceRequest) => {
    setSelectedRequest(request);
    setShowRequestModal(true);
  };

  const getStatusColor = (status: ServiceRequest['status']) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const RequestDetailModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Service Request Details</h3>
          <button
            onClick={() => setShowRequestModal(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <span className="sr-only">Close</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {selectedRequest && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Request ID</label>
                <p className="text-sm text-gray-900">#{selectedRequest.id}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Customer Name</label>
                <p className="text-sm text-gray-900">{selectedRequest.customerName}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <div className="flex items-center space-x-1">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <p className="text-sm text-gray-900">{selectedRequest.email}</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <div className="flex items-center space-x-1">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <p className="text-sm text-gray-900">{selectedRequest.phone}</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Device Type</label>
                <p className="text-sm text-gray-900">{selectedRequest.deviceType}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Issue Type</label>
                <p className="text-sm text-gray-900">{selectedRequest.issue}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Request Date</label>
                <p className="text-sm text-gray-900">
                  {new Date(selectedRequest.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedRequest.status)}`}>
                  {selectedRequest.status}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Problem Description</label>
              <div className="p-3 bg-gray-50 rounded-md">
                <p className="text-sm text-gray-900">{selectedRequest.description}</p>
              </div>
            </div>

            {isAdminOrStaff && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Update Status</label>
                <select
                  value={selectedRequest.status}
                  onChange={(e) => {
                    handleStatusChange(selectedRequest.id, e.target.value as ServiceRequest['status']);
                    setSelectedRequest({ ...selectedRequest, status: e.target.value as ServiceRequest['status'] });
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {statusOptions.slice(1).map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          {isAdminOrStaff ? 'Service Request Management' : 'My Service Requests'}
        </h1>
        <p className="text-gray-600 mt-2">
          {isAdminOrStaff ? 'Manage customer service requests and repairs' : 'View and track your service requests'}
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder={isAdminOrStaff ? "Search requests, customers, or devices..." : "Search your service requests..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        >
          {statusOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>

      {/* Service Requests Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Request ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Device
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Issue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRequests.map((request) => (
                <tr key={request.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #{request.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {request.customerName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {request.deviceType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {request.issue}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(request.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {isAdminOrStaff ? (
                      <select
                        value={request.status}
                        onChange={(e) => handleStatusChange(request.id, e.target.value as ServiceRequest['status'])}
                        className={`text-xs font-semibold rounded-full px-2 py-1 border-0 ${getStatusColor(request.status)}`}
                      >
                        {statusOptions.slice(1).map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(request.status)}`}>
                        {request.status.replace('-', ' ')}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => viewRequestDetails(request)}
                      className="text-blue-600 hover:text-blue-900 flex items-center space-x-1"
                    >
                      <Eye className="h-4 w-4" />
                      <span>View</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredRequests.length === 0 && (
        <div className="text-center py-12">
          <Wrench className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">
            {isAdminOrStaff ? 'No service requests found' : 'You have no service requests yet'}
          </p>
        </div>
      )}

      {/* Service Request Detail Modal */}
      {showRequestModal && <RequestDetailModal />}
    </div>
  );
};