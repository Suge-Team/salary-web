export const useAdminAuth = () =>
  useState("adminAuth", () => ({
    email: "",
    username: "",
    password: "",
  }));
