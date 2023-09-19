import { useEffect, useMemo } from "react";

import { Col, Row, Spinner, Table, Alert } from "react-bootstrap";

import { useTranslation } from "react-i18next";

import { useTable, useRowSelect } from "react-table";

import Checkbox from "./Checkbox";

import { useDispatch, useSelector } from "react-redux";

import { addSelectedRows } from "store/global";

export default function Table2({
  data,
  columns,
  isLoading,
  grid = null,
  selection,
  dispatchSelectedRows,
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
    rows,
    selectedFlatRows,
  } = useTable(
    {
      columns: tableColumns,
      data: tableData,
    },
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
    }
  );

  useEffect(() => {
    if (selectedFlatRows && dispatchSelectedRows) {
      const getIds = selectedFlatRows.map((item) => item?.original?.id);
      dispatchSelectedRows(getIds);
    }
  }, [selectedFlatRows]);

  return (
    <section className="main-table-section">
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
                            style={column?.meta?.header?.style}
                            className={column?.meta?.header?.class}
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
                                className={cell.column?.meta?.row?.class}
                                style={cell.column?.meta?.row?.style}
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
                  {rows.map((row) => {
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
        </>
      )}
    </section>
  );
}
