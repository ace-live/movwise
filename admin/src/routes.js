import Dashboard from "layouts/dashboard";
// import SignIn from "layouts/authentication/sign-in";
// import SignUp from "layouts/authentication/sign-up";

// @mui icons
import Icon from "@mui/material/Icon";
import UserManagement from "pages/userManagement";
import ConveyancerManagement from "pages/conveyancerManagement";
import AddEditUser from "./pages/userManagement/addEditUser/addEditUser";
import DisputeDashboard from "./pages/disputeManagement/disputeDashboard";
import DisputeDetail from "./pages/disputeManagement/disputeDetails";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "User Management",
    key: "user-management",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/user-management",
    component: <UserManagement />,
  },
  {
    type: "route",
    key: "edit-user",
    route: "/user-management/edit/:id", // dynamic user ID
    component: <AddEditUser />, // or reuse AddUser with logic
  },
  {
    type: "collapse",
    name: "Conveyancer Management",
    key: "conveyancer-management",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/conveyancer-management",
    component: <ConveyancerManagement />,
  },
  {
    type: "collapse",
    name: "Dispute Management",
    key: "dispute-management",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/dispute-management",
    component: <DisputeDashboard />,
  },
  {
    type: "route",
    key: "dispute-detail",  
    route: "/dispute-management/:disputeId", // dynamic dispute ID
    component: <DisputeDetail />,
  },

  // {
  //   type: "collapse",
  //   name: "Sign In",
  //   key: "sign-in",
  //   icon: <Icon fontSize="small">login</Icon>,
  //   route: "/authentication/sign-in",
  //   component: <SignIn />,
  // },
  // {
  //   type: "collapse",
  //   name: "Sign Up",
  //   key: "sign-up",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "/authentication/sign-up",
  //   component: <SignUp />,
  // },
];

export default routes;
