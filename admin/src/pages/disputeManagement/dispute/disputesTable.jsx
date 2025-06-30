import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteDispute } from '../../../store/action';
import DeleteIcon from '@mui/icons-material/Delete';
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import DataTable from "examples/Tables/DataTable";

const statusColor = (status) => {
  switch (status) {
    case 'open':
      return 'info';
    case 'in_review':
      return 'warning';
    case 'resolved':
      return 'success';
    case 'rejected':
      return 'error';
    default:
      return 'secondary';
  }
};

const DisputesTable = ({ data, onPageChange, onPageSizeChange }) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(data?.limit || 10);

  const handleDelete = (disputeId) => {
    if (window.confirm('Are you sure you want to delete this dispute?')) {
      dispatch(deleteDispute(disputeId));
    }
  };

  const handleChangePage = (newPage) => {
    setPage(newPage);
    onPageChange(newPage); // API expects 1-based index
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0); // Reset to first page
    onPageSizeChange(newRowsPerPage);
  };
  

  // Prepare columns and rows data for the table
  const columns = [
    { Header: "ID", accessor: "id", align: "left" },
    { Header: "Requester ID", accessor: "requester_id", align: "left" },
    { Header: "Conveyancer ID", accessor: "conveyancer_id", align: "left" },
    { Header: "Property Ref", accessor: "property_ref", align: "left" },
    { Header: "Description", accessor: "description", align: "left" },
    { Header: "Status", accessor: "status", align: "center" },
    { Header: "Created At", accessor: "created_at", align: "center" },
    // { Header: "Resolved At", accessor: "resolved_at", align: "center" },
    { Header: "Actions", accessor: "actions", align: "center" },
  ];

  // Build rows dynamically
  const rows = data?.disputes?.map((dispute) => ({
    id: (
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {dispute.id}
      </MDTypography>
    ),
    requester_id: (
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {dispute.requester_id}
      </MDTypography>
    ),
    conveyancer_id: (
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {dispute.conveyancer_id}
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
    // resolved_at: (
    //   <MDTypography variant="caption" color="text" fontWeight="medium">
    //     {dispute.resolved_at ? new Date(dispute.resolved_at).toLocaleDateString("en-GB") : '-'}
    //   </MDTypography>
    // ),
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
        <MDButton
          variant="gradient"
          color="error"
          size="small"
          onClick={() => handleDelete(dispute.id)}
          iconOnly
        >
          <DeleteIcon />
        </MDButton>
      </MDBox>
    ),
  }));

  return (
    <MDBox pt={3}>
      {data?.disputes?.length ? (
        // <DataTable
        //   table={{ 
        //     columns, 
        //     rows,
        //     pagination: {
        //       page,
        //       rowsPerPage: data.limit,
        //       rowsPerPageOptions: [5, 10, 25, 50],
        //       count: data.totalRecords,
        //       onPageChange: handleChangePage,
        //       onRowsPerPageChange: handleChangeRowsPerPage
        //     }
        //   }}
        //   isSorted={false}
        //   entriesPerPage={false}
        //   showTotalEntries={true}
        //   noEndBorder
        // />
        <DataTable
          table={{ 
            columns,  // Your columns array
            rows      // Your formatted rows data
          }}
         pageNo={page}
              setPageNo={setPage}
              totalPages={ data?.totalPages || 1}
              handlePaginationTrigger={ handleChangePage}
          showTotalEntries={false} 
          
          isSorted={false}  // Disable column sorting
          noEndBorder={true} // Remove border from last row          
                  entriesPerPage={false}                  
                  canSearch={false}
        />

        

      ) : (
        <MDTypography variant="body2" color="text">
          No disputes found
        </MDTypography>
      )}
    </MDBox>
  );
};

export default DisputesTable;