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
    if (!userData?.user?.users) {
      dispatch(fetchUser(pageNo));
    }
  }, [pageNo]);

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
  const rows = userData?.user?.users?.map((user) => ({
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

  // Handle pagination trigger
  const handlePaginationTrigger = (newPageNo) => {
    setPageNo(newPageNo);
    dispatch(fetchUser(newPageNo));
  };

  return (
    <>
      {userData?.user?.users?.length ? (
        <Tables
          columns={columns ? columns : []}
          rows={rows ? rows : []}
          title={"User List"}
          pageNo={pageNo}
          setPageNo={setPageNo}
          totalPages={userData?.user?.totalPages || 1}
          handlePaginationTrigger={handlePaginationTrigger}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default UserManagement;
