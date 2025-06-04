import React, { useEffect } from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDBadge from "components/MDBadge";

import { useDispatch, useSelector } from "react-redux";
import { fetchConveyencerList } from "../../store/action";
import Tables from "layouts/tables";

const ConveyancerManagement = () => {
  const dispatch = useDispatch();
  const { userData, conveyencerData } = useSelector(
    (state) => state.reducerData
  );

  useEffect(() => {
    if (!conveyencerData?.data) {
      dispatch(fetchConveyencerList());
    }
  }, []);

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
        <MDBadge
          badgeContent={
            user.status_desc || (user.status ? "Active" : "Inactive")
          }
          color={user.status ? "success" : "dark"}
          variant="gradient"
          size="sm"
        />
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
      <MDTypography
        component="a"
        href="#"
        variant="caption"
        color="text"
        fontWeight="medium"
      >
        Edit
      </MDTypography>
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
          user={userData?.user}
        />
      )}
    </>
  );
};

export default ConveyancerManagement;
