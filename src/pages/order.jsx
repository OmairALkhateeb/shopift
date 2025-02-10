import React, { Fragment, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Container } from 'react-bootstrap';
import useHostname from '@/Components/Provider/HostnameProvider';
import Layout from '@/Components/Layout/Layout';
import { ReactSVG } from 'react-svg';
import 'flag-icons/css/flag-icons.min.css';
import DataCustomTable from '@/Components/Table/DataCustomTable';
import SecTop from '@/Components/Section/SecTop';
import ModalDetailProduct from '@/Components/Modal/ModalDetailProduct'; // Import the modal component

const Order = () => {
  const originalUrl = useHostname();
  const [dataTable, setDataTable] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null); // State to track selected order
  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/auth/login');
          return;
        }
  
        const response = await fetch('https://fantasia-shop.com/api/orders', {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        if (!response.ok) {
          if (response.status === 401) {
            router.push('/auth/login');
            return;
          }
          throw new Error('Failed to fetch orders');
        }
  
        const data = await response.json();
        const formattedData = data.map((order) => ({
          id: order.id,
          order: `Order #${order.id}`,
          date: new Date(order.created_at).toLocaleDateString(),
          customer: {
            img: `${originalUrl}/images/customer-placeholder.png`,
            name: order.full_name,
            email: order.email,
          },
          phone: order.phone,
          state: order.state,
          city: order.city,
          address: `${order.address_1}, ${order.address_2}, ${order.city}, ${order.state}`,
          payment: order.payment_method.replace('_', ' '),
          total: `$${order.total_price}`,
          status: order.status,
          items: order.items.map((item) => ({
            id: item.id,
            quantity: item.quantity,
            price: `$${item.price}`,
            total: `$${item.total}`,
            product: {
              name: item.product.name,
              description: item.product.description,
              price: `$${item.product.price}`,
              material: item.product.material,
              size: item.product.size,
              category_id: item.product.category_id,
              thumbnail: item.product.thumbnail,
            },
          })), // Process and include items
        }));
  
        setDataTable(formattedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchOrders();
  }, [originalUrl, router]);
  
  return (
    <Fragment>
      <Layout title="Order" description="Order Desc" dashboard={true}>
        <SecTop title="Order List" subtitle="Track orders list across your store.">
          <div className="flex items-center gap-3">
            <a href="#!" className="inline-block px-3 py-2 rounded-[8px] bg-Mmaincolorgreen text-white">
              <div className="flex items-center gap-2">
                <ReactSVG src={originalUrl + '/images/export.svg'} />
                <p className="font-medium text__14">Export</p>
              </div>
            </a>
          </div>
        </SecTop>

        <section className="pt-0 pb-4">
          <Container>
            <div className="flex items-center gap-2 px-2 mb-4 w-full">
              <img src={originalUrl + '/images/search.svg'} alt="Search" />
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                type="text"
                className="font-medium w-full text__14 placeholder:text-Mtexttextinvert bg-transparent border-none outline-none hover:focus:active:outline-none hover:focus:active:border-none"
                placeholder="Search order..."
              />
            </div>

            {isLoading ? (
              <p>Loading orders...</p>
            ) : error ? (
              <p className="text-red-500">Error: {error}</p>
            ) : (
              <DataCustomTable
                data={dataTable}
                searchTerm={searchTerm}
                paging={true}
                info={true}
                onRowClick={(order) => setSelectedOrder(order)} // Pass the clicked order to state
              />
            )}
          </Container>
        </section>

        {/* Render the ModalDetailProduct component when an order is selected */}
        {/* {selectedOrder && (
  <ModalDetailProduct
    show={!!selectedOrder}
    onHideClick={() => setSelectedOrder(null)}
    order={selectedOrder}
  />
)} */}

      </Layout>
    </Fragment>
  );
};

export default Order;