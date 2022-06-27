type HTTPDefinition = {
  path: string,
  method: 'put' | 'get' | 'patch' | 'post' | 'delete';
}

export const SignUpHTTPDefinition: HTTPDefinition = {
  path: 'user',
  method: 'post'
}

export const UpdateUserHTTPDefinition: HTTPDefinition = {
  path: 'user',
  method: 'patch'
}

export const SignInHTTPDefinition: HTTPDefinition = {
  path: 'session',
  method: 'post'
}

export const SignOutHTTPDefinition: HTTPDefinition = {
  path: 'session',
  method: 'patch'
}

export const GetUserHTTPDefinition: HTTPDefinition = {
  path: 'user',
  method: 'get'
}

export const VerifyAccountHTTPDefinition: HTTPDefinition = {
  path: 'verification-token/:token',
  method: 'patch'
}

export const UpdateProfileImageHTTPDefinition: HTTPDefinition = {
  path: 'user/profile-image',
  method: 'post'
}

