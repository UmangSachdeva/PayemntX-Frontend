export type LoginCreds = {
  username: string;
  password: string;
};

export type SignupCreds = {
  name: string;
  password: string;
  email: string;
};

export type Group = {
  status?: string;
};

export type UserDetailsResponse = {
  email: string;
  name: string;
  status: string;
};
