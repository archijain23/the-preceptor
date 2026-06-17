import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/sanity/schemas";

export default defineConfig({
  name: "the-preceptor",
  title: "The Preceptor — CMS",

  projectId: process.env.SANITY_STUDIO_PROJECT_ID || "",
  dataset: process.env.SANITY_STUDIO_DATASET || "production",

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("⚙️ Site Settings")
              .id("siteSettings")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings")
              ),
            S.listItem()
              .title("⏰ Offer Config")
              .id("offerConfig")
              .child(
                S.document()
                  .schemaType("offerConfig")
                  .documentId("offerConfig")
              ),
            S.divider(),
            S.documentTypeListItem("service").title("✨ Services"),
            S.documentTypeListItem("testimonial").title("💬 Testimonials"),
            S.documentTypeListItem("faq").title("❓ FAQs"),
            S.documentTypeListItem("achievement").title("🏆 Achievements"),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
