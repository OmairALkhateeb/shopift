import React, { Fragment, useEffect, useState } from "react";
import $ from "jquery";
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import useHostname from "../Provider/HostnameProvider";
import axios from "axios";

DataTable.use(DT);

const DataCategoryTable = ({
  data = [],
  info = false,
  paging = false,
  searching = false,
  lengthChange = false,
  searchTerm = "",
}) => {
  const originalUrl = useHostname();
  const apiUrl = "https://fantasia-shop.com/api/categories";

  const [selectedRows, setSelectedRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleDelete = async (id) => {
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      const response = await axios.delete(`${apiUrl}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Category deleted successfully");
      setLoading(false);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting category:", error);
      alert("Error deleting category");
      setLoading(false);
    }
  };

  const handleEdit = (id) => {
    console.log("Edit handler triggered with ID:", id);
    const editDialog = document.createElement("div");
    editDialog.innerHTML = `
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
        <div class="bg-white rounded-lg p-6 w-96">
          <h2 class="text-xl font-semibold mb-4">Edit Category</h2>
          <label class="block mb-2">
            Name:
            <input type="text" class="w-full p-2 border rounded" placeholder="Enter category name" />
          </label>
          <label class="block mb-2">
            Description:
            <textarea class="w-full p-2 border rounded" placeholder="Enter category description"></textarea>
          </label>
          <label class="block mb-2">
            Image:
            <input type="file" class="w-full p-2 border rounded" accept="image/*" />
          </label>
          <div class="flex justify-end gap-2">
            <button class="px-4 py-2 bg-green-500 text-white rounded" id="cancel-edit">Cancel</button>
            <button class="px-4 py-2 bg-green-500 text-white rounded" id="save-edit">Save</button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(editDialog);

    document.getElementById("cancel-edit").addEventListener("click", () => {
      document.body.removeChild(editDialog);
    });

    document.getElementById("save-edit").addEventListener("click", () => {
      alert(`Category with ID: ${id} has been updated.`);
      document.body.removeChild(editDialog);
    });
  };

  const columns = [
    {
      title:
        '<input type="checkbox" id="select-all-checkbox" class="w-[20px] h-[20px] border !border-Mgray400 rounded-[4px]" />',
      data: null,
      render: function (row) {
        return `<input type="checkbox" class="row-checkbox w-[20px] h-[20px] border !border-Mgray400 rounded-[4px]" data-id="${row.id}" />`;
      },
      orderable: false,
    },
    {
      title: "Thumbnail",
      data: "thumbnail",
      render: function (data) {
        return `<img src="${data}" class="w-[50px] h-[50px] rounded object-cover" alt="Thumbnail" />`;
      },
    },
    {
      title: "Name",
      data: "name",
      render: function (data) {
        return `<p class="text__14 text-left">${data}</p>`;
      },
    },
    {
      title: "Description",
      data: "description",
      render: function (data) {
        return `<p class="text__14 text-left">${data}</p>`;
      },
    },
    {
      title: "Actions",
      data: null,
      render: function (row) {
        return `
           <div class="w-full flex items-center gap-2 text-center">
            <img src="${originalUrl}/images/PencilSimpleLine.svg" class="edit-btn" data-id="${row.id}" alt="" />
            <img src="${originalUrl}/images/Trash.svg" class="delete-btn" data-id="${row.id}" alt="" />
            <img src="${originalUrl}/images/DotsThreeVertical.svg" class="" alt="" />
          </div>`;
      },
      orderable: false,
    }
  ];

  useEffect(() => {
    const deleteButtons = document.querySelectorAll(".delete-btn");
    const editButtons = document.querySelectorAll(".edit-btn");

    deleteButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const categoryId = event.target.getAttribute("data-id");
        handleDelete(categoryId);
      });
    });

    editButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const categoryId = event.target.getAttribute("data-id");
        handleEdit(categoryId);
      });
    });

    console.log("Event listeners attached for edit and delete buttons.");

    return () => {
      deleteButtons.forEach((button) => {
        button.removeEventListener("click", handleDelete);
      });

      editButtons.forEach((button) => {
        button.removeEventListener("click", handleEdit);
      });
    };
  }, [data]);

  return (
    <Fragment>
      <div className="w-full overflow-auto">
        <div className="w-[1400px] xl:w-full">
          <div className="tableWrapCustom noneClick">
            <DataTable
              className="TableCustom"
              data={data}
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

      {loading && (
        <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-opacity-50 bg-gray-500">
          <div className="spinner-border animate-spin inline-block w-16 h-16 border-4 border-t-4 border-gray-200 rounded-full"></div>
        </div>
      )}
    </Fragment>
  );
};

export default DataCategoryTable;
