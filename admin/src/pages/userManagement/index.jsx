import React, { useEffect, useState } from "react";
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
  const [pageNo, setPageNo] = useState(0); // current page (zero-based)

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  const handleStatusToggle = (userId, currentStatus) => {
    dispatch(fetchStatusUpdate(userId, currentStatus));
  };

  // Handle pagination trigger
  const handlePaginationTrigger = (newPageNo) => {
    setPageNo(newPageNo);
    dispatch(fetchUser(newPageNo));
  };

  const handleSearchTextChange = (event) => {
    const searchText = event.value;
    // If search text is provided, filter users based on the search text
    dispatch(fetchUser(0, searchText));
  };
  // Prepare columns and rows data for the table
  const columns = [
    { Header: "S No", accessor: "s_no", align: "left" },
    // { Header: "id", accessor: "id", align: "left" },
    { Header: "name", accessor: "name", align: "left" },
    { Header: "email", accessor: "email", align: "left" },
    { Header: "phone", accessor: "phone", align: "left" },
    // { Header: "role", accessor: "role", align: "center" },
    { Header: "status", accessor: "status", align: "center" },
    { Header: "action", accessor: "action", align: "center" },
  ];

  // Build rows dynamically
  const rows = userData?.user?.users?.map((user, index) => ({
    s_no: (
      <MDTypography variant="gradient" size="sm">
        {index + 1}
      </MDTypography>
    ),
    // id: (
    //   <MDTypography variant="gradient" size="sm">
    //     {user.user_id}
    //   </MDTypography>
    // ),
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
    // role: (
    //   <MDTypography variant="gradient" size="sm">
    //     {user.is_seller ? "Seller" : user.is_buyer ? "Buyer" : ""}
    //   </MDTypography>
    // ),
    status: (
      <MDBox ml={-1}>
        <Tooltip title={user.status_desc} placement="right">
          <Switch
            sx={{
              "& .MuiSwitch-switchBase.Mui-checked": {
                color: "#2e7d32 !important", // success.main from MUI theme
              },
              "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                backgroundColor: "#2e7d32 !important",
              },
            }}
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

  return (
    <Tables
      columns={columns ? columns : []}
      rows={rows ? rows : []}
      title={"User List"}
      pageNo={pageNo}
      setPageNo={setPageNo}
      totalPages={userData?.user?.totalPages || 1}
      handlePaginationTrigger={handlePaginationTrigger}
      handleSearchTextChange={handleSearchTextChange}
    />
  );
};

export default UserManagement;
