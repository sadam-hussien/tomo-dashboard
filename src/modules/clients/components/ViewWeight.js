import React from "react";
import { Table } from "react-bootstrap";

export default function ViewWeight({ handleCloe, data }) {
  return (
    <div className="user-page">
      <Table bordered responsive className="w-auto">
        <thead>
          <tr>
            <th>الوزن المستهدف</th>
            <th>البرنامج</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{data.data?.profile?.plan?.name}</td>
            <td>
              {data.data?.programs.length ? data.data?.programs[0].name : ""}
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
