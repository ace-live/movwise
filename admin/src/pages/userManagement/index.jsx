// import React, { useEffect } from "react";
// import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";
// import MDAvatar from "components/MDAvatar";
// import MDBadge from "components/MDBadge";

// // Images
// import team2 from "assets/images/team-2.jpg";
// import team3 from "assets/images/team-3.jpg";
// import team4 from "assets/images/team-4.jpg";

// import { useDispatch, useSelector } from "react-redux";
// import { fetchUser } from "../../store/action";

// const UserManagement = () => {
//   const dispatch = useDispatch();
//   const { userData } = useSelector((state) => state.reducerData);

//   useEffect(() => {
//     // Check if userData is already available
//     if (!userData?.user) {
//       // dispatch(fetchUser());
//     }
//   }, []);
//   const Author = ({ image, name, email }) => (
//     <MDBox display="flex" alignItems="center" lineHeight={1}>
//       <MDAvatar src={image} name={name} size="sm" />
//       <MDBox ml={2} lineHeight={1}>
//         <MDTypography display="block" variant="button" fontWeight="medium">
//           {name}
//         </MDTypography>
//         <MDTypography variant="caption">{email}</MDTypography>
//       </MDBox>
//     </MDBox>
//   );

//   const Job = ({ title, description }) => (
//     <MDBox lineHeight={1} textAlign="left">
//       <MDTypography
//         display="block"
//         variant="caption"
//         color="text"
//         fontWeight="medium"
//       >
//         {title}
//       </MDTypography>
//       <MDTypography variant="caption">{description}</MDTypography>
//     </MDBox>
//   );

//   return {
//     title: "User List",
//     columns: [
//       { Header: "author", accessor: "author", width: "45%", align: "left" },
//       { Header: "function", accessor: "function", align: "left" },
//       { Header: "status", accessor: "status", align: "center" },
//       { Header: "employed", accessor: "employed", align: "center" },
//       { Header: "action", accessor: "action", align: "center" },
//     ],

//     rows: [
//       {
//         author: (
//           <Author
//             image={team2}
//             name="John Michael"
//             email="john@creative-tim.com"
//           />
//         ),
//         function: <Job title="Manager" description="Organization" />,
//         status: (
//           <MDBox ml={-1}>
//             <MDBadge
//               badgeContent="online"
//               color="success"
//               variant="gradient"
//               size="sm"
//             />
//           </MDBox>
//         ),
//         employed: (
//           <MDTypography
//             component="a"
//             href="#"
//             variant="caption"
//             color="text"
//             fontWeight="medium"
//           >
//             23/04/18
//           </MDTypography>
//         ),
//         action: (
//           <MDTypography
//             component="a"
//             href="#"
//             variant="caption"
//             color="text"
//             fontWeight="medium"
//           >
//             Edit
//           </MDTypography>
//         ),
//       },
//       {
//         author: (
//           <Author
//             image={team3}
//             name="Alexa Liras"
//             email="alexa@creative-tim.com"
//           />
//         ),
//         function: <Job title="Programator" description="Developer" />,
//         status: (
//           <MDBox ml={-1}>
//             <MDBadge
//               badgeContent="offline"
//               color="dark"
//               variant="gradient"
//               size="sm"
//             />
//           </MDBox>
//         ),
//         employed: (
//           <MDTypography
//             component="a"
//             href="#"
//             variant="caption"
//             color="text"
//             fontWeight="medium"
//           >
//             11/01/19
//           </MDTypography>
//         ),
//         action: (
//           <MDTypography
//             component="a"
//             href="#"
//             variant="caption"
//             color="text"
//             fontWeight="medium"
//           >
//             Edit
//           </MDTypography>
//         ),
//       },
//     ],
//   };
// };

// export default UserManagement;

import React, { useEffect } from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDBadge from "components/MDBadge";
import { useDispatch, useSelector } from "react-redux";
import { fetchStatusUpdate, fetchUser } from "../../store/action";
import Tables from "layouts/tables";
import Switch from "@mui/material/Switch";

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
        <MDBadge
          badgeContent={
            user.status_desc || (user.status ? "Active" : "Inactive")
          }
          color={user.status ? "success" : "dark"}
          variant="gradient"
          size="sm"
        />
        <Switch
          checked={user.status}
          onChange={() => handleStatusToggle(user.user_id, user.status)}
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
        />
      )}
    </>
  );
};

export default UserManagement;
