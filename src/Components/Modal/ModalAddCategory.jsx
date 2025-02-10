import React, { Fragment, useCallback, useState } from 'react';
import { Modal, Form, Spinner } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

const ModalAddCategory = ({ onHideClick, title, ...props }) => {
  const [content, setContent] = useState('');
  const [name, setName] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (value) => {
    setContent(value);
  };

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', { list: 'ordered' }, { list: 'bullet' }, 'link', 'image'],
    ],
  };

  const onDrop = useCallback((acceptedFiles) => {
    setThumbnail(acceptedFiles[0]); // Save the first selected file
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
  });

  const handleSubmit = async () => {
    if (!name || !thumbnail) {
      alert('Please provide a name and a thumbnail!');
      return;
    }
  
    setLoading(true);
  
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', content);
    formData.append('thumbnail', thumbnail);
  

    const token = localStorage.getItem("token");
  
    // Log the request body and token
    console.log('Request Body:');
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
  
    console.log('Authorization Header: Bearer ' + token);
  
    try {
      const response = await fetch('https://fantasia-shop.com/api/categories', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      // Check if the response is OK
      if (response.ok) {
        alert('Category added successfully!');
        onHideClick();
      } else {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        alert(`Failed to add category: ${errorData.message || 'Unknown error'}`);
      }
      window.location.reload();

    } catch (error) {
      console.error('Error submitting category:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <Fragment>
      {/* Modal */}
      <Modal {...props}>
        <Modal.Body>
          <div className="border-b !border-Mborderborderprimary p-3">
            <h4 className="font-semibold text__20">{title}</h4>
          </div>
          <div className="p-4">
            <div className="w-full p-3 border !border-Mborderborderprimary rounded-[12px] grid grid-cols-1 gap-3">
              {/* Thumbnail Upload */}
              <div
                className="w-full min-h-[240px] rounded-[12px] border !border-dashed !border-Msurfacesurfacebrand bg-Msurfacesurfacesecondary flex items-center justify-center text-center"
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center justify-center">
                  <img
                    src="/images/FileImage.svg"
                    alt="Upload Icon"
                    className="w-10 h-10 mb-3"
                  />
                  {isDragActive ? (
                    <p className="text__12 text-Mtexttextinvert">Drop the files here...</p>
                  ) : (
                    <>
                      <p className="text__12 text-Mtexttextinvert mb-3">
                        Drag and drop your image <br /> here...
                      </p>
                      <p className="text-Mtexttextbrand font-medium text__14 mt-2">
                        Click to upload
                      </p>
                    </>
                  )}
                </div>
              </div>

              {/* Name Input */}
              <Form.Group controlId="formName">
                <Form.Label className="font-normal text__14 text-[#A3A3A3]">
                  Product Name
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Product Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="font-medium text__14 bg-transparent h-[54px] rounded-[8px] px-3 outline-none shadow-none border-Mborderborderprimary"
                />
              </Form.Group>

              {/* Description */}
              <Form.Group controlId="formDescription">
                <Form.Label className="font-normal text__14 text-[#A3A3A3]">
                  Description (Optional)
                </Form.Label>
                <ReactQuill
                  value={content}
                  onChange={handleChange}
                  placeholder="Enter Description"
                  modules={modules}
                  className="textareaStyle hCategory flex flex-col-reverse"
                />
              </Form.Group>

              {/* Submit Buttons */}
              <div className="mt-4 flex items-center gap-2 justify-end">
                <button
                  onClick={onHideClick}
                  className="cursor-pointer px-3 py-2 rounded-[8px] bg-white text-Malertserror"
                >
                  Discard
                </button>
                <button
                  onClick={handleSubmit}
                  className="cursor-pointer px-3 py-2 rounded-[8px] bg-Mmaincolorgreen text-white"
                  disabled={loading}
                >
                  {loading ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    'Add Category'
                  )}
                </button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      {/* Modal */}
    </Fragment>
  );
};

export default ModalAddCategory;
