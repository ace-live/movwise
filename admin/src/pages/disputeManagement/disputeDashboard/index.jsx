import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchDisputes } from '../../../store/action';
import Tables from "layouts/tables";
import DeleteIcon from '@mui/icons-material/Delete';
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
const statusColor = (status) => {
  switch (status) {
    case 'open': return 'info';    
    case 'resolved': return 'success';
    case 'rejected': return 'error';
    default: return 'secondary';
  }
};

const DisputeDashboard = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filters, setFilters] = useState({
    status: '',
    filter: '',
  });

  const { data, loading, error } = useSelector((state) => state.reducerData.disputeList);

  // Prepare columns for the table
    const columns = [
    { Header: "ID", accessor: "id", align: "left" },
    { Header: "Requester", accessor: "requester_id", align: "left" },
    { Header: "Conveyancer", accessor: "conveyancer_id", align: "left" },
    { Header: "Property Ref", accessor: "property_ref", align: "left" },
    { Header: "Description", accessor: "description", align: "left" },
    { Header: "Status", accessor: "status", align: "center" },
    { Header: "Created At", accessor: "created_at", align: "center" },
    { Header: "Actions", accessor: "actions", align: "center" },
  ];

  const deleteDispute = (disputeId) => {
      if (window.confirm('Are you sure you want to delete this dispute?')) {
        dispatch(deleteDispute(disputeId));
      }
    };

const fetchData = useCallback(() => {
    dispatch(fetchDisputes({
      ...filters,
      page: page + 1,
      limit: rowsPerPage
    }));
  }, [dispatch, filters, page, rowsPerPage]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

const handlePageChange = (newPage) => {
  setPage(newPage);
  fetchData();
  // dispatch(fetchDisputes({
};

  const handlePageSizeChange = (newSize) => {
    setRowsPerPage(newSize);
    setPage(0);
  };

  const handleSearchChange = (event) => {
    const searchText = event.value;
    setFilters({ ...filters, filter: searchText , status: '' });
    // dispatch(fetchDisputes({
    //   page: 1,
    //   limit: rowsPerPage,
    //   filter: searchText
    // }));

  };

  const handleStatusFilterChange = (status) => {
    setFilters({ ...filters, filter: '' , status: status });
    // dispatch(fetchDisputes({
    //   page: 1,
    //   limit: rowsPerPage,
    //   status: status
    // }));
    setPage(0);
  };

  // Dropdown filter configuration
  const statusFilterOptions = {
    label: "Status",
    options: [
      { value: "", label: "All Statuses" },
      { value: "open", label: "Open" },
      { value: "resolved", label: "Resolved" },
      { value: "rejected", label: "Rejected" }
    ],
    defaultValue: ""
  };

  // Build rows dynamically
  const rows = data?.disputes?.map((dispute) => ({
    id: (
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {dispute.id}
      </MDTypography>
    ),
    requester_id: (
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {dispute.requester_name}
      </MDTypography>
    ),
    conveyancer_id: (
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {dispute.conveyancers_name}
      </MDTypography>
    ),
    property_ref: (
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {dispute.property_ref_id}
      </MDTypography>
    ),
    description: (
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {dispute.description.length > 50
          ? `${dispute.description.substring(0, 50)}...`
          : dispute.description}
      </MDTypography>
    ),
    status: (
      <MDBox ml={-1}>
        <MDTypography 
          variant="caption" 
          color={statusColor(dispute.status)} 
          fontWeight="bold"
          textTransform="capitalize"
        >
          {dispute.status.replace('_', ' ')}
        </MDTypography>
      </MDBox>
    ),
    created_at: (
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {new Date(dispute.created_at).toLocaleDateString("en-GB")}
      </MDTypography>
    ),
    actions: (
      <MDBox display="flex" justifyContent="center">
        <MDBox mr={1}>
          <MDButton
            component={Link}
            to={`/dispute-management/${dispute.id}`}
            variant="gradient"
            color="info"
            size="small"
          >
            Manage
          </MDButton>
        </MDBox>
        {/* <MDButton
          variant="gradient"
          color="error"
          size="small"
          onClick={() => deleteDispute(dispute.id)}
          iconOnly
        >
          <DeleteIcon />
        </MDButton> */}
      </MDBox>
    ),
  }));

  return (    
        <Tables
          columns={columns}
          rows={rows || []}
          title="Disputes Management"
          pageNo={page}
          setPageNo={setPage}
          totalPages={data?.totalPages || 1}
          handlePaginationTrigger={handlePageChange}
          handleSearchTextChange={handleSearchChange}
          dropdownFilter={statusFilterOptions}
          handleDropdownFilterChange={handleStatusFilterChange}
        />
      
  );
};

export default DisputeDashboard;