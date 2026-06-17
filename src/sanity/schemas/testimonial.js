export default {
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Client Name",
      type: "string",
      validation: (R) => R.required(),
    },
    {
      name: "country",
      title: "Location",
      type: "string",
      description: 'e.g. "New York, USA"',
    },
    {
      name: "text",
      title: "Testimonial Text",
      type: "text",
      rows: 4,
      validation: (R) => R.required(),
    },
    {
      name: "rating",
      title: "Star Rating",
      type: "number",
      validation: (R) => R.required().min(1).max(5),
      initialValue: 5,
    },
    {
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
      description: "Show this testimonial prominently on the home page.",
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
    select: { title: "name", subtitle: "country" },
  },
};
