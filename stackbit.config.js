import { ContentfulContentSource } from "@stackbit/cms-contentful";
import { defineStackbitConfig } from "@stackbit/types";

export default {
  stackbitVersion: "~0.8.4",
  ssgName: "nextjs",
  nodeVersion: "16",
  contentSources: [
    new ContentfulContentSource({
      spaceId: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
      environment: process.env.CONTENTFUL_ENVIRONMENT || "master",
      previewToken: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_TOKEN,
      deliveryToken: process.env.NEXT_PUBLIC_CONTENTFUL_DELIVERY_TOKEN,
      accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_MANAGEMENT_TOKEN,
    }),
  ],
  modelExtensions: [{ name: "product", type: "page", urlPath: "/{slug}" }],
};
