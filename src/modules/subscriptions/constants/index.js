export const add_subscription_fields = [
  {
    id: "subscription-image",
    type: "file",
    name: "image",
    col: "12",
    label: "subscription_image",
  },

  {
    id: "subscription-name-inp",
    type: "text",
    name: "name",
    placeholder: "subscription_name",
    icon: "las la-edit",
    noBorder: true,
    col: "12",
    label: "subscription_name",
    containerStyle: {
      flexDirection: "row-reverse",
    },
  },

  {
    id: "subscription-desc-inp",
    type: "textarea",
    name: "description",
    placeholder: "subscription_description",
    icon: "las la-edit",
    noBorder: true,
    col: "12",
    label: "subscription_description",
    containerStyle: {
      flexDirection: "row-reverse",
    },
  },

  {
    id: "subscription-price-inp",
    type: "text",
    name: "price",
    placeholder: "subscription_price",
    icon: "las la-edit",
    noBorder: true,
    col: "6",
    label: "subscription_price",
    containerStyle: {
      flexDirection: "row-reverse",
    },
  },

  {
    id: "subscription-after-price-inp",
    type: "text",
    name: "discount",
    placeholder: "subscription_after_price",
    icon: "las la-edit",
    noBorder: true,
    col: "6",
    label: "subscription_after_price",
    containerStyle: {
      flexDirection: "row-reverse",
    },
  },

  {
    id: "subscription-active-inp",
    type: "switch",
    name: "active",
    col: "auto",
    labelInner: "active_subscription",
  },

  {
    id: "subscription-discount-inp",
    type: "switch",
    name: "discount_status",
    col: "auto",
    labelInner: "active_discount",
  },
];
