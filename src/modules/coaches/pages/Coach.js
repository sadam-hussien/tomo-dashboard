
// export default function Coach() {
//   const { id } = useParams();

//   const { data, isLoading } = useFetch({
//     queryKey: ["get-coaches",id],
//     queryFn: apiGetCoaches,
//   });


import { DateInput, DynamicFileUploaderInput, InputsHandler, Modal, SwitchInput, Table, alertConfirmation } from "components";

import { useFetch, usePost } from "hooks";

import { apiGetCoaches, apiDeleteCoache, apiGetPrograms } from "../server";

import { coaches_columns } from "../columns";

import { useTranslation } from "react-i18next";


import { Link, useParams, useSearchParams } from "react-router-dom";

import LeftSide from "../components/LeftSide";

import DatePicker from "../components/DatePicker";
import { useRef, useState } from "react";

export default function Coach() {
  // translation
  const { t } = useTranslation("common");
  const { id } = useParams();
  // fetch users using react-query library
  const { isLoading: isLoadingCoaches, data: coachesData } = useFetch({
    queryKey: "get-coaches",
    queryFn: apiGetCoaches,
  });
  
  const [searchParams, setSearchParams] = useSearchParams();

  const programType = searchParams.get("program_type");

  const { isLoading: isLoadingPrograms, data: programsData } = useFetch({
    queryKey: ["get-programs", programType],
    queryFn: () =>
      apiGetPrograms({
        program_type: programType,
      }),
  });

  // delete coach
  const { mutate } = usePost({
    queryFn: apiDeleteCoache,
    queryKey: "get-coaches",
  });
  
  function handleSubmit(values) {
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    mutate(formData);
  }

  console.log(coachesData)

  const coachDetails = [{
    certification: "null",
    createdAt: "2023-08-13T19:33:48.528Z",
    deletedAt: null,
    description: "null",
    email: "ramy@gmail.test",
    experience: "طبيب صيديلي درست دبلوكه جامعه الفاهره ودبلوم سمنطبيب صيديلي درست دبلوكه جامعه الفاهره ودبلوم سم",
    id: "70fc711e-a8e8-4d3d-8ae2-2b97782b1506",
    image: "https://storage.googleapis.com/zajel/apple-app-store-travel-awards-globestamp-7-removebg-preview2.png",
    lang: "ar",
    name: "ramy",
    number_of_followers: 0,
    rate: 0,
    rates_number: 0,
    role: "supervisor",
    status: true,
    updatedAt: "2023-08-13T19:33:48.528Z",
    active:true,
    specialty:"احصائي تغذية",
    degree:"المؤهلات الدراسية",
    study:"طبيب صيديلي درست دبلوكه جامعه الفاهره ودبلوم سمنه",
    degree_img:["/assets/images/placholder.png","/assets/images/placholder.png","/assets/images/placholder.png","/assets/images/placholder.png"]
  }]


  const handleIconClick = () => {
    document.querySelector('input[placeholder="التاريخ"]').focus() 
  };

  return (
    <section className="coach-page"> 
        <div className="coach-container">
            <div className="coach-table">
                <div>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"25px"}}>
                        <h1>{coachDetails[0].name}</h1>
                        <div style={{display:"flex",alignItems:"center",fontWeight:"bold"}}>
                          <Link style={{color:"black"}} to='/coaches'>{t("coaches")}</Link>
                          <i class="las la-angle-left"></i>
                        </div>
                    </div>
                    <div style={{width:"100%",position:"relative"}}>
                      <DatePicker/>
                      <i onClick={handleIconClick} style={{position:"absolute",fontSize:"2rem",left:"0",top:"15%"}} class="las la-calendar"></i>
                    </div>
                </div>
                <Table
                data={coachDetails}
                filter={true}
                columns={coaches_columns}
                isLoading={isLoadingCoaches}
                tableHeaderClass="d-flex flex-row-reverse justify-content-between align-items-center"
                />
            </div>
          <LeftSide items={coachDetails}/>
        </div>
    </section>
  );
}

