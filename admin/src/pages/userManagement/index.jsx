import React, { useEffect } from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { useDispatch, useSelector } from "react-redux";
import { fetchStatusUpdate, fetchUser } from "../../store/action";
import Tables from "layouts/tables";
import Switch from "@mui/material/Switch";
import { Tooltip } from "@mui/material";
import { Link } from "react-router-dom";

const UserManagement = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.reducerData);
  useEffect(() => {
    if (!userData?.user) {
      dispatch(fetchUser());
    }
  }, []);

  const handleStatusToggle = (userId, currentStatus) => {
    dispatch(fetchStatusUpdate(userId, currentStatus));
  };

  // Prepare columns and rows data for the table
  const columns = [
    { Header: "id", accessor: "id", align: "left" },
    { Header: "name", accessor: "name", align: "left" },
    { Header: "email", accessor: "email", align: "left" },
    { Header: "phone", accessor: "phone", align: "left" },
    { Header: "role", accessor: "role", align: "center" },
    { Header: "status", accessor: "status", align: "center" },
    { Header: "action", accessor: "action", align: "center" },
  ];

  // Build rows dynamically
  const rows = userData?.user?.map((user) => ({
    id: (
      <MDTypography variant="gradient" size="sm">
        {user.user_id}
      </MDTypography>
    ),
    name: (
      <MDTypography variant="gradient" size="sm">
        {user.name}
      </MDTypography>
    ),
    email: (
      <MDTypography variant="gradient" size="sm">
        {user.email}
      </MDTypography>
    ),
    phone: (
      <MDTypography variant="gradient" size="sm">
        {user.phone}
      </MDTypography>
    ),
    role: (
      <MDTypography variant="gradient" size="sm">
        {user.is_seller ? "Seller" : user.is_buyer ? "Buyer" : ""}
      </MDTypography>
    ),
    status: (
      <MDBox ml={-1}>
        <Tooltip title={user.status_desc} placement="right">
          <Switch
            checked={user.status}
            onChange={() => handleStatusToggle(user.user_id, user.status)}
          />
        </Tooltip>
      </MDBox>
    ),
    employed: (
      <MDTypography
        component="a"
        href="#"
        variant="caption"
        color="text"
        fontWeight="medium"
      >
        {new Date(user.created_at).toLocaleDateString("en-GB")}
      </MDTypography>
    ),
    action: (
      <Link to={`/user-management/edit/${user.user_id}`}>
        <MDTypography variant="caption" color="text" fontWeight="medium">
          Edit
        </MDTypography>
      </Link>
    ),
  }));
  // Assuming you have some DataTable component that takes columns and rows as props:
  return (
    <>
      {userData?.user?.length && (
        <Tables
          columns={columns ? columns : []}
          rows={rows ? rows : []}
          title={"User List"}
        />
      )}
    </>
  );
};

export default UserManagement;
