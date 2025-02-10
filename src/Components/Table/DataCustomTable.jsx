import React, { Fragment, useState, useEffect } from 'react';
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';
import useHostname from '../Provider/HostnameProvider';
import ModalDetailProduct from '../Modal/ModalDetailProduct';

DataTable.use(DT);

const DataCustomTable = ({
  data = [],
  info = false,
  paging = false,
  searching = false,
  lengthChange = false,
  searchTerm = "",
}) => {
  const originalUrl = useHostname();

  const [show, setShow] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Filter data based on search term
  const filteredData = data.filter((item) =>
    String(item.order).toLowerCase().includes(searchTerm.toLowerCase()) ||
    String(item.date).toLowerCase().includes(searchTerm.toLowerCase()) ||
    String(item.customer.name).toLowerCase().includes(searchTerm.toLowerCase()) ||
    String(item.customer.email).toLowerCase().includes(searchTerm.toLowerCase()) ||
    String(item.payment).toLowerCase().includes(searchTerm.toLowerCase()) ||
    String(item.status).toLowerCase().includes(searchTerm.toLowerCase()) ||
    String(item.method.type).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      title: 'ORDER',
      data: 'order',
      render: function (data) {
        return `<span class="order-cell" style="cursor: pointer;">${data}</span>`;
      },
    },
    { title: 'DATE', data: 'date' },
    {
      title: 'CUSTOMER',
      data: 'customer',
      render: function (data) {
        return `
        <div class="flex items-center gap-2">
          <div class="">
            <h5 class="font-medium text__14">${data.name}</h5>
            <p class="text__12 text-Mtexttextsecondary">${data.email}</p>
          </div>
        </div>
      `;
      },
    },
    {
      title: 'PAYMENT',
      data: 'payment',
      render: function (data) {
        return data === "Successful"
          ? `
          <div class="flex items-center gap-2 text-Malertssucces">
            <div class="w-[6px] h-[6px] rounded-full bg-Malertssucces"></div>
            <p class="text__14">${data}</p>
          </div>
        `
          : `
          <div class="flex items-center gap-2 text-Malertserror">
            <div class="w-[6px] h-[6px] rounded-full bg-Malertserror"></div>
            <p class="text__14">${data}</p>
          </div>
        `;
      },
    },
    {
      title: 'ACTIONS',
      data: null,
      render: function (row) {
        return `
          <button 
            class="btn-action-details bg-Mmaincolorgreen text-white px-3 py-1 rounded hover:bg-blue-600" 
            data-order='${JSON.stringify(row).replace(/'/g, "&#39;")}'>
            View Details
          </button>
        `;
      },
      orderable: false,
    },
  ];

  // Handle the button click for opening the modal
  useEffect(() => {
    const table = document.querySelector('.TableCustom');
    if (table) {
      table.addEventListener('click', (event) => {
        if (event.target.matches('.btn-action-details')) {
          const order = JSON.parse(event.target.getAttribute('data-order'));
          setSelectedOrder(order);
          handleShow();
        }
      });
    }
    return () => {
      if (table) {
        table.removeEventListener('click', () => {});
      }
    };
  }, []);

  return (
    <Fragment>
      {/* Modal for showing the order details */}
      {show && (
        <ModalDetailProduct
          onHideClick={handleClose}
          show={show}
          onHide={handleClose}
          dialogClassName="xl:mr-0 warpContent custom-width-modal"
          order={selectedOrder}
        />
      )}

      <div className="w-full overflow-auto">
        <div className="w-[1400px] xl:w-full">
          <div className="tableWrapCustom">
            <DataTable
              className="TableCustom"
              data={filteredData}
              columns={columns}
              options={{
                paging: paging,
                searching: searching,
                info: info,
                lengthChange: lengthChange,
              }}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default DataCustomTable;
