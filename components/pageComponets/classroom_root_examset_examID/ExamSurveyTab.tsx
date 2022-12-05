import { useState, useMemo } from "react";

import {
  useTable,
  useSortBy,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce,
} from "react-table";
import matchSorter from "match-sorter";

// Define a default UI for filtering
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length;

  return (
    <input
      value={filterValue || ""}
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      className="text-xs d-input d-input-sm"
      placeholder={`Search ${count} records...`}
    />
  );
}

// This is a custom filter UI for selecting
// a unique option from a list
function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    /* @ts-ignore */
    return [...options.values()];
  }, [id, preFilteredRows]);

  // Render a multi-select box
  return (
    <select
      className="text-xs d-select d-select-sm"
      value={filterValue}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter.matchSorter(rows, filterValue, {
    /* @ts-ignore */
    keys: [(row) => row.values[id]],
  });
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = (val) => !val;

function Table({ columns, data }) {
  const filterTypes = useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    []
  );

  const defaultColumn = useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  );

  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    allColumns,
    getToggleHideAllColumnsProps,
    state,
  } = useTable(
    {
      columns,
      data,
      defaultColumn, // Be sure to pass the defaultColumn option
      filterTypes,
    },
    useFilters,
    useGlobalFilter,
    useSortBy
  );

  // Render the UI for your table
  return (
    <>
      <div className="flex gap-2 p-2">
        {allColumns.map((column) => (
          <div key={column.id}>
            <label>
              <input type="checkbox" {...column.getToggleHiddenProps()} />{" "}
              {column.id}
            </label>
          </div>
        ))}
      </div>
      <table className="w-full d-table" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, i) => (
            <tr key={`tr_${i}`} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, ii) => (
                <th key={`tr_${i}_h_${ii}`}>
                  <p {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                  </p>
                  <div>{column.canFilter ? column.render("Filter") : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="" {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr key={`tr_${i}`} {...row.getRowProps()}>
                {row.cells.map((cell, ii) => {
                  return (
                    <td
                      key={`tr_${i}_h_${ii}`}
                      {...cell.getCellProps()}
                      style={{
                        position: ii == 0 ? "sticky" : "unset",
                        left: "0",
                      }}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export function ExamSurveyTab({ displayData }) {
  const columns = useMemo(
    () => [
      {
        Header: "Exam Demographics",
        columns: [
          {
            Header: "Name",
            accessor: "fullname",
          },
          {
            Header: "Gender",
            accessor: "gender",
            Filter: SelectColumnFilter,
            filter: "includes",
          },
          {
            Header: "Age",
            accessor: "age",
            Filter: false,
          },
          {
            Header: "Religion",
            accessor: "religion",
            Filter: SelectColumnFilter,
            filter: "includes",
          },
          {
            Header: "Course",
            accessor: "course",
            Filter: SelectColumnFilter,
            filter: "includes",
          },
          {
            Header: "Year",
            accessor: "year",
            Filter: SelectColumnFilter,
            filter: "includes",
          },
          {
            Header: "Section",
            accessor: "section",
            Filter: SelectColumnFilter,
            filter: "includes",
          },
          {
            Header: "Specialization",
            accessor: "specialization",
            Filter: SelectColumnFilter,
            filter: "includes",
          },
          {
            Header: "Municipality",
            accessor: "municipality",
            Filter: SelectColumnFilter,
            filter: "includes",
          },
          {
            Header: "Province",
            accessor: "province",
            Filter: SelectColumnFilter,
            filter: "includes",
          },
          {
            Header: "Family Type",
            accessor: "familyType",
            Filter: SelectColumnFilter,
            filter: "includes",
          },
          {
            Header: "Profile ID",
            accessor: "id",
            filter: "includes",
          },
        ],
      },
    ],
    []
  );

  const data = useMemo(() => {
    const _row = displayData.profile;

    return _row;
  }, []);

  return (
    <div className="overflow-scroll w-screen-xl overscroll-contain  max-h-[70vh] overflow-y-auto">
      <Table columns={columns} data={data} />
    </div>
  );
}
