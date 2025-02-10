import React, { Fragment, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Link from 'next/link'
import useHostname from '@/Components/Provider/HostnameProvider'
import Layout from '@/Components/Layout/Layout'
import { ReactSVG } from 'react-svg'
import 'flag-icons/css/flag-icons.min.css';
import CartRevenue from '@/Components/Chart/CartRevenue'
import DataCustomTable from '@/Components/Table/DataCustomTable'
import SecTop from '@/Components/Section/SecTop'

const Index = () => {
    const originalUrl = useHostname();

    const dataTable = [
        {
            id: 1,
            order: '#345918',
            date: 'Apr 15, 2024, 10:21',
            customer: {
                img: originalUrl + "/images/sdasd.png", // Replace with actual image path
                name: "Ahmad Lipshutz",
                email: "ahmadlipshutz@gmail.com",
            },
            payment: 'Successful',
            status: 'Scheduled',
            method: {
                img: originalUrl + "/images/logos_mastercard.png",
                type: "Credit Card",
                info: "12323453234",
            }
        },
        {
            id: 2,
            order: '#345817',
            date: 'Apr 15, 2024, 10:21',
            customer: {
                img: originalUrl + "/images/sdasd.png", // Replace with actual image path
                name: "Kadin Kenter",
                email: "kadinkenter@gmail.com",
            },
            payment: 'Successful',
            status: 'Scheduled',
            method: {
                img: originalUrl + "/images/logos_paypal.png",
                type: "PayPal",
                info: "kadinkenter@gmail.com",
            }
        },
        {
            id: 3,
            order: '#345716',
            date: 'Apr 15, 2024, 10:21',
            customer: {
                img: originalUrl + "/images/sdasd.png",// Replace with actual image path
                name: "Ryan Mango",
                email: "ryanmango@gmail.com",
            },
            payment: 'Successful',
            status: 'Cancel',
            method: {
                img: originalUrl + "/images/logos_mastercard.png",
                type: "Credit Card",
                info: "12323453234",
            }
        },
        {
            id: 4,
            order: '#345615',
            date: 'Apr 15, 2024, 10:21',
            customer: {
                img: originalUrl + "/images/sdasd.png", // Replace with actual image path
                name: "Charlie Botosh",
                email: "charliebotosh@gmail.com",
            },
            payment: 'Successful',
            status: 'Delivered',
            method: {
                img: originalUrl + "/images/logos_paypal.png",
                type: "PayPal",
                info: "charliebotosh@gmail.com",
            }
        },
        {
            id: 5,
            order: '#345614',
            date: 'Apr 15, 2024, 10:21',
            customer: {
                img: originalUrl + "/images/sdasd.png",// Replace with actual image path
                name: "Phillip Culhane",
                email: "phillipculhane@gmail.com",
            },
            payment: 'Successful',
            status: 'Delivered',
            method: {
                img: originalUrl + "/images/logos_paypal.png",
                type: "PayPal",
                info: "phillipculhane@gmail.com",
            }
        },
        {
            id: 6,
            order: '#345613',
            date: 'Apr 15, 2024, 10:21',
            customer: {
                img: originalUrl + "/images/sdasd.png", // Replace with actual image path
                name: "Adison Schleifer",
                email: "adisonschleifer@gmail.com",
            },
            payment: 'Successful',
            status: 'Delivered',
            method: {
                img: originalUrl + "/images/logos_mastercard.png",
                type: "Credit Card",
                info: "12323453234",
            }
        },
        {
            id: 7,
            order: '#345612',
            date: 'Apr 15, 2024, 10:21',
            customer: {
                img: originalUrl + "/images/sdasd.png", // Replace with actual image path
                name: "Giana Aminoff",
                email: "gianaaminoff@gmail.com",
            },
            payment: 'Successful',
            status: 'Delivered',
            method: {
                img: originalUrl + "/images/logos_paypal.png",
                type: "PayPal",
                info: "gianaaminoff@gmail.com",
            }
        }
    ];
    return (
        <Fragment>
            <Layout title='Shotify' description='Shotify Desc' dashboard={true} >


                <SecTop />

                <section className='pt-0 pb-4'>
                    <Container>
                        <div className='grid grid-cols-2 xl:grid-cols-4 gap-3 ss:gap-4'>
                            <div >
                                <div className="p-3 xs:p-4 border !border-Mborderborderprimary w-full rounded-[8px]">
                                    <div className="flex items-center gap-2 ss:gap-3 mb-4">
                                        <div className="flex items-center justify-center w-[38px] ss:w-[44px] md:w-[56px] h-[38px] ss:h-[44px] md:h-[56px] rounded-full bg-Msurfacesurfacesecondary border !border-Mborderborderprimary">
                                            <img src={originalUrl + "/images/icc (3).svg"} className='w-[24px] md:w-auto' alt="" />
                                        </div>
                                        <p className='text__16 text-Mtexttextsecondary'>Total Sales</p>
                                    </div>
                                    <h4 className='font-semibold text__24 mb-2'>120,452</h4>
                                    <div className="flex items-center gap-2 xs:flex-nowrap flex-wrap">
                                        <div className="flex items-center gap-2 px-2 py-1 rounded bg-[#EFFBF2]">
                                            <img src={originalUrl + "/images/arrow-up.svg"} alt="" />
                                            <p className='font-medium text__14 text-Malertssucces'>80%</p>
                                        </div>
                                        <p className='text__14 text-Mtexttextinvert xs:w-auto w-full'>vs last 7 days</p>
                                    </div>
                                </div>
                            </div>
                            <div >
                                <div className="p-3 xs:p-4 border !border-Mborderborderprimary w-full rounded-[8px]">
                                    <div className="flex items-center gap-2 ss:gap-3 mb-4">
                                        <div className="flex items-center justify-center w-[38px] ss:w-[44px] md:w-[56px] h-[38px] ss:h-[44px] md:h-[56px] rounded-full bg-Msurfacesurfacesecondary border !border-Mborderborderprimary">
                                            <img src={originalUrl + "/images/icc (2).svg"} className='w-[24px] md:w-auto' alt="" />
                                        </div>
                                        <p className='text__16 text-Mtexttextsecondary'>Customers</p>
                                    </div>
                                    <h4 className='font-semibold text__24 mb-2'>21,675.01</h4>
                                    <div className="flex items-center gap-2 xs:flex-nowrap flex-wrap">
                                        <div className="flex items-center gap-2 px-2 py-1 rounded bg-[#EFFBF2]">
                                            <img src={originalUrl + "/images/arrow-up.svg"} alt="" />
                                            <p className='font-medium text__14 text-Malertssucces'>90%</p>
                                        </div>
                                        <p className='text__14 text-Mtexttextinvert xs:w-auto w-full'>vs last 7 days</p>
                                    </div>
                                </div>
                            </div>
                            <div >
                                <div className="p-3 xs:p-4 border !border-Mborderborderprimary w-full rounded-[8px]">
                                    <div className="flex items-center gap-2 ss:gap-3 mb-4">
                                        <div className="flex items-center justify-center w-[38px] ss:w-[44px] md:w-[56px] h-[38px] ss:h-[44px] md:h-[56px] rounded-full bg-Msurfacesurfacesecondary border !border-Mborderborderprimary">
                                            <img src={originalUrl + "/images/icc (1).svg"} className='w-[24px] md:w-auto' alt="" />
                                        </div>
                                        <p className='text__16 text-Mtexttextsecondary'>Product</p>
                                    </div>
                                    <h4 className='font-semibold text__24 mb-2'>1.423</h4>
                                    <div className="flex items-center gap-2 xs:flex-nowrap flex-wrap">
                                        <div className="flex items-center gap-2 px-2 py-1 rounded bg-[#EFFBF2]">
                                            <img src={originalUrl + "/images/arrow-up.svg"} alt="" />
                                            <p className='font-medium text__14 text-Malertssucces'>88%</p>
                                        </div>
                                        <p className='text__14 text-Mtexttextinvert xs:w-auto w-full'>vs last 7 days</p>
                                    </div>
                                </div>
                            </div>
                            <div >
                                <div className="p-3 xs:p-4 border !border-Mborderborderprimary w-full rounded-[8px]">
                                    <div className="flex items-center gap-2 ss:gap-3 mb-4">
                                        <div className="flex items-center justify-center w-[38px] ss:w-[44px] md:w-[56px] h-[38px] ss:h-[44px] md:h-[56px] rounded-full bg-Msurfacesurfacesecondary border !border-Mborderborderprimary">
                                            <img src={originalUrl + "/images/icc (4).svg"} className='w-[24px] md:w-auto' alt="" />
                                        </div>
                                        <p className='text__16 text-Mtexttextsecondary'>Revenue</p>
                                    </div>
                                    <h4 className='font-semibold text__24 mb-2'>$220,745,00</h4>
                                    <div className="flex items-center gap-2 xs:flex-nowrap flex-wrap">
                                        <div className="flex items-center gap-2 px-2 py-1 rounded bg-[#EFFBF2]">
                                            <img src={originalUrl + "/images/arrow-up.svg"} alt="" />
                                            <p className='font-medium text__14 text-Malertssucces'>88%</p>
                                        </div>
                                        <p className='text__14 text-Mtexttextinvert xs:w-auto w-full'>vs last 7 days</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Container>
                </section>

                <section className='pt-0 pb-4'>
                    <Container>
                        <Row className='gap-y-4'>
                            <Col md={8}>
                                <CartRevenue />
                            </Col>
                            <Col md={4} className='flex-fill'>
                                <div className="h-full p-4 border !border-Mborderborderprimary w-full rounded-[8px] flex flex-col justify-between">
                                    <h4 className='font-semibold text__20 w-full'>Customer Growth</h4>

                                    {
                                        [
                                            {
                                                name: "United States",
                                                percent: "56.2%"
                                            },
                                            {
                                                name: "Brazil",
                                                percent: "40.2%"
                                            },
                                            {
                                                name: "Qatar",
                                                percent: "35.8%"
                                            },
                                            {
                                                name: "India",
                                                percent: "21.7%"
                                            },
                                            {
                                                name: "China",
                                                percent: "12.3%"
                                            },
                                            {
                                                name: "Australia",
                                                percent: "8.2%"
                                            },
                                        ].map((obj) => {
                                            return <div className="w-full">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <img src={originalUrl + "/api/flags/" + obj.name} alt="US Flag" className='w-[24px] h-[24px] rounded-full relative object-cover' />
                                                    <p className='font-medium text__14'>{obj.name}</p>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <div className="w-full relative rounded-full h-[8px] bg-Msurfacesurfacetertiary overflow-hidden">
                                                        <div className="absolute left-0 top-0 h-full rounded-full bg-Msurfacesurfacebrand" style={{ width: obj.percent }}></div>
                                                    </div>
                                                    <p className='font-medium text__14'>{obj.percent}</p>
                                                </div>
                                            </div>
                                        })
                                    }

                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>

                {/* <section className='pt-0 pb-4'>
                    <Container>
                        <div className="mb-4">
                            <h3 className='font-semibold text__20 mb-2'>Order List</h3>
                            <p className='text__14 text-Mtexttextsecondary'>Track orders list across your store.</p>
                        </div>
                        <DataCustomTable data={dataTable} />
                    </Container>
                </section> */}

            </Layout>

        </Fragment>
    )
}

export default Index