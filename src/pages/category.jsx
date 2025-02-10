import React, { Fragment, useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import useHostname from '@/Components/Provider/HostnameProvider';
import Layout from '@/Components/Layout/Layout';
import { ReactSVG } from 'react-svg';
import 'flag-icons/css/flag-icons.min.css';
import SecTop from '@/Components/Section/SecTop';
import DataCategoryTable from '@/Components/Table/DataCategoryTable';
import ModalAddCategory from '@/Components/Modal/ModalAddCategory';
import axios from 'axios';

const Category = () => {
    const originalUrl = useHostname();

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Fetch categories from the API
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('https://fantasia-shop.com/api/categories');
                console.log('Fetched Categories:', response.data); // Log the response data
                setCategories(response.data); // Assuming the data is under `data.data`
                setLoading(false);
            } catch (error) {
                console.error('Error fetching categories:', error);
                setLoading(false);
            }
        };
    
        fetchCategories();
    }, []);
    

    return (
        <Fragment>
            <Layout title="Category" description="Category Desc" dashboard={true}>
                <ModalAddCategory
                    title="Add Category"
                    onHideClick={handleClose}
                    show={show}
                    onHide={handleClose}
                    dialogClassName="md:mr-0 warpContent custom-min-h"
                    size="md"
                />

                <SecTop title="Category List" subtitle={"Track orders list across your store."}>
                    <div className="flex items-center gap-3">
                        <div
                            onClick={handleShow}
                            className="cursor-pointer inline-block px-3 py-2 rounded-[8px] bg-Mmaincolorgreen text-white"
                        >
                            <div className="flex items-center gap-2">
                                <ReactSVG src={originalUrl + '/images/pluss.svg'} />
                                <p className="font-medium text__14">Add Category</p>
                            </div>
                        </div>
                    </div>
                </SecTop>

                <section className="pt-0 pb-4">
                    <Container>
                        <div className="flex items-center gap-2 px-2 mb-4 w-full">
                            <img src={originalUrl + '/images/search.svg'} alt="" />
                            <input
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                type="text"
                                className="font-medium w-full text__14 placeholder:text-Mtexttextinvert bg-transparent border-none outline-none hover:focus:active:outline-none hover:focus:active:border-none"
                                placeholder="Search order..."
                            />
                        </div>

                        {loading ? (
                            <p>Loading categories...</p>
                        ) : (
                            <DataCategoryTable data={categories} searchTerm={searchTerm} paging={true} info={true} />
                        )}
                    </Container>
                </section>
            </Layout>
        </Fragment>
    );
};

export default Category;
