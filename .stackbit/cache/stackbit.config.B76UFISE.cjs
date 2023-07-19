var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// stackbit.config.js
var stackbit_config_exports = {};
__export(stackbit_config_exports, {
  default: () => stackbit_config_default
});
module.exports = __toCommonJS(stackbit_config_exports);
var import_cms_contentful = require("../../node_modules/@stackbit/cms-contentful/dist/index.js");
var import_types = require("../../node_modules/@stackbit/types/dist/index.js");
var stackbit_config_default = {
  stackbitVersion: "~0.8.4",
  ssgName: "nextjs",
  nodeVersion: "16",
  contentSources: [
    new import_cms_contentful.ContentfulContentSource({
      spaceId: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
      environment: process.env.CONTENTFUL_ENVIRONMENT || "master",
      previewToken: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_TOKEN,
      deliveryToken: process.env.NEXT_PUBLIC_CONTENTFUL_DELIVERY_TOKEN,
      accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_MANAGEMENT_TOKEN
    })
  ],
  modelExtensions: [{ name: "product", type: "page", urlPath: "/{slug}" }]
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=stackbit.config.B76UFISE.cjs.map
