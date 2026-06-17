export default {
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  // Singleton — only one document of this type should exist
  __experimental_actions: ["update", "publish"],
  fields: [
    {
      name: "siteName",
      title: "Site Name",
      type: "string",
      validation: (R) => R.required(),
    },
    {
      name: "tagline",
      title: "Tagline",
      type: "string",
    },
    {
      name: "description",
      title: "Meta Description",
      type: "text",
      rows: 3,
    },
    {
      name: "email",
      title: "Contact Email",
      type: "string",
    },
    {
      name: "phone",
      title: "Phone Number",
      type: "string",
    },
    {
      name: "whatsapp",
      title: "WhatsApp Link",
      type: "url",
    },
    {
      name: "instagram",
      title: "Instagram URL",
      type: "url",
    },
    {
      name: "youtube",
      title: "YouTube URL",
      type: "url",
    },
    {
      name: "twitter",
      title: "Twitter / X URL",
      type: "url",
    },
    {
      name: "facebook",
      title: "Facebook URL",
      type: "url",
    },
  ],
  preview: {
    select: { title: "siteName", subtitle: "tagline" },
  },
};
