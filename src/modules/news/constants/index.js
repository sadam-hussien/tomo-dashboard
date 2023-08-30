
export const add_news_fields = [
  {
    id: "subscription-image",
    type: "file",
    name: "image",
    col: "12",
    label: "subscription_image",
  },

  {
    id: "blog-radio-inp",
    type: "radiobox",
    options:["مقالي و صور","صور فقط"],
    name: "name",
    placeholder: "blog_name",
    icon: "las la-edit",
    noBorder: true,
    col: "12",
    label: "نوع الخبر",
    containerStyle: {
      flexDirection: "row-reverse",
    },
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
    id: "news-images",
    type: "video-file",
    name: "video",
    col: "12",
    label: "coach_video",
  },

  {
    id: "subscription-active-inp",
    type: "switch",
    name: "active",
    col: "auto",
    labelInner: "show_blog",
  },
];

export const edit_news_fields = [
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
