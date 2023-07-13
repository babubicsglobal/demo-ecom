import { ClientBuilder } from "@commercetools/sdk-client-v2";
import { createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";

const CTP_PROJECT_KEY = "app_storebics";

export const projectKey = CTP_PROJECT_KEY;

const authMiddlewareOptions = {
  host: "https://auth.us-central1.gcp.commercetools.com",
  projectKey,
  credentials: {
    clientId: "6FUN6BS81oC-CxRsy47JrDqB",
    clientSecret: "yGcyOVhnZ3CnD7Hyvq9Ki4TtsiDw-ch5",
  },
  scopes: [`manage_project:${projectKey}`],
};

const httpMiddlewareOptions = {
  host: "https://api.us-central1.gcp.commercetools.com",
};

const client = new ClientBuilder()
  .withProjectKey(projectKey)
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();

export const getApiRoot = () => {
  return createApiBuilderFromCtpClient(client);
};
