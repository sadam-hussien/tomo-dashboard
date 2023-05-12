import { Btn, CheckBoxInput, InputWithIcon } from "components";
import { Form, Formik } from "formik";
import { useFetch, usePost } from "hooks";

import { apiGetUsers } from "modules/users/server";

import { apiAssignProgramToUser } from "../server";

import { useState } from "react";

import { Spinner } from "react-bootstrap";

export default function ProgramToUser({ handleClose, data }) {
  const [search, setSearch] = useState("");

  // get users
  const { data: usersData, isLoading } = useFetch({
    queryKey: ["get-user-to-assign", search],
    queryFn: () => apiGetUsers({ search: search }),
  });

  const { mutate, isLoading: isLoadingMutate } = usePost({
    queryFn: apiAssignProgramToUser,
    onSuccess: () => handleClose(),
  });

  function handleSubmit(values) {
    mutate({
      programId: data.data.id,
      ...values,
    });
  }

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
                  {usersData.data?.leaders.map((item) => (
                    <div
                      className="d-flex align-items-center justify-content-between list-of-users-user"
                      key={item.user.id}
                    >
                      <div className="d-flex align-items-center gap-2">
                        <img
                          src={
                            item.user?.profile?.avatar ||
                            "/assets/images/user-placeholder.png"
                          }
                          alt={item.user?.name}
                          className="img-fluid list-of-users-img"
                        />
                        <span className="list-of-users-user-name">
                          {item.user?.name}
                        </span>
                      </div>

                      <CheckBoxInput
                        // containerStyle,
                        // style,
                        id={item.user?.id}
                        name="userId"
                        value={item.user?.id}
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
