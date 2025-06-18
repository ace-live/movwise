import React, { useEffect, useState } from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchConveyancerList,
  fetchConveyancerStatus,
} from "../../store/action";
import Tables from "layouts/tables";
import Switch from "@mui/material/Switch";

const ConveyancerManagement = () => {
  const dispatch = useDispatch();
  const { conveyancerData } = useSelector((state) => state.reducerData);
  const [pageNo, setPageNo] = useState(0); // current page (zero-based)

  useEffect(() => {
    if (!conveyancerData?.data?.conveyancer) {
      dispatch(fetchConveyancerList());
    }
  }, []);

  const handleStatusToggle = (userId, currentStatus) => {
    dispatch(fetchConveyancerStatus(userId, currentStatus));
  };

  const handleSearchTextChange = (event) => {
    const searchText = event.value;
    // If search text is provided, filter users based on the search text
    dispatch(fetchConveyancerList(0, searchText));
  };

  // Prepare columns and rows data for the table
  const columns = [
    { Header: "id", accessor: "id", align: "left" },
    { Header: "name", accessor: "name", align: "left" },
    { Header: "email", accessor: "email", align: "left" },
    { Header: "phone", accessor: "phone", align: "left" },
    { Header: "status", accessor: "status", align: "center" },
    // { Header: "Profile", accessor: "Profile", align: "center" },
    { Header: "action", accessor: "action", align: "center" },
  ];

  // Build rows dynamically
  const rows = conveyancerData?.data?.conveyancer?.map((user) => ({
    id: (
      <MDTypography variant="gradient" size="sm">
        {user.id}
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
    // Profile: (
    //   <MDTypography variant="gradient" size="sm">
    //     {user.is_seller ? "Seller" : user.is_buyer ? "Buyer" : ""}
    //   </MDTypography>
    // ),
    status: (
      <MDBox ml={-1}>
        <Switch
          checked={user.is_verified}
          onChange={() => handleStatusToggle(user.id, user.is_verified)}
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

  // Handle pagination trigger
  const handlePaginationTrigger = (newPageNo) => {
    setPageNo(newPageNo);
    dispatch(fetchConveyancerList(newPageNo));
  };

  return (
    <Tables
      columns={columns ? columns : []}
      rows={rows ? rows : []}
      title={"Conveyancer List"}
      user={conveyancerData?.data?.conveyancer}
      pageNo={pageNo}
      setPageNo={setPageNo}
      totalPages={conveyancerData?.data?.totalPages || 1}
      handlePaginationTrigger={handlePaginationTrigger}
      handleSearchTextChange={handleSearchTextChange}
    />
  );
};

export default ConveyancerManagement;
