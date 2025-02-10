import React, { Fragment, useState, useEffect } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import useHostname from '@/Components/Provider/HostnameProvider';
import Layout from '@/Components/Layout/Layout';
import SecTop from '@/Components/Section/SecTop';
import { ReactSVG } from 'react-svg';
import { useDropzone } from 'react-dropzone';
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
import axios from 'axios';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const ProductList = () => {
    const originalUrl = useHostname();

    const [productData, setProductData] = useState({
        name: '',
        description: '',
        category_id: '', // Updated field name
        sizeOption: '',
        price: '',
        delivery_and_exchange_policy: '',
        material: '',
        thumbnail: null,
        images: [],
    });
    


    const [categories, setCategories] = useState([]);  // State for categories

    useEffect(() => {
        // Fetch categories from the API
        axios.get('https://fantasia-shop.com/api/categories')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching categories!", error);
            });
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleQuillChange = (value) => {
        setProductData((prevData) => ({
            ...prevData,
            description: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
    
        formData.append('name', productData.name);
        formData.append('description', productData.description);
        formData.append('category_id', productData.category_id); 
        formData.append('sizeOption', productData.sizeOption);
        formData.append('price', productData.price);
        formData.append('delivery_and_exchange_policy', productData.delivery_and_exchange_policy);
        formData.append('material', productData.material);
    
        // Append thumbnail if present
        if (productData.thumbnail) {
            // Check if the thumbnail is a file and append it to formData
            formData.append('thumbnail', productData.thumbnail);
        }
    
        // Append images (if any) to formData
        productData.images.forEach((image, index) => {
            formData.append(`images[${index}]`, image);
        });
    
        const token = localStorage.getItem("token");
        try {
            const response = await axios.post('https://fantasia-shop.com/api/products', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                },
            });
    
            if (response.status === 201) {
                alert('Product added successfully!');
                // Reset the form data after successful submission
                setProductData({
                    name: '',
                    description: '',
                    category_id: '', 
                    sizeOption: '',
                    price: '',
                    delivery_and_exchange_policy: '',
                    material: '',
                    thumbnail: null,
                    images: [],
                });
            }
        } catch (error) {
            console.error('Error submitting the form:', error.response?.data || error.message);
            alert('Failed to submit the product. Please check the input and try again.');
        }
    };
    
    
    const modules = {
        toolbar: [
            ['bold', 'italic', 'underline', { 'list': 'ordered' }, { 'list': 'bullet' }, 'link', 'image'],
        ],
    };

    // Handle thumbnail upload
    const { getRootProps: getThumbnailProps, getInputProps: getThumbnailInputProps } = useDropzone({
        onDrop: (acceptedFiles) => {
            setProductData((prevData) => ({
                ...prevData,
                thumbnail: acceptedFiles[0],
            }));
        },
        accept: 'image/*',
        maxFiles: 1,
    });

    // Handle product images upload
    const { getRootProps: getImagesProps, getInputProps: getImagesInputProps } = useDropzone({
        onDrop: (acceptedFiles) => {
            setProductData((prevData) => ({
                ...prevData,
                images: [...prevData.images, ...acceptedFiles],
            }));
        },
        accept: 'image/*',
        maxFiles: 5,
    });

    return (
        <Fragment>
            <Layout title='Add Product' description='Add Product Desc' dashboard={true}>
                <SecTop title='Add a New Product' subtitle={"Orders placed across your store."}>
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            className="inline-block px-3 py-2 rounded-[8px] bg-white text-Malertserror"
                        >
                            <p className="font-medium text__14">Discard</p>
                        </button>

                        <button
                            type="submit"
                            onClick={handleSubmit}
                            className="inline-block px-3 py-2 rounded-[8px] bg-Mmaincolorgreen text-white"
                        >
                            <div className="flex items-center gap-2">
                                <ReactSVG src={originalUrl + "/images/pluss.svg"} />
                                <p className="font-medium text__14">Add Product</p>
                            </div>
                        </button>
                    </div>
                </SecTop>

                <section className="pt-0 pb-4">
                    <Container>
                        <Row className="gap-y-4">
                            <Col md={6}>
                                <div className="grid grid-cols-1 gap-3">
                                    <h4 className="font-medium text__18">Product Description</h4>
                                    <div className="w-full p-3 border !border-Mborderborderprimary rounded-[12px] grid grid-cols-1 gap-3">
                                        <Form.Group controlId="productName">
                                            <Form.Label className="font-normal text__14 text-[#A3A3A3]">Product Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter Product Name"
                                                name="name"
                                                value={productData.name}
                                                onChange={handleInputChange}
                                                className="font-medium text__14 bg-transparent h-[54px] rounded-[8px] px-3"
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="productDescription">
                                            <Form.Label className="font-normal text__14 text-[#A3A3A3]">Description (Optional)</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter description"
                                                name="description"
                                                value={productData.description}
                                                onChange={handleInputChange}
                                                className="font-medium text__14 bg-transparent h-[54px] rounded-[8px] px-3"
                                            />
                                        </Form.Group>
                                    </div>

                                    <h4 className="font-medium text__18">Category</h4>
                                    <div className="w-full p-3 border !border-Mborderborderprimary rounded-[12px] grid grid-cols-1 gap-3">
                                    <Form.Group controlId="productCategory">
    <Form.Label className="font-normal text__14 text-[#A3A3A3]">Product Category</Form.Label>
    <Form.Select
        name="category_id" // Match the backend field name
        value={productData.category_id || ''} // Ensure it aligns with the backend field
        onChange={handleInputChange}
        className="font-medium text__14 bg-transparent h-[54px] rounded-[8px] px-3"
    >
        <option value="" hidden>Select Category</option> {/* Default hidden option */}
        {categories.map((category) => (
            <option key={category.id} value={category.id}>
                {category.name}
            </option>
        ))}
    </Form.Select>
</Form.Group>


                                    </div>

                                    <h4 className="font-medium text__18">Size</h4>
                                    <div className="w-full p-3 border !border-Mborderborderprimary rounded-[12px] grid grid-cols-1 gap-3">
                                        <Form.Group controlId="sizeOption">
                                            <Form.Label className="font-normal text__14 text-[#A3A3A3]">Option</Form.Label>
                                            <div className="grid grid-cols-4 gap-2">
                                                <Form.Select
                                                    name="sizeOption"
                                                    value={productData.sizeOption}
                                                    onChange={handleInputChange}
                                                    className="font-medium text__14 bg-transparent h-[54px] rounded-[8px] px-3"
                                                >
                                                    <option selected hidden>Select</option>
                                                    <option value="sm">sm</option>
                                                    <option value="md">md</option>
                                                    <option value="lg">lg</option>
                                                    <option value="xl">xl</option>
                                                    <option value="xxl">xxl</option>
                                                </Form.Select>
                                                {/* <Form.Control
                                                    type="text"
                                                    placeholder="Enter Specification"
                                                    name="sizeSpecification"
                                                    value={productData.sizeSpecification}
                                                    onChange={handleInputChange}
                                                    className="font-medium text__14 bg-transparent h-[54px] rounded-[8px] px-3 col-span-3"
                                                /> */}
                                            </div>
                                        </Form.Group>
                                    </div>
                                </div>
                            </Col>
                            <Col md={6}>
                                <div>
                                    <h4 className="font-medium text__18">Thumbnail</h4>
                                    <div
                                        {...getThumbnailProps()}
                                        className="w-full p-3 border border-dashed !border-Mborderborderprimary rounded-[12px] text-center cursor-pointer"
                                    >
                                        <input {...getThumbnailInputProps()} />
                                        {productData.thumbnail ? (
                                            <div>
                                                <p className="text__14 font-medium">
                                                    Uploaded Thumbnail: {productData.thumbnail.name}
                                                </p>
                                                <img
                                                    src={URL.createObjectURL(productData.thumbnail)}
                                                    alt="Thumbnail"
                                                    className="mt-2 w-[100px] h-[100px] object-cover rounded-md"
                                                />
                                            </div>
                                        ) : (
                                            <p className="text__14 text-[#A3A3A3]">Click to upload thumbnail</p>
                                        )}
                                    </div>

                                    <h4 className="font-medium text__18">Product Images</h4>
                                    <div
                                        {...getImagesProps()}
                                        className="w-full p-3 border border-dashed !border-Mborderborderprimary rounded-[12px] text-center cursor-pointer"
                                    >
                                        <input {...getImagesInputProps()} />
                                        {productData.images.length > 0 ? (
                                            <div className="mt-2 grid grid-cols-3 gap-2">
                                                {productData.images.map((file, index) => (
                                                    <div key={index} className="text-center">
                                                        <img
                                                            src={URL.createObjectURL(file)}
                                                            alt={`Product Image ${index + 1}`}
                                                            className="w-[80px] h-[80px] object-cover rounded-md"
                                                        />
                                                        <p className="text__14 font-medium">{file.name}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text__14 text-[#A3A3A3]">Click to upload images</p>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-3">
                                    <h4 className="font-medium text__18">Pricing</h4>
                                    <div className="w-full p-3 border !border-Mborderborderprimary rounded-[12px] grid grid-cols-1 gap-3">
                                        <Form.Group controlId="productPrice">
                                            <Form.Label className="font-normal text__14 text-[#A3A3A3]">Price</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter Price"
                                                name="price"
                                                value={productData.price}
                                                onChange={handleInputChange}
                                                className="font-medium text__14 bg-transparent h-[54px] rounded-[8px] px-3"
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="ShippingandDelivery">
    <Form.Label className="font-normal text__14 text-[#A3A3A3]">Shipping and Delivery</Form.Label>
    <Form.Control
        type="text"
        placeholder="Enter Shipping and Delivery"
        name="delivery_and_exchange_policy"  // updated name
        value={productData.delivery_and_exchange_policy}
        onChange={handleInputChange}
        className="font-medium text__14 bg-transparent h-[54px] rounded-[8px] px-3"
    />
</Form.Group>

                                        <Form.Group controlId="material">
                                            <Form.Label className="font-normal text__14 text-[#A3A3A3]">Material</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter material"
                                                name="material"
                                                value={productData.material}
                                                onChange={handleInputChange}
                                                className="font-medium text__14 bg-transparent h-[54px] rounded-[8px] px-3"
                                            />
                                        </Form.Group>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </Layout>
        </Fragment>
    );
};

export default ProductList;
