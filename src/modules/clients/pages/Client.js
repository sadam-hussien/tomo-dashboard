import { useFetch } from "hooks";

import { Link, useParams, useSearchParams } from "react-router-dom";

import { apiGetUserById } from "../server";

import { Spinner, Tab, Table, Tabs } from "react-bootstrap";

import { useTranslation } from "react-i18next";

import { useDispatch } from "react-redux";

import { openModal } from "store/global";

import { modalTypes } from "constants";

import { Modal } from "components";

import { AssignProgramToUser, ViewWeight, SubscriptionInfo, Measure } from "../components";

import { Edit } from "modules/programs/components";

import { client_trainings_columns } from "../columns";

import { Table as MyTable } from "components";

import DatePicker from "../components/DatePicker";
import LeftSide from "../components/LeftSide";
import Meals from "../components/Meals";
import Workout from "../components/Workout";
import Reports from "../components/Reports";
import Updates from "../components/Updates";


export default function Client() {
  const { id } = useParams();
  console.log(id)
  const { data, isLoading } = useFetch({
    queryKey: ["get-user", id],
    queryFn: () => apiGetUserById(id),
  });

  const { t } = useTranslation("common");


  const [searchParams, setSearchParams] = useSearchParams();

  const programType = searchParams.get("program_type") ? searchParams.get("program_type") : "food";


  return (
    <section className="user-page">
      {isLoading ? (
        <div style={{position:"absolute",inset:"0",display:"flex",justifyContent:"center",alignItems:"center"}} className="boxed">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <section className="client-page"> 
          <div className="client-container">
            <div>
              <div className="client-table">
                  <div>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"25px"}}>
                          <h2>{"تقرير اليوم"}</h2>
                          <div style={{display:"flex",alignItems:"center",fontWeight:"bold"}}>
                            <Link style={{color:"black"}} to='/clients'>{t("clients")}</Link>
                            <i class="las la-angle-left"></i>
                          </div>
                      </div>

                      <div className="d-flex align-items-center mb-5 border-bottom overflow-auto">
                        <Link
                          to={{
                            pathname: "",
                            search: "?program_type=food",
                          }}
                          className={`d-flex gap-3 pb-4 px-4 program-type align-items-center ${
                            programType === "food" || programType === null ? "active" : ""
                          }`}
                        >
                          <img
                            src="/assets/images/food-program.svg"
                            alt="food"
                            className="img-fluid"
                          />
                          <span>{t("food")}</span>
                        </Link>
                        <Link
                          to={{
                            pathname: "",
                            search: "?program_type=sporting",
                          }}
                          className={`d-flex gap-3 pb-4 px-4 program-type align-items-center ${
                            programType === "sporting" ? "active" : ""
                          }`}
                        >
                          <img
                            src="/assets/images/sporting-program.svg"
                            alt="food"
                            className="img-fluid"
                          />
                          <span>{t("sport")}</span>
                        </Link>
                        <Link
                          to={{
                            pathname: "",
                            search: "?program_type=reports",
                          }}
                          className={`d-flex gap-3 pb-4 px-4 program-type align-items-center ${
                            programType === "reports" ? "active" : ""
                          }`}
                        >
                          <img
                            src="/assets/images/sporting-program.svg"
                            alt="food"
                            className="img-fluid"
                          />
                          <span>{t("reports")}</span>
                        </Link>
                        <Link
                          to={{
                            pathname: "",
                            search: "?program_type=updates",
                          }}
                          className={`d-flex gap-3 pb-4 px-4 program-type align-items-center ${
                            programType === "updates" ? "active" : ""
                          }`}
                        >
                          <img
                            src="/assets/images/sporting-program.svg"
                            alt="food"
                            className="img-fluid"
                          />
                          <span>{t("updates")}</span>
                        </Link>
                      </div>

                      <div style={{width:"100%",backgroundColor:"#F7F8F9",padding:"10px",borderRadius:"8px"}}>
                        <DatePicker/>
                      </div> 
                  </div>
                {programType === "reports" ? <Reports/> : programType === "updates" ? <Updates/> : null}
              </div>

              {programType === "food" ? <Meals/> : programType === "sporting" ? <Workout/> : null}

            </div>
            <LeftSide items={data?.data}/>
          </div>
        </section>
      )}

      <Modal
        // edit={<AssignProgramToUser />}
        info={<SubscriptionInfo />}
        view={<ViewWeight />}
        measure={<Measure />}
      ></Modal>
    </section>
  );
}


{/* <>
<div className="boxed">
  <div className="d-flex justify-content-between align-items-center mb-lg">
    <div className="d-flex align-items-center gap-3">
      {data.data.user?.profile?.avatar && (
        <img
          src={data.data.user.profile?.avatar}
          className="img-fluid user-page-avatar"
          alt="mahmoud hussien"
        />
      )}
      <h6 className="user-page-name mb-0">{data.data.user.name}</h6>
    </div>
    <div className="user-page-subscription d-flex align-items-center justify-content-center text-center">
      مشترك في 90 يوم
    </div>
  </div>

  <h5 className="user-personal-info">المعلومات الشخصية</h5>
  <Table bordered responsive className="w-auto">
    <thead>
      <tr>
        <th>الوزن</th>
        <th>الوزن المستهدف</th>
        <th>السن</th>
        <th>الطول</th>
        <th>الهدف</th>
        <th>البرنامج</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <div className="d-flex gap-1 justify-content-between align-items-center">
            <span>{data.data.user?.profile?.weight}kg</span>
            <button
              type="button"
              onClick={() =>
                dispatch(
                  openModal({
                    modal_type: modalTypes.view,
                    title: t("weights"),
                    ...data.data.user,
                  })
                )
              }
            >
              <img
                src="/assets/images/details-icon.svg"
                alt="details"
                className="img-fluid"
              />
            </button>
          </div>
        </td>
        <td>{data.data.user.profile?.plan?.name}</td>
        <td>25</td>
        <td>{data.data.user.profile?.height}</td>
        <td>{data.data.user.profile?.plan?.name}</td>
        <td className="large-td">
          <div className="d-flex gap-1 justify-content-between align-items-center">
            <span>
              {data.data.user.programs.length
                ? data.data.user.programs[0].name
                : ""}
            </span>
            <button
              type="button"
              onClick={
                () =>
                  dispatch(
                    openModal({
                      modal_type: modalTypes.edit,
                      title: t("assign_program_to_user"),
                      btnTitle: t("save"),
                      ...data.data.user.programs[0],
                    })
                  )
                // dispatch(
                //   openModal({
                //     modal_type: modalTypes.edit,
                //     title: t("assign_program_to_user"),
                //     btnTitle: t("save"),
                //     id,
                //   })
                // )
              }
            >
              <img
                src="/assets/images/edit-pen-red-icon.svg"
                alt="edit"
                className="img-fluid"
              />
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </Table>

  <h5 className="user-personal-info mt-lg">المعلومات الصحية</h5>
  <Table bordered responsive className="w-auto">
    <thead>
      <tr>
        <th>معدل التمرين</th>
        <th>معدل الحركة</th>
        <th>مكملات غذائية</th>
        <th>مشاكل صحية</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td className="large-td">
          {data.data.user?.profile?.weeklyExcersiceRate?.name}
        </td>
        <td className="large-td">
          {data.data.user?.profile?.dailyMovementRate?.name}
        </td>
        <td className="large-td">ليمتلييس</td>
        <td className="large-td">لا يوجد</td>
      </tr>
    </tbody>
  </Table>
</div>

<div className="boxed mt-xl">
  <h5 className="user-personal-info">التدريب</h5>

  <Tabs
    defaultActiveKey="meals"
    id="trainings-and-meals-tabs"
    className="mb-lg trainings-and-meals-tabs p-0 gap-5"
  >
    <Tab eventKey="meals" title="الوجبات">
      <div>
        <MyTable
          tableHeaderClass="trainings-and-meals-tabs-search"
          data={data.data?.user?.programs[0]?.mainMeals}
          columns={client_trainings_columns}
          isLoading={isLoading}
          search
          searchPlaceholder={t("search_about_day_meal")}
        />
      </div>
    </Tab>
    <Tab eventKey="trainings" title="التمارين">
      hello 2
    </Tab>
  </Tabs>
</div>
</> */}