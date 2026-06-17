export default {
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Service Title",
      type: "string",
      validation: (R) => R.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (R) => R.required(),
    },
    {
      name: "badge",
      title: "Badge Label",
      type: "string",
      description: 'e.g. "Quick Session", "In-Depth", "Vedic · Sade Sati"',
    },
    {
      name: "icon",
      title: "Icon Name",
      type: "string",
      description: "Lucide icon key used in the UI (e.g. Star, Heart, Briefcase)",
      options: {
        list: [
          { title: "Star", value: "Star" },
          { title: "BookOpen", value: "BookOpen" },
          { title: "Heart", value: "Heart" },
          { title: "HeartHandshake", value: "HeartHandshake" },
          { title: "Rings (Moon fallback)", value: "Rings" },
          { title: "Briefcase", value: "Briefcase" },
          { title: "Saturn (Sparkles fallback)", value: "Saturn" },
          { title: "Hourglass (Moon fallback)", value: "Hourglass" },
          { title: "Orbit (Sparkles fallback)", value: "Orbit" },
          { title: "Compass", value: "Compass" },
          { title: "Moon", value: "Moon" },
          { title: "Sparkles", value: "Sparkles" },
        ],
      },
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      validation: (R) => R.required(),
    },
    {
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower number appears first. Home page shows the first 4.",
    },
    {
      name: "showOnHome",
      title: "Show on Home Page",
      type: "boolean",
      initialValue: false,
      description: "Toggle to feature this service in the home page Services section.",
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
    select: { title: "title", subtitle: "badge" },
  },
};
