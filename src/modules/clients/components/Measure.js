import React from "react";
import { Table } from "react-bootstrap";

export default function Measure({ handleCloe, data }) {
  const bodyParts = ["الكتف","الذراع","الصدر","الخصر"]

  return (
    <div className="user-page-measure">
      <div className="user-page-measure-container">
        <div className="measure-cards">
        {bodyParts.map((e,idx)=>{
            return(
              <div className="measure-card"
              style={{
                marginBottom:`${idx === 0 ? "20px" : "0"}`,
              }}
            >
              <p style={{margin:"0",fontWeight:"bold"}}>{e}</p>
              <p style={{margin:"0",color:"#999999"}}>قبل <span style={{color:"#FF725E",fontWeight:"bold"}}>50 سم</span></p>
              <p style={{margin:"0",color:"#999999",fontSize:"14px",}}>بعد <span style={{color:"#2AD7A1",fontWeight:"bold"}}>50 سم</span></p>
            </div>
            )
        })}
        </div>
        <div
              style={{
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                textAlign: "center",
                borderRadius: "10px",
                width:"90px",
                height:"80px",
                padding:"8px",
                fontSize:"13px",
                position:"absolute",
                top:"76%",
                left:"43%",
              }}
            >
              <p style={{margin:"0",fontWeight:"bold",}}>الفخذ</p>
              <p style={{margin:"0",color:"#999999"}}>قبل <span style={{color:"#FF725E"}}>50 سم</span></p>
              <p style={{margin:"0",color:"#999999",fontSize:"14px",}}>بعد <span style={{color:"#2AD7A1"}}>50 سم</span></p>
          </div>
          <div className="arrow1">
            <img src="/assets/images/Vector5.png" alt="" />
          </div>
          <div className="arrow2">
            <img src="/assets/images/Vector6.png" alt="" />
          </div>
          <div className="arrow3">
            <img src="/assets/images/Vector7.png" alt="" />
          </div>
          <div className="arrow4">
            <img src="/assets/images/Vector8.png" alt="" />
          </div>
          <div className="arrow5">
            <img src="/assets/images/Vector9.png" alt="" />
          </div>
        <div style={{paddingTop:"10px"}}>
          <img src="/assets/images/muscularman.png" alt="" />
        </div>
      </div>
    </div>
  );
}
