import React, { useMemo, useEffect } from "react";

import {
  useGlobalFilter,
  usePagination,
  useTable,
  useRowSelect,
  useSortBy,
} from "react-table";

import { Col, Table, Row, Alert, Spinner, Button } from "react-bootstrap";

import Search from "./Search";

import Actions from "./Actions";

import Pagination from "./Pagination";

import SelectBoxPageSize from "./SelectBoxPageSize";

import InnerActions from "./InnerActions";

import Checkbox from "./Checkbox";

import { useTranslation } from "react-i18next";

import Btn from "../core/buttons/Btn";

import { useDispatch } from "react-redux";

import { openModal } from "store/global";

import { modalTypes } from "constants";


export default function MainTable({
  actions,
  search,
  searchPlaceholder,
  pagination,
  pageSizeOption = false,
  innerActions,
  selection,
  data,
  isLoading,
  columns,
  tableHeaderClass,
  grid = null,
  programPage
}) {
  // translation
  const { t } = useTranslation("common");
  // table data
  const tableData = useMemo(() => data || [], [data]);

  // table columns
  const tableColumns = useMemo(() => columns || [], [columns]);

  const [selectedProgram, setSelectedProgram] = React.useState(0);
  const [programs, setPrograms] = React.useState(["غذائي","رياضي"]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    state: { globalFilter, pageSize, pageIndex },
    setGlobalFilter,
    page,
    rows,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    selectedFlatRows,
  } = useTable(
    {
      columns: tableColumns,
      data: tableData,
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    // handle selection -> checkbox
    (hooks) => {
      hooks.visibleColumns.push((columns) => {
        if (selection) {
          return [
            {
              id: "selection",
              Header: ({ getToggleAllRowsSelectedProps }) => (
                <Checkbox {...getToggleAllRowsSelectedProps()} />
              ),
              Cell: ({ row }) => (
                <Checkbox {...row.getToggleRowSelectedProps()} />
              ),
              style: {
                width: "70px",
              },
              class: "select-inp",
            },
            ...columns,
          ];
        }
        return columns;
      });
    },

    // handle actions {deleting, view, edit, message}
    (hooks) => {
      hooks.visibleColumns.push((columns) => {
        if (innerActions) {
          return [
            ...columns,
            {
              id: "innerActions",
              Header: t("actions"),
              Cell: ({ row }) => (
                <InnerActions
                  {...row.getToggleRowSelectedProps()}
                  data={row.original}
                  actions={innerActions}  
                />
              ),
              style: {
                minWidth: "200px",
                maxWidth: "300px",
              },
            },
          ];
        }
        return columns;
      });
    }
  );

  useEffect(() => {
    // setPageSize(8);
  }, [setPageSize]);

  const dispatch = useDispatch();
  return (
    <section className="main-table-section">
      {/* top area  */}
      <div className="main-table__header-area">
        {/* search  and global actions */}
        {actions || search ? (
          <div className={`main-table-header ${tableHeaderClass}`}>
            <Row
              className={`align-items-center mb-xl  ${
                !actions ? "" : "justify-content-end"
              }`}
            >
              <Col
                md="4"
                className={`d-flex w-100 ${!actions ? "" : "justify-content-end"} ${programPage?"justify-content-between":""}`}
              >
                {programPage && <Btn
                    loading={false}
                    icon="las la-plus"
                    style={{minWidth: "159px", height: "48px",backgroundColor:"white",color:"var(--secondary)"}}
                    onClick={() =>
                      dispatch(
                        openModal({
                          modal_type: modalTypes.send,
                          title: "",
                          btnTitle: "",
                        })
                      )
                    }
                  >
                  <i className="las la-plus icon" style={{ fontSize: "20px" }}></i>
                  <span>{t("ارسال برنامج")}</span>
                  </Btn>}
                {search && (
                  <Search
                    searchPlaceholder={searchPlaceholder}
                    search={globalFilter}
                    setSearch={setGlobalFilter}
                  />
                )}
              </Col>
            </Row>
            {actions && (
              <Row className="align-items-center mb-xl">
                <Col sm={12}>
                  <Actions actions={actions} selectedRows={selectedFlatRows} />
                </Col>
              </Row>
            )}
          </div>
        ) : null}
      </div>

      {isLoading ? (
        <div className="d-flex justify-content-center ">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <>
        {programPage ?
          <div style={{display:"flex",cursor:"pointer",marginBottom:"20px",borderBottom:"solid 1px gray"}}>
          {programs.map((e,ix)=>{
            return(
              <div
                key={ix}
                style={{
                  color: selectedProgram === ix ? "red" : "initial",
                  paddingBottom: "4px",
                  position: "relative",
                  width:"80px"
                }}
                onClick={() => setSelectedProgram(ix)}
              >
                {e}
                {selectedProgram === ix && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: "-1px",
                      right: "0",
                      width: "50%",
                      borderBottom: "2px solid red",
                    }}
                  />
                )}
              </div>
            )
          })}
      </div>:null}
          {/* table  */}
          {!grid ? (
            <div className="main-table-content">
              <Table responsive {...getTableProps()} className="main-table m-0">
                {/* head  */}
                <thead>
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {
                        // Loop over the headers in each row
                        headerGroup.headers.map((column) => (
                          // Apply the header cell props
                          <th
                            {...column.getHeaderProps()}
                            style={column.style}
                            className={column.class}
                          >
                            {
                              // Render the header
                              typeof column.render("Header") === "string"
                                ? t(column.render("Header"))
                                : column.render("Header")
                            }
                          </th>
                        ))
                      }
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {rows.map((row) => {
                    // Prepare the row for display
                    prepareRow(row);
                    return (
                      // Apply the row props
                      <tr {...row.getRowProps()}>
                        {
                          // Loop over the rows cells
                          row.cells.map((cell) => {
                            // Apply the cell props
                            return (
                              <td
                                {...cell.getCellProps()}
                                className={cell.column.class}
                                style={cell.column.style}
                              >
                                {
                                  // Render the cell contents
                                  cell.render("Cell")
                                }
                              </td>
                            );
                          })
                        }
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          ) : (
            <div className="main-grid-content">
              <div>
                <Row {...grid.rows}>
                  {page.map((row) => {
                    prepareRow(row);
                    return (
                      <Col {...row.getRowProps()}>
                        {row.cells.map((cell, index) => {
                          return (
                            <div {...cell.getCellProps()} className="h-100">
                              {cell.render("Cell")}
                            </div>
                          );
                        })}
                      </Col>
                    );
                  })}
                </Row>
              </div>
            </div>
          )}

          {!tableData.length && (
            <Alert
              variant="secondary"
              className="table-not-found text-capitalize"
            >
              {t("no_items")}
            </Alert>
          )}

          {/* pagination  */}
          {/* <div className="main-table-footer">
            {pagination && (
              <Pagination
                options={{
                  canPreviousPage,
                  pageSize,
                  canNextPage,
                  pageOptions,
                  pageCount,
                  gotoPage,
                  nextPage,
                  previousPage,
                  pageIndex,
                }}
              />
            )}
          </div> */}

          {/* {pageSizeOption && (
                <Col md="4" className="d-flex justify-content-end">
                  <div className="table-page-size">
                    <SelectBoxPageSize
                      setPageSize={setPageSize}
                      pageSize={pageSize}
                    />
                  </div>
                </Col>
              )} */}
        </>
      )}
    </section>
  );
}
