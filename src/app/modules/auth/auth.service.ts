const logInUser = async (payload: { email: string; password: string }) => {
  console.log("Logging in user...", payload);
};

export const authService = {
  logInUser,
};
