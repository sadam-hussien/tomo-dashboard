export const add_user_fields = [
  {
    id: "user-name-inp",
    type: "text",
    name: "name",
    placeholder: "user_user_name",
    icon: "las la-edit",
    noBorder: true,
    col: "12",
    label: "user_user_name",
    containerStyle: {
      flexDirection: "row-reverse",
    },
  },

  {
    id: "email-desc-inp",
    type: "email",
    name: "email",
    placeholder: "email_description",
    icon: "las la-edit",
    noBorder: true,
    col: "12",
    label: "email_description",
    containerStyle: {
      flexDirection: "row-reverse",
    },
  },

  {
    id: "user-role-inp",
    type: "radiobox",
    name: "role",
    noBorder: true,
    col: "12",
    label: "user_roles",
    options: ["admin", "specialist", "supervisor"],
  },

  {
    id: "user-password-inp",
    type: "password",
    name: "password",
    placeholder: "user_password",
    noBorder: true,
    col: "12",
    label: "user_password",
  },
  {
    id: "user-confirm-password-inp",
    type: "password",
    name: "confirm_password",
    placeholder: "user_confirm_password",
    noBorder: true,
    col: "12",
    label: "user_confirm_password",
  },
  {
    id: "status-active-inp",
    type: "switch",
    name: "status",
    col: "auto",
    labelInner: "active_user",
  },
];
