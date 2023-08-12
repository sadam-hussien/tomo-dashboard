import { Btn, CheckBoxInput, InputWithIcon } from "components";
import { Form, Formik } from "formik";
import { useFetch, usePost } from "hooks";

import { apiGetUsers } from "modules/users/server";

import { apiAssignProgramToUser } from "../server";

import { useState } from "react";

import { Spinner } from "react-bootstrap";


import { apiGetPrograms} from "../server";

import { useDispatch } from "react-redux";

import { openModal } from "store/global";

import { modalTypes } from "constants";


export default function Send({ handleClose }) {
  const [search, setSearch] = useState("");

  const [selectedProgram, setSelectedProgram] = useState(0);

  const [programName,setProgramName] = useState([])

  // get users
  const { isLoading, data } = useFetch({
    queryKey: "gett-programs",
    queryFn: apiGetPrograms,
  });

  const [programs,setPrograms] = useState([
    {
      name:"برنامج غذائي"
    },
    {
      name:"برنامج رياضي"
    },
    {
      name:"برنامج غذائي"
    },
    {
      name:"برنامج رياضي"
    },
  ])

  const { mutate, isLoading: isLoadingMutate } = usePost({
    queryFn: apiAssignProgramToUser,
    onSuccess: () => handleClose(),
  });
  const dispatch = useDispatch();
  
  function handleSubmit(values) {
    mutate({
      programId: data.data.id,
      ...values,
    });
    console.log(values)
    console.log(programName)
    dispatch(
      openModal({
        modal_type: modalTypes.message,
        title: "",
        btnTitle: "",
      })
    )
  }
 
  const handleBoxChange = (checkBoxName) => {
    console.log('Parent - Red:', checkBoxName);
    if(programName.includes(checkBoxName)){
      setProgramName((prev) => prev.filter((name) => name !== checkBoxName));
    }else{
      setProgramName((prev)=>[...prev,checkBoxName])
    }
    console.log(programName)
  };

  return (
    <div className="assign-program-to-user">
      <InputWithIcon
        name="search-user"
        id="search-user"
        basic={{ onChange: (value) => setSearch(value) }}
        type="search"
        placeholder="أبحث عن عميل"
        noBorder
        containerStyle={{
          backgroundColor: "#F0F0F0",
          flexDirection: "row-reverse",
        }}
        icon="las la-search"
      />
      <div style={{display:"flex",gap:"40px",flexWrap:"wrap",marginBottom:"10px"}}>
        {programName.map((e,idx)=>{
          return(
            <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"33px",gap:"16px",padding:"8px 16px 8px 16px",borderRadius:"50px",backgroundColor:"rgba(208, 32, 73, 0.05)"}} key={idx}>
              {e}
              <div>x</div>
            </div>
          )
        })}
      </div>
      <div style={{display:"flex",justifyContent:"space-between",cursor:"pointer",paddingBottom:"20px"}}>
          {programs.map((e,ix)=>{
            return(
              <div
                key={ix}
                style={{
                  color: selectedProgram === ix ? "red" : "initial",
                  borderBottom: "1px solid gray",
                  paddingBottom: "4px",
                  position: "relative",
                  width:"220px"
                }}
                onClick={() => setSelectedProgram(ix)}
              >
                {e.name}
                {selectedProgram === ix && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: "-1px",
                      right: "0",
                      width: "55%",
                      borderBottom: "2px solid red",
                    }}
                  />
                )}
              </div>
            )
          })}
      </div>
      {isLoading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <div className="list-of-users">
          <Formik
            initialValues={{
              userId: [],
            }}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form>
                <div className="list-of-users-inner"> 
                  {data?.data.map((item) => (
                    <div
                      className="d-flex align-items-center justify-content-between list-of-users-user"
                      key={item.id}
                      style={{borderBottom:"1px solid",paddingBlock:"30px",margin:"0"}}
                    >
                      <div className="d-flex align-items-center gap-2">
                        <span className="list-of-users-user-name">
                          {item.name}
                        </span>
                      </div>
                      <CheckBoxInput
                        // containerStyle,
                        // style,
                        id={item.name}
                        name="userId"
                        value={item.id}
                        onChange={item.id}
                        onBoxChange={handleBoxChange}
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-lg d-flex justify-content-end">
                  <Btn
                    type="submit"
                    classes="list-of-users-submit-btn"
                    style={{
                      width: "100px",
                      height: "34px",
                      borderRadius: "15px",
                      minWidth: "auto",
                      padding: 0,
                    }}
                    loading={isLoadingMutate}
                  >
                    <div className="d-flex justify-content-center align-items-center gap-2">
                      <span>ارسال</span>
                      <i className="las la-paper-plane icon"></i>
                    </div>
                  </Btn>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
}
