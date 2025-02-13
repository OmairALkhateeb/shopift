  import React, { Fragment, useEffect, useState } from 'react';
  import $ from 'jquery';
  import DataTable from 'datatables.net-react';
  import DT from 'datatables.net-dt';
  import 'datatables.net-dt/css/dataTables.dataTables.min.css';
  import useHostname from '../Provider/HostnameProvider';
  import axios from 'axios';

  DataTable.use(DT);

  const DataProductListTable = ({
    Status,
    Category,
    Stock,
    data = [],
    info = false,
    paging = false,
    searching = false,
    lengthChange = false,
    searchTerm = "",
  }) => {
    const originalUrl = useHostname();

    const [selectedRows, setSelectedRows] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editDialogVisible, setEditDialogVisible] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    // Function to delete a product
    const handleDelete = async (id) => {
      setLoading(true);
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Authentication token not found. Please log in again.");
        setLoading(false);
        return;
      }

      try {
        await axios.delete(`https://fantasia-shop.com/api/products/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        alert("Product deleted successfully");
        window.location.reload();
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Error deleting product");
      } finally {
        setLoading(false);
      }
    };

    // Function to edit a product
    const handleEdit = async (id) => {
      setLoading(true);
      const token = localStorage.getItem("token");
    
      try {
        const response = await axios.get(`https://fantasia-shop.com/api/products/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
    
        // Set the data correctly
        setEditingProduct(response.data); // Ensure response.data contains size and delivery_and_exchange_policy
        setEditDialogVisible(true);
      } catch (error) {
        console.error("Error fetching product data:", error);
        alert("Error fetching product data");
      } finally {
        setLoading(false);
      }
    };
    

    const handleSaveEdit = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");
    
      try {
        const updatedProduct = {
          name: editingProduct.name,
          description: editingProduct.description,
          price: editingProduct.price,
          size: editingProduct.size,
          material: editingProduct.status,
          delivery_and_exchange_policy : editingProduct.delivery_and_exchange_policy,
          // thumbnail : editingProduct.newThumbnail,

          // editingProduct.newThumbnail
        };
    

        console.log("updatedProduct" , updatedProduct)
        await axios.put(`https://fantasia-shop.com/api/products/${editingProduct.id}`, updatedProduct, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
    
        alert("Product updated successfully");
        setEditDialogVisible(false);
        window.location.reload();
      } catch (error) {
        console.error("Error updating product:", error);
        alert("Error updating product");
      } finally {
        setLoading(false);
      }
    };
    

    const columns = [
      {
        title: '<input type="checkbox" id="select-all-checkbox" class="w-[20px] h-[20px] border !border-Mgray400 rounded-[4px]" />',
        data: null,
        render: function (row) {
          return `<input type="checkbox" class="row-checkbox w-[20px] h-[20px] border !border-Mgray400 rounded-[4px]" data-id="${row.id}" />`;
        },
        orderable: false,
      },
      {
        title: 'PRODUCT',
        data: 'product',
        render: function (data) {
          return `
            <div class="flex items-center gap-2">
              <img src="${data.img}" class="w-[36px] h-[36px] rounded-full object-cover" alt="" />
              <div class="text-left">
                <h5 class="font-medium text__16">${data.title}</h5>
                <p class="text__14 text-Mtexttextsecondary">${data.subTitle}</p>
              </div>
            </div>
          `;
        },
      },
      {
        title: 'PRICE',
        data: 'price',
        render: function (data) {
          return `<p class="text__14">${data}</p>`;
        },
      },
      {
          title: 'material',
          data: 'material',
          render: function (data) {
            return `<p class="text__14">${data}</p>`;
          },
        },
      {
        title: 'SIZE',
        data: 'size',
        render: function (data) {
          // Check if the 'size' field has a value, if not, display 'N/A'
          return data != null
            ? `<p class="text__14 text-Mtexttextsecondary">${data}</p>`
            : `<p class="text__14 text-Mtexttextsecondary">N/A</p>`;
        },
      },
      
      {
        title: 'Delivery and Exchange Policy',
        data: 'delivery',
        render: function (data) {
          return data && data.length > 0
            ? `<div class="text__14 text-Malertssucces px-2 py-2 inline-block rounded-[4px] border !border-[#D6F4DE] bg-[#EFFBF2]">${data}</div>`
            : `<div class="text__14 text-Malertssucces px-2 py-2 inline-block rounded-[4px] border !border-[#D6F4DE] bg-[#EFFBF2]">N/A</div>`;
        },
      },
      
      {
        title: 'ACTIONS',
        data: null,
        render: function (row) {
          return `
            <div class="w-full flex items-center gap-2 text-center">
              <img src="${originalUrl}/images/PencilSimpleLine.svg" class="edit-btn" data-id="${row.id}" alt="" />
              <img src="${originalUrl}/images/Trash.svg" class="delete-btn" data-id="${row.id}" alt="" />
              <img src="${originalUrl}/images/DotsThreeVertical.svg" class="" alt="" />
            </div>
          `;
        },
        orderable: false,
      },
    ];
    

    useEffect(() => {
      const deleteButtons = document.querySelectorAll('.delete-btn');
      const editButtons = document.querySelectorAll('.edit-btn');

      const handleDeleteClick = (event) => {
        const id = event.target.getAttribute('data-id');
        if (id) {
          handleDelete(id);
        }
      };

      const handleEditClick = (event) => {
        const id = event.target.getAttribute('data-id');
        if (id) {
          handleEdit(id);
        }
      };

      deleteButtons.forEach((button) => {
        button.addEventListener('click', handleDeleteClick);
      });
      editButtons.forEach((button) => {
        button.addEventListener('click', handleEditClick);
      });

      return () => {
        deleteButtons.forEach((button) => {
          button.removeEventListener('click', handleDeleteClick);
        });
        editButtons.forEach((button) => {
          button.removeEventListener('click', handleEditClick);
        });
      };
    }, [data]);

    const filteredData = data.filter((item) =>
      String(item.product.title).toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
  <Fragment>
    <div className="w-full overflow-auto">
      <div className="w-full max-w-full xl:w-full">
        <div className="tableWrapCustom productList">
          {loading && (
            <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-opacity-50 bg-gray-500">
              <div className="spinner-border animate-spin inline-block w-16 h-16 border-4 border-t-4 border-gray-200 rounded-full"></div>
            </div>
          )}
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

    {editDialogVisible && editingProduct && (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-xl font-semibold mb-4">Edit Product</h2>
        <label className="block mb-2">
          Title:
          <input
            type="text"
            className="w-full p-2 border rounded"
            placeholder="Enter product title"
            value={editingProduct.name}
            onChange={(e) => setEditingProduct({
              ...editingProduct,
              name: e.target.value,
            })}
          />
        </label>
        <label className="block mb-2">
          Description:
          <input
            type="text"
            className="w-full p-2 border rounded"
            placeholder="Enter product description"
            value={editingProduct.description}
            onChange={(e) => setEditingProduct({
              ...editingProduct,
              description: e.target.value,
            })}
          />
        </label>
        <label className="block mb-2">
          Price:
          <input
            type="number"
            className="w-full p-2 border rounded"
            placeholder="Enter product price"
            value={editingProduct.price}
            onChange={(e) => setEditingProduct({
              ...editingProduct,
              price: e.target.value,
            })}
          />
        </label>
        <label className="block mb-2">
    Size:
    <input
      type="text"
      className="w-full p-2 border rounded"
      placeholder="Enter product size"
      value={editingProduct?.size || ''}  // Ensure the field is controlled
      onChange={(e) => setEditingProduct({
        ...editingProduct,
        size: e.target.value,
      })}
    />
  </label>
  <label className="block mb-2">
  material:
    <input
      type="text"
      className="w-full p-2 border rounded"
      placeholder="Enter material"
      value={editingProduct?.material || ''}  // Ensure the field is controlled
      onChange={(e) => setEditingProduct({
        ...editingProduct,
        material: e.target.value,
      })}
    />
  </label>

  <label className="block mb-2">
    Delivery and Exchange Policy:
    <textarea
      className="w-full p-2 border rounded"
      placeholder="Enter delivery and exchange policy"
      value={editingProduct?.delivery_and_exchange_policy || ''} // Ensure field is controlled
      onChange={(e) =>
        setEditingProduct({
          ...editingProduct,
          delivery_and_exchange_policy: e.target.value, // Keep keys consistent
        })
      }
    />
  </label>

  {/* <label className="block mb-2">
  Thumbnail:
  <input
    type="file"
    className="w-full p-2 border rounded"
    onChange={(e) => {
      const file = e.target.files[0];
      if (file) {
        setEditingProduct((prev) => ({
          ...prev,
          newThumbnail: file,
        }));
      }
    }}
  />
</label> */}


        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-red-500 text-white rounded"
            onClick={() => setEditDialogVisible(false)}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded"
            onClick={handleSaveEdit}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )}

  </Fragment>

    );
  };

  export default DataProductListTable;