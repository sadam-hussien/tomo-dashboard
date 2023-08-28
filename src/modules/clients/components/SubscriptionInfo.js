import React from "react";
import { Table } from "react-bootstrap";

export default function SubscriptionInfo({ handleCloe, data }) {
  return (
    <div style={{maxHeight:"600px"}} className="user-page overflow-auto">

      <div>
        <h4>الملف الصحي</h4>
        <Table bordered responsive className="w-auto">
        <thead> 
          <tr>
            <th>معدل التمرين</th>
            <th>معدل الحركة</th>
            <th>معدل الحركة</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>قليل (مره في الاسبوع)</td>
            <td>قليل (مره في الاسبوع)</td>
            <td>قليل (مره في الاسبوع)</td>
          </tr>
        </tbody>
      </Table>
      <Table bordered responsive className="w-auto">
        <thead> 
          <tr>
            <th>معدل التمرين</th>
            <th>معدل الحركة</th>
            <th>معدل الحركة</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>قليل (مره في الاسبوع)</td>
            <td>قليل (مره في الاسبوع)</td>
            <td>قليل (مره في الاسبوع)</td>
          </tr>
        </tbody>
      </Table>
      <Table bordered responsive className="w-auto">
        <thead> 
          <tr>
            <th>معدل التمرين</th>
            <th>معدل الحركة</th>
            <th>معدل الحركة</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>قليل (مره في الاسبوع)</td>
            <td>قليل (مره في الاسبوع)</td>
            <td>قليل (مره في الاسبوع)</td>
          </tr>
        </tbody>
      </Table>
      </div>

      <div>
        <h4>اسئلة الاشتراك</h4>
        <h6>معلومات التغذية</h6>
        <Table bordered responsive className="w-100">
        <thead> 
          <tr>
            <th>مواعيد الوجبات المتبع حاليا؟</th>
            <th>ما الاكلات التي تفضلوا تناولها؟</th>
            <th>ما الاكلات التي لا تفضلوا تناولها؟</th>
            <th>توقعات معينة للبرنامج الغذائي او نوع حمية معينة تفضلوا اتباعها؟</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>مثال:اصابه في الركبة</td>
            <td>مثال:السمك البيضوالفراخوالمكرونة</td>
            <td>مثال:التونة</td>
            <td>نعم</td>
          </tr>
        </tbody>
        </Table>
        <hr />
        <h6>معلومات التغذية</h6>
        <Table bordered responsive className="w-100">
        <thead> 
          <tr>
            <th>مواعيد الوجبات المتبع حاليا؟</th>
            <th>ما الاكلات التي تفضلوا تناولها؟</th>
            <th>ما الاكلات التي لا تفضلوا تناولها؟</th>
            <th>توقعات معينة للبرنامج الغذائي او نوع حمية معينة تفضلوا اتباعها؟</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>مثال:اصابه في الركبة</td>
            <td>مثال:السمك البيضوالفراخوالمكرونة</td>
            <td>مثال:التونة</td>
            <td>نعم</td>
          </tr>
        </tbody>
        </Table>

      </div>
    </div>
  );
}
