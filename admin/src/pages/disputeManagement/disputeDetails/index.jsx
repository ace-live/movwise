// src/pages/DisputeDetail.js
import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  TextField,
  Box,
  Paper,
  Container,  
  Alert
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ChatPanel from '../dispute/chatPanel';
import { fetchDispute, updateDisputeStatus, clearDispute, fetchConversations } from '../../../store/action';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "../../../components/MDBox";
import MDTypography from "../../../components/MDTypography";
import { useState } from "react";

const DisputeDetail = () => {
  const { disputeId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: dispute, loading, error } = useSelector((state) => state.reducerData.dispute);
  const { data: conversations } = useSelector((state) => state.reducerData.conversations);
  const [resolutionNotes, setResolutionNotes] = React.useState('');
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    dispatch(fetchDispute(disputeId));
    dispatch(fetchConversations(disputeId));

    return () => {
      dispatch(clearDispute());
    };
  }, [dispatch, disputeId]);

  const handleStatusChange = (newStatus) => {
    if (!resolutionNotes.trim()) {
    setShowAlert(true);
    return;
  }
  setShowAlert(false);
    dispatch(updateDisputeStatus(disputeId, { 
      status: newStatus, 
      resolution: resolutionNotes 
    })).then(() => {
      if (newStatus === 'resolved' || newStatus === 'rejected') {
        navigate('/dispute-management');
      }
    
    });
  
  };

  if (loading) return <MDTypography>Loading...</MDTypography>;
  if (error) return <MDTypography color="error">Error: {error}</MDTypography>;
  if (!dispute) return null;

  return (
    <DashboardLayout>
      {/* <DashboardNavbar /> */}
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Button
        component={Link}
        to="/dispute-management"
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 2 }}
      >
        Back to Dashboard
      </Button>

      <MDTypography variant="h5" component="h2" gutterBottom>
        Dispute #{dispute.id}
      </MDTypography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <MDTypography variant="h6" gutterBottom>
                Dispute Details
              </MDTypography>
              <MDBox display="flex" py={1} pr={2}>
                    <MDTypography variant="button" fontWeight="bold" textTransform="capitalize">
                      Requester ID: &nbsp;
                    </MDTypography>
                    <MDTypography variant="button" fontWeight="regular" color="text">
                      &nbsp;{dispute.requester_id}
                    </MDTypography>
                </MDBox>
              
              <MDBox display="flex" py={1} pr={2}>
                    <MDTypography variant="button" fontWeight="bold" textTransform="capitalize">
                      Conveyancer ID: &nbsp;
                    </MDTypography>
                    <MDTypography variant="button" fontWeight="regular" color="text">
                      &nbsp;{dispute.conveyancer_id}
                    </MDTypography>
                </MDBox>
                <MDBox display="flex" py={1} pr={2}>
                    <MDTypography variant="button" fontWeight="bold" textTransform="capitalize">
                      Property Reference: &nbsp;
                    </MDTypography>
                    <MDTypography variant="button" fontWeight="regular" color="text">
                      &nbsp;{dispute.property_ref_id}
                    </MDTypography>
                </MDBox>
              <MDBox display="flex" py={1} pr={2}>
                    <MDTypography variant="button" fontWeight="bold" textTransform="capitalize">
                      Status: &nbsp;
                    </MDTypography>
                    <MDTypography variant="button" fontWeight="regular" color="text">
                      &nbsp;{dispute.status}
                    </MDTypography>
                </MDBox>
              <MDBox display="flex" py={1} pr={2}>
                    <MDTypography variant="button" fontWeight="bold" textTransform="capitalize">
                      Created At: &nbsp;
                    </MDTypography>
                    <MDTypography variant="button" fontWeight="regular" color="text">
                      &nbsp;{new Date(dispute.created_at).toLocaleDateString('en-GB')}
                    </MDTypography>
                </MDBox>
              <MDBox display="flex" py={1} pr={2}>
                    <MDTypography variant="button" fontWeight="bold" textTransform="capitalize">
                      Description: &nbsp;
                    </MDTypography>                    
                </MDBox>
              
        <MDBox mb={2} lineHeight={1}>
          
          <Paper variant="outlined" sx={{ p: 2, mb: 3 }} >
            <MDTypography variant="button" color="text" fontWeight="light">
            {dispute.description}
          </MDTypography>                
              </Paper>
        </MDBox>
              
              {showAlert && (
    <Alert severity="warning" sx={{ mb: 2 }}>
      Please enter resolution notes before resolving or rejecting the dispute.
    </Alert>
  )}
              <TextField
                label="Resolution Notes"
                multiline
                rows={4}
                fullWidth
                variant="outlined"
                required
                placeholder="Enter resolution notes here..."
                value={dispute.resolution || resolutionNotes}
                onChange={(e) => setResolutionNotes(e.target.value)}
                sx={{ mb: 2 }}
              />

              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="outlined"
                  color="info"
                  sx={{ color: 'success.main', borderColor: 'success.main' }}
                  onClick={() => handleStatusChange('resolved')}
                  disabled={dispute.status !== 'open'}
                >
                  Resolve
                </Button>
                <Button
                  variant="primary"
                  
                  onClick={() => handleStatusChange('rejected')}
                  disabled={dispute.status !== 'open'}
                  sx={{ color: 'error.main', borderColor: 'error.main' }}
                >
                  Reject
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <ChatPanel
            disputeId={disputeId}
            conversations={conversations || []}
          />
        </Grid>
      </Grid>
    </Container>
    </DashboardLayout>
  );
};

export default DisputeDetail;