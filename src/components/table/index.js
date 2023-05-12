import React, { useMemo, useEffect } from "react";

import {
  useGlobalFilter,
  usePagination,
  useTable,
  useRowSelect,
  useSortBy,
} from "react-table";

import { Col, Table, Row, Alert, Spinner } from "react-bootstrap";

import Search from "./Search";

import Actions from "./Actions";

import Pagination from "./Pagination";

import SelectBoxPageSize from "./SelectBoxPageSize";

import InnerActions from "./InnerActions";

import Checkbox from "./Checkbox";

import { useTranslation } from "react-i18next";

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
}) {
  // translation
  const { t } = useTranslation("common");

  // table data
  const tableData = useMemo(() => data || [], [data]);

  // table columns
  const tableColumns = useMemo(() => columns || [], [columns]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    state: { globalFilter, pageSize, pageIndex },
    setGlobalFilter,
    page,
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
    setPageSize(8);
  }, [setPageSize]);

  return (
    <section className="main-table-section">
      {/* top area  */}
      <div className="main-table__header-area">
        {/* search  and global actions */}
        {actions || search ? (
          <div className={`main-table-header ${tableHeaderClass}`}>
            <Row
              className={`align-items-center mb-xl ${
                !actions ? "" : "justify-content-end"
              }`}
            >
              <Col
                md="4"
                className={`d-flex ${!actions ? "" : "justify-content-end"}`}
              >
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
                  {page.map((row) => {
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
