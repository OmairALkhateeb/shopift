import React, { Fragment, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import useHostname from '@/Components/Provider/HostnameProvider';
import Layout from '@/Components/Layout/Layout';
import { ReactSVG } from 'react-svg';
import 'flag-icons/css/flag-icons.min.css';
import DataProductListTable from '@/Components/Table/DataProductListTable';
import SecTop from '@/Components/Section/SecTop';
import SelectOption from '@/Components/Seelect/SelectOption';

const ProductList = () => {
  const originalUrl = useHostname();

  const [products, setProducts] = useState([]); // Store fetched data
  const [searchTerm, setSearchTerm] = useState('');
  const [Status, setStatus] = useState('');
  const [Category, setCategory] = useState('');
  const [Stock, setStock] = useState('');

  // Fetch data from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fantasia-shop.com/api/products', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // Authorization: `Bearer YOUR_TOKEN_HERE`, // Replace with actual token
          },
        });
        const data = await response.json();
        const formattedData = data.map((item) => ({
          id: item.id,
          product: {
            img: item.thumbnail,
            title: item.name,
            subTitle: item.description,
          },
          category: item.category_name,
          stock: item.size ? 'Available' : 'Empty', // Example logic
          price: `$${item.price}`,
          material: item.material || 'N/A', // Example placeholder
          size: item.size || 'N/A', // Example placeholder
          // size: item.size || 'N/A', // Example placeholder
          delivery: item.delivery_and_exchange_policy, // Example static value
        }));
        setProducts(formattedData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Fragment>
      <Layout title="Product List" description="Product List Desc" dashboard={true}>
        <SecTop title="Products" subtitle={"Monitor your store's products to increase your sales."}>
          <div className="flex items-center gap-3">
            <a href="#!" className="inline-block px-3 py-2 rounded-[8px] bg-Msurfacesurfacesecondary text-Mmaincolorgreen">
              <div className="flex items-center gap-2">
                <ReactSVG src={originalUrl + '/images/export.svg'} />
                <p className="font-medium text__14">Export</p>
              </div>
            </a>
            <a href="#!" className="inline-block px-3 py-2 rounded-[8px] bg-Mmaincolorgreen text-white">
              <div className="flex items-center gap-2">
                <ReactSVG src={originalUrl + '/images/pluss.svg'} />
                <p className="font-medium text__14">Add Product</p>
              </div>
            </a>
          </div>
        </SecTop>

        <section className="pt-0 pb-4">
          <Container>
            {/* <div className="flex items-center xl:!flex-nowrap flex-wrap gap-3 relative z-[2]">
              <div className="flex items-center gap-2 px-2 w-full">
                <img src={originalUrl + '/images/search.svg'} alt="" />
                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  type="text"
                  className="font-medium w-full text__14 placeholder:text-Mtexttextinvert bg-transparent border-none outline-none hover:focus:active:outline-none hover:focus:active:border-none"
                  placeholder="Search order..."
                />
              </div>
              <div className="grid ss:grid-cols-3 gap-3 flex-shrink-0 xl:!w-auto w-full">
                <SelectOption title="Status" value={Status}>
                  <div className="inline-block w-full cursor-pointer" onClick={() => setStatus('Scheduled')}>
                    <p className="font-medium text__16">Scheduled</p>
                  </div>
                  <div className="w-full h-[1px] bg-Mborderborderprimary"></div>
                  <div className="inline-block w-full cursor-pointer" onClick={() => setStatus('Delivered')}>
                    <p className="font-medium text__16">Delivered</p>
                  </div>
                  <div className="w-full h-[1px] bg-Mborderborderprimary"></div>
                  <div className="inline-block w-full cursor-pointer" onClick={() => setStatus('Cancel')}>
                    <p className="font-medium text__16">Cancel</p>
                  </div>
                </SelectOption>
                <SelectOption title="Category" value={Category}>
                  <div className="inline-block w-full cursor-pointer" onClick={() => setCategory('Shoes')}>
                    <div className="flex items-center gap-2">
                      <img src={originalUrl + '/images/Sneaker.svg'} className="w-[20px]" alt="" />
                      <p className="font-medium text__16">Shoes</p>
                    </div>
                  </div>
                  <div className="w-full h-[1px] bg-Mborderborderprimary"></div>
                  <div className="inline-block w-full cursor-pointer" onClick={() => setCategory('Fashion')}>
                    <div className="flex items-center gap-2">
                      <img src={originalUrl + '/images/TShirt.svg'} className="w-[20px]" alt="" />
                      <p className="font-medium text__16">Fashion</p>
                    </div>
                  </div>
                  <div className="w-full h-[1px] bg-Mborderborderprimary"></div>
                  <div className="inline-block w-full cursor-pointer" onClick={() => setCategory('Electronic')}>
                    <div className="flex items-center gap-2">
                      <img src={originalUrl + '/images/Devices.svg'} className="w-[20px]" alt="" />
                      <p className="font-medium text__16">Electronic</p>
                    </div>
                  </div>
                </SelectOption>
                <SelectOption title="Stock" value={Stock}>
                  <div className="inline-block w-full cursor-pointer" onClick={() => setStock('Available')}>
                    <p className="font-medium text__16">Available</p>
                  </div>
                  <div className="w-full h-[1px] bg-Mborderborderprimary"></div>
                  <div className="inline-block w-full cursor-pointer" onClick={() => setStock('Empty')}>
                    <p className="font-medium text__16">Empty</p>
                  </div>
                </SelectOption>
              </div>
            </div> */}

            <DataProductListTable
              Status={Status}
              Category={Category}
              Stock={Stock}
              data={products}
              searchTerm={searchTerm}
              paging={true}
              info={true}
            />
          </Container>
        </section>
      </Layout>
    </Fragment>
  );
};

export default ProductList;
