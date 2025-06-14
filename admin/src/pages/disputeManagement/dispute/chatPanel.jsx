// src/components/ChatPanel.js
import React, { useState } from 'react';
import {
  Box,
  Paper,
  TextField,
  IconButton,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import SendIcon from '@mui/icons-material/Send';
import { useDispatch } from 'react-redux';
import { sendMessage } from '../../../store/action';


const ChatPanel = ({ disputeId, conversations }) => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');
  const currentUserId = 1; // Should come from auth context

  const handleSend = () => {
    if (message.trim()) {
      dispatch(sendMessage(disputeId, {
        sender_id: currentUserId,
        receiver_id: 1, // Should be dynamic based on dispute
        message: message,
      }));
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Paper sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <MDBox
        sx={{
          p: 2,
          overflowY: 'auto',
          flexGrow: 1,
          maxHeight: 'calc(100% - 72px)',
        }}
      >
        <List>
          {conversations.map((msg, index) => (
            <ListItem
              key={index}
              sx={{
                justifyContent:
                  msg.sender_id === currentUserId ? 'flex-end' : 'flex-start',
              }}
            >
              {msg.sender_id !== currentUserId && (
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'primary.main' }}>U</Avatar>
                </ListItemAvatar>
              )}
              <MDBox
                sx={{
                  maxWidth: '70%',
                  // bgcolor: msg.sender_id === currentUserId ? 'primary.light' : 'grey.200',
                  bgcolor: msg.sender_id === currentUserId ? 'primary.light' : 'grey.200',
                  color: msg.sender_id === currentUserId ? 'common.white' : 'text.primary',
                  p: 1.5,
                  marginBottom: 1,
                  borderRadius: 2,
                  ml: msg.sender_id === currentUserId ? 'auto' : 0,
                }}
              >
                <MDTypography variant="button" fontWeight="bold" >{msg.message}</MDTypography>
                {/* <MDTypography variant="body1"></MDTypography> */}
                <MDTypography
                  variant="caption"
                  display="block"
                  sx={{
                    textAlign: 'right',
                    color: msg.sender_id === currentUserId ? 'text.primary' : 'text.secondary',
                  }}
                >
                  {new Date(msg.sent_at).toLocaleString()}
                </MDTypography>
              </MDBox>
              {msg.sender_id === currentUserId && (
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'secondary.main' }}>A</Avatar>
                </ListItemAvatar>
              )}
            </ListItem>
          ))}
        </List>
      </MDBox>

      <MDBox sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type a message..."
          multiline
          maxRows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          InputProps={{
            endAdornment: (
              <IconButton
                edge="end"
                color="primary"
                onClick={handleSend}
                disabled={!message.trim()}
                sx={{ marginRight: 1 }}
              >
                <SendIcon />
              </IconButton>
            ),
          }}
        />
      </MDBox>
    </Paper>
  );
};

export default ChatPanel;