/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./utils/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://neondb_owner:RbELtMm5XUK0@ep-white-lake-a5krh0jq.us-east-2.aws.neon.tech/neondb?sslmode=require",
  },
};
