import convict from "convict";

// Define a schema
const config = convict({
  env: {
    doc: "The application environment.",
    format: ["production", "development", "test"],
    default: "development",
    env: "NODE_ENV"
  },
  port: {
    doc: "The port to bind.",
    format: "port",
    default: 8080,
    env: "PORT"
  },
  dburi: {
    doc:
      "The URI of the database. http://docs.sequelizejs.com/class/lib/sequelize.js~Sequelize.html#instance-constructor-constructor",
    format: "*",
    default: "sqlite://contest.db",
    env: "DBURI"
  },
  publicApiUrl: {
    doc:
      "The public URL of the API (for redirects to be provided to external APIs)",
    format: "url",
    default: "http://localhost:8080",
    env: "PUBLIC_API_URL"
  },
  publicFrontendUrl: {
    doc: "The public URL of the frontend (for redirects in browser)",
    format: "url",
    default: "http://localhost:3000",
    env: "PUBLIC_FRONTEND_URL"
  },
  startTime: {
    doc: "The start time of the contest",
    format: "timestamp",
    default: 0,
    env: "START_TIME"
  },
  endTime: {
    doc: "The end time of the contest",
    format: "timestamp",
    default: 1540405800000,
    env: "END_TIME"
  },
  admins: {
    doc: "Admins array",
    format: Array,
    default: ["admin"],
    env: "ADMINS"
  },
  maxSubmissions: {
    doc: "Max submissions per question",
    format: Number,
    default: 100,
    env: "MAX_SUBMISSIONS"
  },
  teamWebhookPassword: {
    doc: "Password for team webhook",
    format: String,
    default: "password",
    env: "TEAM_WEBHOOK_PASSWORD"
  }
});

// Perform validation
config.validate({ allowed: "strict" });

export default config;
