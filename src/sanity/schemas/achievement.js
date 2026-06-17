export default {
  name: "achievement",
  title: "Achievement",
  type: "document",
  fields: [
    {
      name: "value",
      title: "Value",
      type: "string",
      description: 'e.g. "12+", "8,400", "4.98"',
      validation: (R) => R.required(),
    },
    {
      name: "label",
      title: "Label",
      type: "string",
      description: 'e.g. "Years of Practice"',
      validation: (R) => R.required(),
    },
    {
      name: "order",
      title: "Display Order",
      type: "number",
    },
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "value", subtitle: "label" },
  },
};
