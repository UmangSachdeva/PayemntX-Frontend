export type AuthSuccessResponse = {
  data: {
    token: string;
    user: {
      email: string;
    };
  };
};
