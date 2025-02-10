import React, { Fragment, useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Container } from 'react-bootstrap';
import useHostname from '../Provider/HostnameProvider';
import Link from 'next/link';
import { ReactSVG } from 'react-svg';
import ModalLogout from '../Modal/ModalLogout';

const MenuProfile = ({ toogleMenuProfile, originalUrl, handleShow, addClass, settoogleMenuProfile }) => {
    return (
        <div className={addClass}>
            <div className={"absolute w-full ss:w-[350px] px-4 pt-2 ss:!pt-[1.5rem] pb-4 bg-white left-0 ss:left-auto ss:right-[15px] rounded-[16px] shadow-[0px_12px_16px_-4px_rgba(16,24,40,0.08),0px_4px_6px_-2px_rgba(16,24,40,0.03)] transition-all duration-300 flex flex-wrap gap-3 " + (toogleMenuProfile ? "top-[60px] opacity-100" : "top-[10rem] opacity-0 pointer-events-none")}>
                <Link href='/setting/profile' onClick={() => settoogleMenuProfile(!toogleMenuProfile)} className="inline-block w-full">
                    <div className="flex items-center gap-2">
                        <div className={"text-Mgray800"}>
                            <ReactSVG src={originalUrl + "/images/pc (3).svg"} />
                        </div>
                        <p className='font-medium text__16'>Profile</p>
                    </div>
                </Link>
                <div className="w-full h-[1px] bg-Mborderborderprimary"></div>
                <Link href='/setting' onClick={() => settoogleMenuProfile(!toogleMenuProfile)} className="inline-block w-full">
                    <div className="flex items-center gap-2">
                        <div className={"text-Mgray800"}>
                            <ReactSVG src={originalUrl + "/images/pc (5).svg"} />
                        </div>
                        <p className='font-medium text__16'>Setting</p>
                    </div>
                </Link>
                <div className="w-full h-[1px] bg-Mborderborderprimary"></div>
                <Link href={{
                    pathname: '/setting/profile',
                    query: { url: "Billing & Plans" },
                }}
                    onClick={() => settoogleMenuProfile(!toogleMenuProfile)} className="inline-block w-full">
                    <div className="flex items-center gap-2">
                        <div className={"text-Mgray800"}>
                            <ReactSVG src={originalUrl + "/images/pc (4).svg"} />
                        </div>
                        <p className='font-medium text__16'>Billing</p>
                    </div>
                </Link>
                <div className="w-full h-[1px] bg-Mborderborderprimary"></div>
                <a href='#!' onClick={() => settoogleMenuProfile(!toogleMenuProfile)} className="inline-block w-full">
                    <div className="flex items-center gap-2">
                        <div className={"text-Mgray800"}>
                            <ReactSVG src={originalUrl + "/images/pc (1).svg"} />
                        </div>
                        <p className='font-medium text__16'>FAQ</p>
                    </div>
                </a>
                <div className="w-full h-[1px] bg-Mborderborderprimary"></div>
                <div onClick={handleShow} className="cursor-pointer inline-block w-full">
                    <div className="flex items-center gap-2">
                        <div className={"text-Mgray800"}>
                            <ReactSVG src={originalUrl + "/images/pc (2).svg"} />
                        </div>
                        <p className='font-medium text__16'>Log Out</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Layout = ({ children, title = "Shotify", description = "Shotify Desc", navbar = true, footer = true, dashboard = false }) => {
    const originalUrl = useHostname();
    const router = useRouter();
    const isActive = (path) => router.pathname.startsWith(path);
    const [toogleMenuProfile, settoogleMenuProfile] = useState(false);
    const [toogleSideMenu, settoogleSideMenu] = useState(false);
    const [toogleSearch, settoogleSearch] = useState(false);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Check for token in local storage
    useEffect(() => {
        console.log("useEffect called")
        const token = localStorage.getItem('token');
        if (!token) {

            console.log("token :" , token)

            router.push('/auth/login'); // Redirect to login if no token
        }
        else{

            console.log("token :" , token)
        }
    }, [router]);

    return (
        <Fragment>
            <Head>
                <title>{title}</title>
                <meta name="title" content={title} />
                <meta name="description" content={description} />

                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
                <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet" />

                <link
                    rel="stylesheet"
                    href="https://cdn.datatables.net/1.11.5/css/jquery.dataTables.min.css"
                    integrity="sha384-nqKJ5nHQQgPTNwI0kPcbbP5MVPFozG6gZWybZ+Wgt0+QlMJnM1D8l12wXRXx8yFJ"
                    crossOrigin="anonymous"
                />
            </Head>

            <ModalLogout title={""} onHideClick={handleClose} show={show} onHide={handleClose} centered size="md" />

            <div className='w-full overflow-hidden min-h-screen bg-MNeutral-50'>
                {dashboard ? (
                    <Fragment>
                        <div className="overflow-hidden w-full min-h-dvh md:min-h-screen">
                            <div className={"w-[248px] h-dvh md:h-screen bg-Msurfacesurfacesecondary border-r !border-Mborderborderprimary fixed z-[99] top-0 px-3 py-6 transition-all duration-300 " + (toogleSideMenu ? "left-0" : "-left-[400px] lg:left-0")}>
                                <div className="flex flex-wrap gap-y-4 h-full">
                                    <div className="w-full">
                                        <div className="flex items-center gap-2 mb-[2rem]">
                                            <img src={originalUrl + "/images/Logo.svg"} alt="" />
                                            <p className='font-semibold text__18'>Shotify</p>
                                        </div>

                                        <div className="grid grid-cols-1 gap-2">
                                            <Link href='/' className={"pl-3 pr-4 py-2 flex items-center gap-3 " + (isActive('/') && router.pathname === '/' ? "bg-white border-l border-Mmaincolorgreen text-Mtexttextprimary" : "text-Mtexttextsecondary")}>
                                                <div className={isActive('/') && router.pathname === '/' ? 'text-Msurfacesurfaceinvert' : ''}>
                                                    <ReactSVG src={originalUrl + "/images/ic (5).svg"} />
                                                </div>
                                                <p className='font-medium text__16'>Dashboard</p>
                                            </Link>
                                            <Link href='/order' className={"pl-3 pr-4 py-2 flex items-center gap-3 " + (isActive('/order') ? "bg-white border-l border-Mmaincolorgreen text-Mtexttextprimary" : "text-Mtexttextsecondary")}>
                                                <div className={isActive('/order') ? 'text-Msurfacesurfaceinvert' : 'text-Mtexttextsecondary'}>
                                                    <ReactSVG src={originalUrl + "/images/ic (4).svg"} />
                                                </div>
                                                <p className='font-medium text__16'>Order</p>
                                            </Link>
                                            <Link href='/product-list' className={"pl-3 pr-4 py-2 flex items-center gap-3 " + (isActive('/product-list') ? "bg-white border-l border-Mmaincolorgreen text-Mtexttextprimary" : "text-Mtexttextsecondary")}>
                                                <div className={isActive('/product-list') ? 'text-Msurfacesurfaceinvert' : 'text-Mtexttextsecondary'}>
                                                    <ReactSVG src={originalUrl + "/images/ic (6).svg"} />
                                                </div>
                                                <p className='font-medium text__16'>Product List</p>
                                            </Link>
                                            <Link href='/add-product' className={"pl-3 pr-4 py-2 flex items-center gap-3 " + (isActive('/add-product') ? "bg-white border-l border-Mmaincolorgreen text-Mtexttextprimary" : "text-Mtexttextsecondary")}>
                                                <div className={isActive('/add-product') ? 'text-Msurfacesurfaceinvert' : 'text-Mtexttextsecondary'}>
                                                    <ReactSVG src={originalUrl + "/images/ic (1).svg"} />
                                                </div>
                                                <p className='font-medium text__16'>Add Product</p>
                                            </Link>
                                            <Link href='/category' className={"pl-3 pr-4 py-2 flex items-center gap-3 " + (isActive('/category') ? "bg-white border-l border-Mmaincolorgreen text-Mtexttextprimary" : "text-Mtexttextsecondary")}>
                                                <div className={isActive('/category') ? 'text-Msurfacesurfaceinvert' : 'text-Mtexttextsecondary'}>
                                                    <ReactSVG src={originalUrl + "/images/ic (7).svg"} />
                                                </div>
                                                <p className='font-medium text__16'>Category</p>
                                            </Link>
                                            <Link href='/manage-review' className={"pl-3 pr-4 py-2 flex items-center gap-3 " + (isActive('/manage-review') ? "bg-white border-l border-Mmaincolorgreen text-Mtexttextprimary" : "text-Mtexttextsecondary")}>
                                                <div className={isActive('/manage-review') ? 'text-Msurfacesurfaceinvert' : 'text-Mtexttextsecondary'}>
                                                    <ReactSVG src={originalUrl + "/images/ic (3).svg"} />
                                                </div>
                                                <p className='font-medium text__16'>Manage Review</p>
                                            </Link>
                                        </div>
                                    </div>

                                    <div className="self-end w-full">
                                        <div className="grid grid-cols-1 gap-2">
                                            <Link href='/setting' className={"pl-3 pr-4 py-2 flex items-center gap-3 " + (isActive('/setting') ? "bg-white border-l border-Mmaincolorgreen text-Mtexttextprimary" : "text-Mtexttextprimary")}>
                                                <div className={"text-Msurfacesurfaceinvert"}>
                                                    <ReactSVG src={originalUrl + "/images/GearSix.svg"} />
                                                </div>
                                                <p className='font-medium text__16'>Setting</p>
                                            </Link>
                                            <div onClick={handleShow} className={"cursor-pointer pl-3 pr-4 py-2 flex items-center gap-3 text-Mtexttextprimary"}>
                                                <div className={"text-Msurfacesurfaceinvert"}>
                                                    <ReactSVG src={originalUrl + "/images/SignOut.svg"} />
                                                </div>
                                                <p className='font-medium text__16'>Log Out</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div onClick={() => settoogleSideMenu(!toogleSideMenu)} className={"cursor-pointer lg:hidden transition-all duration-300 fixed z-[90] top-0 w-full h-full bg-[rgba(23,23,23,0.2)] " + (toogleSideMenu ? "left-0" : "-left-[100vw]")}></div>

                            <div className="w-full lg:w-[calc(100%_-_248px)] lg:ml-[248px] min-h-dvh md:min-h-screen transition-all duration-300">
                                <div className="fixed w-full lg:w-[calc(100%_-_248px)] h-[70px] z-[80] right-0 top-0 bg-white lg:bg-Msurfacesurfacesecondary border-b !border-Mborderborderprimary flex items-center transition-all duration-300">
                                    <div className="relative w-full">
                                        <Container className='relative'>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3 lg:px-2">
                                                    <img src={originalUrl + "/images/List.svg"} className='cursor-pointer lg:hidden' onClick={() => settoogleSideMenu(!toogleSideMenu)} alt="" />
                                                    <div className="flex items-center gap-2">
                                                        <img onClick={() => settoogleSearch(!toogleSearch)} src={originalUrl + "/images/search.svg"} alt="" />
                                                        <input type="text" className={'font-medium text__14 placeholder:text-Mtexttextinvert bg-transparent border-none outline-none hover:focus:active:outline-none hover:focus:active:border-none transition-all duration-300 ' + (toogleSearch ? "w-[120px] ss:w-[200px] lg:w-[275px]" : "w-[0] lg:w-[275px]")} placeholder='Search product, customer, etc...' />
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-3">
                                                    <div className="w-[48px] h-[48px] rounded-full flex items-center justify-center border !border-Mborderborderprimary">
                                                        <img src={originalUrl + "/images/notification.svg"} alt="" />
                                                    </div>
                                                </div>
                                            </div>

                                            <MenuProfile settoogleMenuProfile={settoogleMenuProfile} addClass={"ss:block hidden"} toogleMenuProfile={toogleMenuProfile} originalUrl={originalUrl} handleShow={handleShow} />
                                        </Container>

                                        <MenuProfile settoogleMenuProfile={settoogleMenuProfile} addClass={"ss:hidden"} toogleMenuProfile={toogleMenuProfile} originalUrl={originalUrl} handleShow={handleShow} />
                                    </div>
                                </div>

                                <div className="mt-[70px]">
                                    {children}
                                </div>
                            </div>
                        </div>
                    </Fragment>
                ) : (
                    children
                )}
            </div>

            <script
                src="https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js"
                crossOrigin
            ></script>

            <script
                src="https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js"
                crossOrigin
            ></script>

            <script
                src="https://cdn.jsdelivr.net/npm/react-bootstrap@next/dist/react-bootstrap.min.js"
                crossOrigin
            ></script>
        </Fragment>
    );
};

export default Layout;
