import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";

function Tables({
  columns,
  rows,
  title,
  pageNo,
  setPageNo,
  totalPages = 1,
  handlePaginationTrigger = () => {},
  handleSearchTextChange = () => {},
  dropdownFilter = null,
  handleDropdownFilterChange = () => {},
}) {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  {title}
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  canSearch={true}
                  noEndBorder={true}
                  pageNo={pageNo}
                  setPageNo={setPageNo}
                  totalPages={totalPages}
                  handlePaginationTrigger={handlePaginationTrigger}
                  handleSearchTextChange={handleSearchTextChange}
                  dropdownFilter={dropdownFilter}
                  handleDropdownFilterChange={handleDropdownFilterChange}
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Tables;
