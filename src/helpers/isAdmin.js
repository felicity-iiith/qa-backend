export default function isAdminHelper(username) {
  return config.get("admins").indexOf(username) != -1;
}
