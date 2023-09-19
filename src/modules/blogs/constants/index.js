export const add_blogs_fields = [
  {
    id: "subscription-image",
    type: "file",
    name: "feature_image",
    col: "12",
    label: "subscription_image",
  },
  {
    id: "blog-radio-inp",
    type: "radiobox",
    options: [
      { label: "مقالي وصور ", value: "image_with_blog" },
      { label: "صور فقط ", value: "image" },
    ],
    name: "type",
    col: "12",
    label: "نوع الخبر",
  },
  {
    id: "blog-name-inp",
    type: "text",
    name: "name",
    placeholder: "blog_name",
    icon: "las la-edit",
    noBorder: true,
    col: "12",
    label: "blog_name",
    containerStyle: {
      flexDirection: "row-reverse",
    },
  },
  {
    id: "blog-body-inp",
    type: "textarea",
    name: "body",
    col: "12",
    label: "blog_body",
    placeholder: "blog_body",
    containerStyle: {
      flexDirection: "row-reverse",
    },
  },
  {
    id: "news-images",
    type: "file",
    name: "images",
    col: "12",
    label: "blog_image",
    multiple: true,
  },
  {
    id: "subscription-active-inp",
    type: "switch",
    name: "show",
    col: "auto",
    labelInner: "show_blog",
  },
];

export const edit_blogs_fields = [
  {
    id: "news-image",
    type: "file",
    name: "image",
    col: "12",
    label: "news_image",
  },

  {
    id: "blog_name-inp",
    type: "text",
    name: "name",
    placeholder: "blog_name",
    icon: "las la-edit",
    noBorder: true,
    col: "12",
    label: "blog_name",
    containerStyle: {
      flexDirection: "row-reverse",
    },
  },
];
