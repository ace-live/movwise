import { useMemo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  useTable,
  usePagination,
  useGlobalFilter,
  useSortBy,
} from "react-table";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Icon from "@mui/material/Icon";
import Autocomplete from "@mui/material/Autocomplete";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDPagination from "components/MDPagination";

import DataTableHeadCell from "examples/Tables/DataTable/DataTableHeadCell";
import DataTableBodyCell from "examples/Tables/DataTable/DataTableBodyCell";

function DataTable({
  entriesPerPage,
  canSearch,
  showTotalEntries,
  table,
  pagination,
  isSorted,
  noEndBorder,
  pageNo,
  setPageNo = () => {},
  totalPages = 1,
  handlePaginationTrigger = () => {},
  handleSearchTextChange = () => {},
}) {
  const defaultValue = entriesPerPage.defaultValue ?? 10;
  const entries = entriesPerPage.entries?.map((el) => el.toString()) ?? [
    "5",
    "10",
    "15",
    "20",
    "25",
  ];

  const columns = useMemo(() => table.columns, [table]);
  const data = useMemo(() => table.rows, [table]);

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: pageNo || 0 },
      manualPagination: true,
      pageCount: totalPages,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    page,
    canPreviousPage,
    canNextPage,
    gotoPage,
    setPageSize,
    state: { pageSize, globalFilter, pageIndex },
  } = tableInstance;

  // Prevent re-render loop: only call gotoPage when necessary
  useEffect(() => {
    if (pageIndex !== pageNo && pageNo >= 0 && pageNo < totalPages) {
      gotoPage(pageNo);
    }
  }, [pageNo, pageIndex, gotoPage, totalPages]);

  // Prevent re-render loop: only update pageSize when changed
  useEffect(() => {
    const defaultPageSize = defaultValue || 10;
    if (pageSize !== defaultPageSize) {
      setPageSize(defaultPageSize);
    }
  }, [defaultValue, pageSize, setPageSize]);

  const [search, setSearch] = useState(globalFilter);

  const setSortedValue = (column) => {
    if (!isSorted) return false;
    if (column.isSorted) return column.isSortedDesc ? "desc" : "asce";
    return "none";
  };

  const entriesStart = pageNo * pageSize + 1;
  const entriesEnd =
    pageNo === totalPages - 1
      ? data.length
      : Math.min((pageNo + 1) * pageSize, data.length);

  return (
    <TableContainer sx={{ boxShadow: "none" }}>
      {entriesPerPage || canSearch ? (
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          p={3}
        >
          {entriesPerPage && (
            <MDBox display="flex" alignItems="center">
              <Autocomplete
                disableClearable
                value={pageSize.toString()}
                options={entries}
                onChange={(event, newValue) => {
                  setPageSize(parseInt(newValue, 10));
                  setPageNo(0); // Reset to first page
                  handlePaginationTrigger(0);
                }}
                size="small"
                sx={{ width: "5rem" }}
                renderInput={(params) => <MDInput {...params} />}
              />
              <MDTypography variant="caption" color="secondary">
                &nbsp;&nbsp;entries per page
              </MDTypography>
            </MDBox>
          )}
          {canSearch && (
            <MDBox width="12rem" ml="auto">
              <MDInput
                placeholder="Search..."
                value={search}
                size="small"
                fullWidth
                onChange={({ currentTarget }) => {
                  handleSearchTextChange(currentTarget);
                  setSearch(currentTarget.value);
                }}
              />
            </MDBox>
          )}
        </MDBox>
      ) : null}

      <Table {...getTableProps()}>
        <MDBox component="thead">
          {headerGroups.map((headerGroup, key) => (
            <TableRow key={key} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, idx) => (
                <DataTableHeadCell
                  key={idx}
                  {...column.getHeaderProps(
                    isSorted && column.getSortByToggleProps()
                  )}
                  width={column.width || "auto"}
                  align={column.align || "left"}
                  sorted={setSortedValue(column)}
                >
                  {column.render("Header")}
                </DataTableHeadCell>
              ))}
            </TableRow>
          ))}
        </MDBox>

        <TableBody {...getTableBodyProps()}>
          {page.map((row, key) => {
            prepareRow(row);
            return (
              <TableRow key={key} {...row.getRowProps()}>
                {row.cells.map((cell, idx) => (
                  <DataTableBodyCell
                    key={idx}
                    noBorder={noEndBorder && rows.length - 1 === key}
                    align={cell.column.align || "left"}
                    {...cell.getCellProps()}
                  >
                    {cell.render("Cell")}
                  </DataTableBodyCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <MDBox
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        justifyContent="center"
        alignItems={{ xs: "flex-start", sm: "center" }}
        p={!showTotalEntries && totalPages === 1 ? 0 : 3}
      >
        {showTotalEntries && (
          <MDBox mb={{ xs: 3, sm: 0 }}>
            <MDTypography
              variant="button"
              color="secondary"
              fontWeight="regular"
            >
              Showing {entriesStart} to {entriesEnd} of {data.length} entries
            </MDTypography>
          </MDBox>
        )}
        {totalPages > 1 && (
          <MDPagination
            variant={pagination.variant || "gradient"}
            color={pagination.color || "info"}
            aria-label="pagination"
          >
            {canPreviousPage && (
              <MDPagination
                item
                onClick={() => {
                  const prev = Math.max(pageNo - 1, 0);
                  setPageNo(prev);
                  handlePaginationTrigger(prev);
                }}
              >
                <Icon sx={{ fontWeight: "bold" }}>chevron_left</Icon>
              </MDPagination>
            )}
            {(() => {
              const maxButtons = 5;
              let startPage = Math.max(pageNo - Math.floor(maxButtons / 2), 0);
              let endPage = startPage + maxButtons;

              if (endPage > totalPages) {
                endPage = totalPages;
                startPage = Math.max(endPage - maxButtons, 0);
              }

              return [...Array(endPage - startPage)].map((_, i) => {
                const page = startPage + i;
                return (
                  <MDPagination
                    key={page}
                    item
                    onClick={() => {
                      setPageNo(page);
                      handlePaginationTrigger(page);
                    }}
                    active={page === pageNo}
                  >
                    {page + 1}
                  </MDPagination>
                );
              });
            })()}
            {canNextPage && (
              <MDPagination
                item
                onClick={() => {
                  const next = Math.min(pageNo + 1, totalPages - 1);
                  setPageNo(next);
                  handlePaginationTrigger(next);
                }}
              >
                <Icon sx={{ fontWeight: "bold" }}>chevron_right</Icon>
              </MDPagination>
            )}
          </MDPagination>
        )}
      </MDBox>
    </TableContainer>
  );
}

DataTable.defaultProps = {
  entriesPerPage: { defaultValue: 10, entries: [5, 10, 15, 20, 25] },
  canSearch: false,
  showTotalEntries: true,
  pagination: { variant: "gradient", color: "info" },
  isSorted: true,
  noEndBorder: false,
  setPageNo: () => {},
  totalPages: 1,
};

DataTable.propTypes = {
  entriesPerPage: PropTypes.oneOfType([
    PropTypes.shape({
      defaultValue: PropTypes.number,
      entries: PropTypes.arrayOf(PropTypes.number),
    }),
    PropTypes.bool,
  ]),
  canSearch: PropTypes.bool,
  showTotalEntries: PropTypes.bool,
  table: PropTypes.objectOf(PropTypes.array).isRequired,
  pagination: PropTypes.shape({
    variant: PropTypes.oneOf(["contained", "gradient"]),
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "dark",
      "light",
    ]),
  }),
  isSorted: PropTypes.bool,
  noEndBorder: PropTypes.bool,
  pageNo: PropTypes.number.isRequired,
  setPageNo: PropTypes.func.isRequired,
  totalPages: PropTypes.number,
};

export default DataTable;
