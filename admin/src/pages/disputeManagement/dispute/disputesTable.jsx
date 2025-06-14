import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteDispute } from '../../../store/action';
import DeleteIcon from '@mui/icons-material/Delete';

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import Tables from "layouts/tables";
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

const DisputesTable = ({ disputes,filters,
  onStatusChange,
  onSearchChange, }) => {
  const dispatch = useDispatch();

  const handleDelete = (disputeId) => {
    if (window.confirm('Are you sure you want to delete this dispute?')) {
      dispatch(deleteDispute(disputeId));
    }
  };

  // Prepare columns and rows data for the table
  const columns = [
    { Header: "ID", accessor: "id", align: "left" },
    { Header: "Requester ID", accessor: "requester_id", align: "left" },
    { Header: "Property Ref", accessor: "property_ref", align: "left" },
    { Header: "Description", accessor: "description", align: "left" },
    { Header: "Status", accessor: "status", align: "center" },
    { Header: "Created At", accessor: "created_at", align: "center" },
    { Header: "Actions", accessor: "actions", align: "center" },
  ];

  // Build rows dynamically
  const rows = disputes?.map((dispute) => ({
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
      {disputes?.length ? (
        
        
                        <DataTable
                          table={{ columns, rows }}
                          isSorted={false}
                          entriesPerPage={false}
                          showTotalEntries={false}
                          noEndBorder
                        />
          /* <Tables
            columns={columns}
            rows={rows}
            title="Disputes Management"
            showTotalEntries={false}
            isSorted={false}
            noEndBorder
          /> */
        // <Tables
        //   columns={columns}
        //   rows={rows}
        //   title="Disputes Management"
        //   showTotalEntries={false}
        //   isSorted={false}
        //   noEndBorder
        // />
      ) : (
        <MDTypography variant="body2" color="text">
          No disputes found
        </MDTypography>
      )}
    </MDBox>
  );
};

export default DisputesTable;