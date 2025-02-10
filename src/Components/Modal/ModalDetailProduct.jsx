import React, { useState } from 'react';
import { Col, Container, Modal, Row } from 'react-bootstrap';
import useHostname from '../Provider/HostnameProvider';

const ModalDetailProduct = ({ onHideClick, order, ...props }) => {
  const originalUrl = useHostname();
  const [selectedStatus, setSelectedStatus] = useState(order?.status || '');

  if (!order) return null;

  const handleStatusChange = async (event) => {
    const newStatus = event.target.value;
    setSelectedStatus(newStatus);

    // Retrieve the token from local storage (or wherever it's stored)
    const token = localStorage.getItem('token'); // Replace 'authToken' with your actual token key

    try {
      const response = await fetch(`https://fantasia-shop.com/api/orders/${order.id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
        body: JSON.stringify({ status: newStatus }),
        });
        console.log(response.status);

      if (!response.ok) {

        throw new Error('Failed to update status');
      }
      // Optionally, you can update the local state or trigger a refetch of the order details
      console.log('Status updated successfully');
      window.location.reload();
    } catch (error) {
      console.error('Error updating status:', error);
      // Revert the status change in the UI if the API call fails
      setSelectedStatus(order.status);
    }
  };

  return (
    <>
      <Modal {...props}>
        <Modal.Body>
          {/* Header */}
          <div className="border-b !border-Mborderborderprimary p-3">
            <Container>
              <div className="flex items-center justify-between py-2">
                <h4 className="font-semibold text__20">Order Details</h4>
                <img
                  className="cursor-pointer"
                  onClick={onHideClick}
                  src={`${originalUrl}/images/asdas.svg`}
                  alt="Close"
                />
              </div>
            </Container>
          </div>

          {/* Modal Content */}
          <div className="p-4">
            <Row className="gap-y-4">
              {/* Customer Details */}
              <Col md={6}>
                <h5 className="font-medium text__18 mb-3">Customer Details</h5>
                <div className="w-full p-3 border !border-Mborderborderprimary rounded-[12px] grid grid-cols-1 gap-3">
                  <div className="flex items-center gap-2">
                    {/* <img
                      src={`${originalUrl}/images/sdasd.png`}
                      className="w-[48px] h-[48px] rounded-full object-cover"
                      alt="Customer"
                    /> */}
                    <div>
                      <h5 className="font-medium text__16">{order.customer.name}</h5>
                      <p className="text__14 text-Mtexttextsecondary">
                        Customer ID: #{order.id}
                      </p>
                    </div>
                  </div>

                  
                </div>


                  {/* Order Items */}
                  {order.items?.length > 0 ? (
                    order.items.map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <img
                          src={item.product.thumbnail}
                          className="w-[80px] h-[80px] overflow-hidden rounded-[6px]"
                          alt={item.name}
                        />
                        <div className="grid grid-cols-1 gap-y-1">
                          <h4 className="font-medium text__16">{item.name}</h4>
                          <h4 className="font-medium text__16">{item.product.name}</h4>
                          <h4 className=" text__16">{item.price}</h4>
                          <div className="flex items-center gap-2 ss:gap-3 flex-wrap ss:flex-nowrap">
                            <div className="flex items-center gap-1">
                              <p className="text__14 text-Mtexttextinvert">Qty:</p>
                              <p className="text__14">{item.quantity}</p>
                            </div>
                            <div className="flex items-center gap-1">
                              <p className="text__14 text-Mtexttextinvert">Size:</p>
                              <p className="text__14">{item.product.size || 'N/A'}</p>
                            </div>
                            {/* <div className="flex items-center gap-1">
                              <p className="text__14 text-Mtexttextinvert">Color:</p>
                              <p className="text__14">{item.color || 'N/A'}</p>
                            </div> */}
                          </div>
                          
                        </div>
                        
                      </div>
                    ))
                  ) : (
                    <p className="text-muted">No items in this order</p>
                  )}


<div className="flex items-center gap-1 py-8">
                              <p className="text__14 text-Mtexttextinvert">Total price</p>
                              <p className="text__14">{order.total}</p>
                            </div>
              </Col>



              {/* Delivery and Shipping */}
              <Col md={6}>
                <div className="grid grid-cols-1 gap-3">
                  <h5 className="font-medium text__18">Delivery</h5>
                  <div className="w-full p-3 border !border-Mborderborderprimary rounded-[12px]">
                    <Row>
                      <Col md={6}>
                        <h5 className="font-medium text__18">Contact</h5>
                        <div className="flex items-center gap-2">
                          <img
                            src={`${originalUrl}/images/EnvelopeSimple.svg`}
                            alt="Email"
                          />
                          <p className="text__14">{order.customer.email}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <img
                            src={`${originalUrl}/images/Phone.svg`}
                            alt="Phone"
                          />
                          <p className="text__14">{order.phone}</p>
                        </div>
                      </Col>
                      <Col md={6}>
                        <h5 className="font-medium text__18">Shipping Address</h5>
                        <p className="text__14">{order.customer.name}</p>
                        <p className="text__14">{order.address_1}</p>
                        {/* <p className="text__14">{order.address_2 || 'N/A'}</p> */}
                        <p className="text__14">
                          {order.city}, {order.state}
                        </p>
                      </Col>
                    </Row>
                  </div>

                  {/* Status Dropdown */}
                  <div className="w-full p-3 border !border-Mborderborderprimary rounded-[12px]">
                    <h5 className="font-medium text__18 mb-3">Order Status</h5>
                    <select
                      value={selectedStatus}
                      onChange={handleStatusChange}
                      className="form-select"
                    >
                      <option value="received">Received</option>
                      <option value="preparing">Preparing</option>
                      <option value="shipping">Shipping</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalDetailProduct;