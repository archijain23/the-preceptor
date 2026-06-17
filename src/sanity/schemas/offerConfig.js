export default {
  name: "offerConfig",
  title: "Offer / Pricing Config",
  type: "document",
  __experimental_actions: ["update", "publish"],
  fields: [
    {
      name: "offerEndDate",
      title: "Offer End Date & Time",
      type: "datetime",
      description:
        "When this date passes, the countdown timer disappears and prices revert to the original price shown on each service card.",
      validation: (R) => R.required(),
    },
    {
      name: "currentPrice",
      title: "Current (Offer) Price",
      type: "string",
      description: 'e.g. "$180"',
      initialValue: "$180",
    },
    {
      name: "originalPrice",
      title: "Original Price (shown struck-through)",
      type: "string",
      description: 'e.g. "$200"',
      initialValue: "$200",
    },
    {
      name: "sessionDuration",
      title: "Session Duration",
      type: "string",
      description: 'Shown on every service card. e.g. "60 min"',
      initialValue: "60 min",
    },
  ],
  preview: {
    select: {
      title: "currentPrice",
      subtitle: "offerEndDate",
    },
    prepare({ title, subtitle }) {
      return {
        title: `Offer Price: ${title}`,
        subtitle: subtitle
          ? `Ends: ${new Date(subtitle).toLocaleDateString()}`
          : "No end date set",
      };
    },
  },
};
