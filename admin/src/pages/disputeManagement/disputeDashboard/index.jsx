import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Typography,
  Container,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
} from '@mui/material';
import MDBox from "../../../components/MDBox";
import MDTypography from "../../../components/MDTypography";
import MDButton from "../../../components/MDButton";
import DisputesTable from '../dispute/disputesTable';
import { fetchDisputes, setFilters } from '../../../store/action';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";

const DisputeDashboard = () => {
  const dispatch = useDispatch();
  const { data: disputes, loading, error, filters } = useSelector((state) => state.reducerData.disputeList);

  useEffect(() => {
    dispatch(fetchDisputes(filters));
  }, [dispatch]);

  const handleStatusFilterChange = (e) => {
    dispatch(setFilters({ ...filters, status: e.target.value }));
  };

  const handleSearchChange = (e) => {
    dispatch(setFilters({ ...filters, requester_id: e.target.value }));
  };

  return (
    <DashboardLayout >
      <DashboardNavbar />
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* <Typography variant="h4" component="h1" gutterBottom>
        Dispute Management
      </Typography> */}
      <MDBox
                                    mx={2}
                                    mt={-3}
                                    py={2}
                                    px={2}
                                    variant="gradient"
                                    bgColor="info"
                                    borderRadius="lg"
                                    coloredShadow="info"
                                  >
                                    <MDTypography variant="h6" color="white">
                                      Disputes List
                                    </MDTypography>
                                  </MDBox>

      <Box sx={{  mb: 0, background: 'white', padding: 2, borderRadius: 1, boxShadow: 1 }}>
        
        <FormControl sx={{ minWidth: 200, display: '', gap: 2, flexDirection: 'row', alignItems: 'center' }}>
          
          <InputLabel id="status-filter-label">Status</InputLabel>
          <Select
            labelId="status-filter-label"
            value={filters.status}
            label="Status"
            onChange={handleStatusFilterChange}
            sx={{ padding: 1.5,  width: 200}}
          >
            <MenuItem value="">All Statuses</MenuItem>
            <MenuItem value="open">Open</MenuItem>
            <MenuItem value="in_review">In Review</MenuItem>
            <MenuItem value="resolved">Resolved</MenuItem>
            <MenuItem value="rejected">Rejected</MenuItem>
          </Select>

          <TextField
          label="Search by Requester ID"
          variant="outlined"
          value={filters.requester_id}
          onChange={handleSearchChange}
          sx={{ flexGrow: 1 }}
        />
        </FormControl>

        
      <Box>
      {loading && <Typography>Loading...</Typography>}
      {error && <Typography color="error">Error: {error}</Typography>}
      {!loading && !error && <DisputesTable disputes={disputes}
  
  // filters={filters}
  // onStatusChange={handleStatusFilterChange}
  // onSearchChange={handleSearchChange}  
     />}
     </Box>

  </Box>
  
    </Container>
    </DashboardLayout>
  );
};

export default DisputeDashboard;