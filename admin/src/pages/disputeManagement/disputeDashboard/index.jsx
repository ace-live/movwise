import React, { useState, useEffect, useCallback } from 'react';
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
import DisputesTable from '../dispute/disputesTable';
import { fetchDisputes } from '../../../store/action';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "../../../components/MDBox";
import MDTypography from "../../../components/MDTypography";
import MDButton from "../../../components/MDButton";

const DisputeDashboard = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filters, setFilters] = useState({
    status: '',
    requester_id: '',
  });

  const { data, loading, error } = useSelector((state) => state.reducerData.disputeList);

  const fetchData = useCallback(() => {
    dispatch(fetchDisputes({
      ...filters,
      page: page + 1, // API expects 1-based index
      limit: rowsPerPage
    }));
  }, [dispatch, filters, page, rowsPerPage]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (newSize) => {
    setRowsPerPage(newSize);
    setPage(0); // Reset to first page when changing page size
  };

  const handleStatusFilterChange = (e) => {
    setFilters({ ...filters, status: e.target.value });
    setPage(0); // Reset to first page when filters change
  };

  const handleSearchChange = (e) => {
    setFilters({ ...filters, requester_id: e.target.value });
    setPage(0); // Reset to first page when filters change
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
      {!loading && !error && (
        <DisputesTable
          data={data}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      )}
    </Box>

  </Box>
  
    </Container>
    </DashboardLayout>
  );
};

export default DisputeDashboard;