import { HTTPDefinition } from "../types";

export const SignUpHTTPDefinition: HTTPDefinition = {
  path: "users",
  method: "post",
};

export const GoogleSignUpHTTPDefinition: HTTPDefinition = {
  path: "users/providers/google",
  method: "post",
};

export const AuthUpdateUserHTTPDefinition: HTTPDefinition = {
  path: "users",
  method: "patch",
};

export const SignInHTTPDefinition: HTTPDefinition = {
  path: "sessions",
  method: "post",
};

export const GoogleSignInHTTPDefinition: HTTPDefinition = {
  path: "sessions/providers/google",
  method: "post",
};

export const SignOutHTTPDefinition: HTTPDefinition = {
  path: "sessions",
  method: "patch",
};

export const GetUserHTTPDefinition: HTTPDefinition = {
  path: "users",
  method: "get",
};

export const VerifyAccountHTTPDefinition: HTTPDefinition = {
  path: "verification-tokens/:token",
  method: "patch",
};

export const UpdateProfileImageHTTPDefinition: HTTPDefinition = {
  path: "user/profile-images",
  method: "post",
};

export const ForgotPasswordRequestHTTPDefinition: HTTPDefinition = {
  path: "forgot-password-tokens",
  method: "post",
};

// export const VerifyForgotPasswordHTTPDefinition: HTTPDefinition = {
//   path: 'forgot-password-token/:token',
//   method: 'get'
// }

export const ResetPasswordHTTPDefinition: HTTPDefinition = {
  path: "users/passwords",
  method: "put",
};
