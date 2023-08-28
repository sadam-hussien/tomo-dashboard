import React from "react";
import { Table } from "react-bootstrap";

export default function ViewWeight({ handleCloe, data }) {
  return (
    <div className="user-page">
      <Table bordered responsive className="w-auto">
        <thead> 
          <tr>
            <th>الوزن المستهدف</th>
            <th>هدف العميل</th>
            <th>الوزن الحالي</th>
            <th>نسبه تحقيق الهدف</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{data.data?.userGoal[0]?.value}Kg</td>
            <td>{data.data?.profile?.plan?.name}</td>
            <td>{data.data?.profile?.weight}</td>
            <td>{Math.round(data.data?.userGoal[0]?.value*100/data.data?.profile?.weight)}%</td>
          </tr>
        </tbody>
      </Table>

      <Table bordered responsive className="w-100">
        <thead>
          <tr>
            <th>الشهر</th>
            <th>الوزن</th>
          </tr>
        </thead>
        <tbody>

          <tr>
            <td>
              <span className="ms-2">الشهر الرابع</span>
              <small>1/7/2023</small>
            </td>
            <td>{data.data?.userGoal[0]?.value}Kg</td>
          </tr>
          <tr>
            <td>
              <span className="ms-2">الشهر الرابع</span>
              <small>1/7/2023</small>
            </td>
            <td>{data.data?.userGoal[0]?.value}Kg</td>
          </tr>
          <tr>
            <td>
              <span className="ms-2">الشهر الرابع</span>
              <small>1/7/2023</small>
            </td>
            <td>{data.data?.userGoal[0]?.value}Kg</td>
          </tr>
          <tr>
            <td>
              <span className="ms-2">الشهر الرابع</span>
              <small>1/7/2023</small>
            </td>
            <td>{data.data?.userGoal[0]?.value}Kg</td>
          </tr>

        </tbody>
      </Table>
    </div>
  );
}
