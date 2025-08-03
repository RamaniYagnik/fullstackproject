import React, { useEffect, useState } from 'react';
import Api from '../../../APIs/BackendApi';
import moment from 'moment';
import displayINRcurrency from '../../../helpers/DisplayCurrency';

const AllOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await fetch(Api.getAllOrders.url, {
        method: Api.getAllOrders.method,
        credentials: 'include',
      });
      const data = await response.json();
      if (data.success) setOrders(data.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(`${Api.updateOrder.url}/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await response.json();
      if (data.success) fetchOrders();
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const handleDelete = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    try {
      const response = await fetch(`${Api.deleteOrder.url}/${orderId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      const data = await response.json();
      if (data.success) fetchOrders();
    } catch (err) {
      console.error('Error deleting order:', err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center">All Orders</h2>

      {orders.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">No orders found</div>
      ) : (
        orders.map((order, idx) => (
          <div key={order._id} className="bg-white rounded shadow p-6 mb-6">
            <h3 className="text-lg font-semibold text-green-600 mb-2">
              Order {order.status === "Delivered" ? "Delivered" : ""}
            </h3>
            <div className="mb-4 p-4 bg-gray-50 rounded">
              <h4 className="font-semibold mb-2">Delivery Information:</h4>
              <p className="text-sm">
                <span className="font-medium">Name:</span> {order.deliveryInfo?.fullName || 'N/A'}
              </p>
              <p className="text-sm">
                <span className="font-medium">Phone:</span> {order.deliveryInfo?.mobile || 'N/A'}
              </p>
              <p className="text-sm">
                <span className="font-medium">Address:</span> {order.deliveryInfo?.houseAddress || 'N/A'}
              </p>
              <p className="text-sm">
                <span className="font-medium">City:</span> {order.deliveryInfo?.city || 'N/A'},
                <span className="font-medium"> State:</span> {order.deliveryInfo?.state || 'N/A'},
                <span className="font-medium"> Pincode:</span> {order.deliveryInfo?.pincode || 'N/A'}
              </p>
              {order.deliveryInfo?.landmark && (
                <p className="text-sm">
                  <span className="font-medium">Landmark:</span> {order.deliveryInfo.landmark}
                </p>
              )}
            </div>
            <p className="text-sm mb-1">
              <span className="font-medium">Order ID:</span> {order.orderId} &nbsp;|&nbsp;
              <span className="font-medium">Payment ID:</span> {order.paymentId}
            </p>
            <p className="text-sm mb-1">
              <span className="font-medium">Date:</span> {moment(order.createdAt).format('LLL')} &nbsp;|&nbsp;
              <span className="font-medium">Status:</span>{' '}
              <span className="text-blue-600 font-semibold">{order.status}</span>
            </p>
            <p className="text-sm mb-3">
              <span className="font-medium">User:</span> {order.user?.email}
            </p>

            <h4 className="font-semibold text-gray-700 mb-2">Ordered Items</h4>
            <div className="space-y-3">
              {order.items.map((item, idx) => (
                <div key={idx} className="border rounded p-3 flex items-center gap-4">

                  <img
                    src={item.product.productImage?.[0]}
                    alt="product"
                    className="w-16 h-16 rounded object-cover"
                  />

                  <div>
                    <p className="font-medium">{item.product?.productName}</p>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                    <p className="text-sm text-gray-600">Total: {displayINRcurrency(item.product?.price * item.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center mt-4">
              <div className="text-sm">
                <span className="font-medium">Total Amount:</span>{' '}
                {displayINRcurrency(order.totalAmount)}
              </div>

              <div className="flex items-center gap-4">
                <select
                  value={order.status}
                  onChange={(e) => handleUpdateStatus(order._id, e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1 text-sm"
                >
                  {["Pending", "Processing", "Shipped", "Delivered", "Cancelled"].map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>

                <button
                  onClick={() => handleDelete(order._id)}
                  className="text-red-600 text-sm hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AllOrders;
