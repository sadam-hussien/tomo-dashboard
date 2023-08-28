import { useTranslation } from "react-i18next";
import React from 'react'
import { Tab, Table, Tabs } from 'react-bootstrap'
import { clients_columns } from "../columns";
import { useFetch } from "hooks";
import { apiGetUserById, apiGetUsers } from "../server";

import { useDispatch } from "react-redux";
import { openModal } from "store/global";
import { modalTypes } from "constants";
import { Modal } from "components";
import { client_trainings_columns } from "../columns";
import { Table as MyTable } from "components";
import { useParams } from "react-router-dom";


const Updates = () => {

const { t } = useTranslation();

  const { id } = useParams();

  console.log(id)
  const { data, isLoading } = useFetch({
    queryKey: ["get-user", id],
    queryFn: () => apiGetUserById(id),
  });

  const dispatch = useDispatch();

  return (
  <>
    <div className="boxed">
      <h5 className="user-personal-info">المعلومات الشخصية</h5>
      <Table bordered responsive className="w-100%">
        <thead style={{backgroundColor:"#F7F8F9"}}>
          <tr>
            <th>التحديث</th>
            <th>التاريخ</th>
            <th>بواسطه</th> 
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>تم الاشتراك في باقة 90 يوم</td>
            <td>1/7/2023</td>
            <td>العميل</td>
          </tr>
          <tr>
            <td>تم الاشتراك في باقة 90 يوم</td>
            <td>1/7/2023</td>
            <td>العميل</td>
          </tr>
          <tr>
            <td>تم الاشتراك في باقة 90 يوم</td>
            <td>1/7/2023</td>
            <td>العميل</td>
          </tr>
        </tbody>
      </Table>
    </div>
  </>
  )
}

export default Updates