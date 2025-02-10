import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button, Form } from 'react-bootstrap';

const EditProductModal = ({ product, onClose, onSave }) => {
  const [name, setName] = useState(product.product.title);
  const [description, setDescription] = useState(product.product.subTitle);
  const [price, setPrice] = useState(product.price.replace('$', ''));
  const [category, setCategory] = useState(product.category);

  const handleSave = () => {
    const updatedProduct = {
      ...product,
      product: {
        ...product.product,
        title: name,
        subTitle: description,
      },
      price: `$${price}`,
      category,
    };
    onSave(updatedProduct); // Pass updated product to parent component
  };

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formProductName">
            <Form.Label>Product Name</Form.Label>
            <Form.Control 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
            />
          </Form.Group>
          <Form.Group controlId="formProductDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control 
              type="text" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
            />
          </Form.Group>
          <Form.Group controlId="formProductPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control 
              type="number" 
              value={price} 
              onChange={(e) => setPrice(e.target.value)} 
            />
          </Form.Group>
          <Form.Group controlId="formProductCategory">
            <Form.Label>Category</Form.Label>
            <Form.Control 
              type="text" 
              value={category} 
              onChange={(e) => setCategory(e.target.value)} 
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditProductModal;
