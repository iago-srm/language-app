import {
  useApiCall,
  useApiCallSWR,
} from './hooks';
import {
  AxiosFetcher
} from './frameworks';
import {
  ISignUpAPIParams,
  ISignUpAPIResponse,
  SignUpHTTPDefinition,
  ISignInAPIParams,
  ISignInAPIResponse,
  SignInHTTPDefinition,
  SignOutHTTPDefinition,
  IGetUserAPIResponse,
  GetUserHTTPDefinition,
  IUpdateUserParams,
  IUpdateUserResponse,
  UpdateUserHTTPDefinition,
  IVerifyAccountParams,
  VerifyAccountHTTPDefinition,
  UpdateProfileImageHTTPDefinition,
  IForgotPasswordParams,
  IForgotPasswordResponse,
  ForgotPasswordRequestHTTPDefinition,
  IResetPasswordParams,
  IResetPasswordResponse,
  ResetPasswordHTTPDefinition,
  
} from '@language-app/common-core';
import {
  GetActivitiesHTTPDefinition,
  IGetActivities,
  NewActivityHTTPDefinition,
  IPostActivity,
  GetActivityHTTPDefinition,
  IGetActivity,
  PostStudentOutputHTTPDefinition,
  IPostStudentOutput,
  GetStudentOutputsHTTPDefinition,
  IGetStudentOutputs,
  GetStudentOutputHTTPDefinition,
  IGetStudentOutput,
  InsertFeedbackToActivityHTTPDefinition,
  IPostFeedbackToOutput,
  InsertAssociationInvitationHTTPDefinition,
  INewAssociationInvitation,
  GetAssociationInvitationHTTPDefinition,
  IGetAssociationInvitation
} from '@language-app/common-core';
import { useLanguage, handleAuthToken,useAuth } from '@contexts';
import { useEffect } from 'react';

export const AUTH_BASE_URL = `${process.env.NEXT_PUBLIC_AUTH_URL}`;
export const DOMAIN_BASE_URL = `${process.env.NEXT_PUBLIC_DOMAIN_URL}`;

const signInFetcher = new AxiosFetcher(AUTH_BASE_URL);
const authFetcher = new AxiosFetcher(AUTH_BASE_URL);
const domainFetcher = new AxiosFetcher(DOMAIN_BASE_URL);

signInFetcher.setInterceptor((res) => {
  handleAuthToken(res.data.token);
  return res;
});

export const setCommonHeaders = (header: string, value: any) => {
  const fetchers = [signInFetcher, authFetcher, domainFetcher];
  // console.log({header, value})
  fetchers.forEach(fetcher => fetcher.setHeader(header, value));
}

export const useApiBuilder = () => {

  const { tokenHeaderSet } = useAuth();
  const { language } = useLanguage();

  useEffect(() => {
    setCommonHeaders('X-Accept-Language',`${language};q=1`);
  }, [language]);

  const signUp = useApiCall<ISignUpAPIParams,ISignUpAPIResponse>
    ((args) => authFetcher[SignUpHTTPDefinition.method](SignUpHTTPDefinition.path, args));

  const signIn = useApiCall<ISignInAPIParams,ISignInAPIResponse>
    ((args) => signInFetcher[SignInHTTPDefinition.method](SignInHTTPDefinition.path, args));

  const signOut = useApiCall<void,void>
    ((args) => authFetcher[SignOutHTTPDefinition.method](SignOutHTTPDefinition.path, args));

  const updateUser = useApiCall<IUpdateUserParams,IUpdateUserResponse>
    ((args) => authFetcher[UpdateUserHTTPDefinition.method](UpdateUserHTTPDefinition.path, args));

  const verifyAccount = useApiCall<IVerifyAccountParams, void>
    (({token}) => authFetcher[VerifyAccountHTTPDefinition.method](`${VerifyAccountHTTPDefinition.path.split('/')[0]}/${token}`));

  const uploadProfileImage = useApiCall<any, any>
    ((args) => authFetcher[UpdateProfileImageHTTPDefinition.method](UpdateProfileImageHTTPDefinition.path, args));

  const useUser = (canFetch: boolean) => useApiCallSWR<IGetUserAPIResponse>(canFetch && GetUserHTTPDefinition.path,authFetcher[GetUserHTTPDefinition.method].bind(authFetcher), { revalidateOnFocus: false });

  const forgotPasswordRequest = useApiCall<IForgotPasswordParams, IForgotPasswordResponse>
    (({ email }) => authFetcher[ForgotPasswordRequestHTTPDefinition.method](ForgotPasswordRequestHTTPDefinition.path, { email }))

  const resetPassword = useApiCall<IResetPasswordParams,IResetPasswordResponse>
    ((args) => authFetcher[ResetPasswordHTTPDefinition.method](ResetPasswordHTTPDefinition.path, args));

  const getActivities = ({ 
    title, 
    cefr, 
    topics,
    contentTypes,
    isInProgress,
    isComplete,
    thisInstructorOnly
  }) => useApiCallSWR<IGetActivities["response"]>(
    tokenHeaderSet && `${GetActivitiesHTTPDefinition.path}`, 
    (url) => domainFetcher[GetActivitiesHTTPDefinition.method].bind(domainFetcher)(url, {
      title,
      cefr,
      topics,
      contentTypes: `${contentTypes}`, // turns array into ITEM,ITEM format,
      isInProgress,
      isComplete,
      thisInstructorOnly
    })
  );

  const postActivity = useApiCall<IPostActivity["params"], IPostActivity["response"]>
    ((args) => domainFetcher[NewActivityHTTPDefinition.method](NewActivityHTTPDefinition.path, args));

  const getActivity = useApiCall<IGetActivity["params"], IGetActivity["response"]>
    (({ id }) => {
      return domainFetcher[GetActivityHTTPDefinition.method](`${GetActivityHTTPDefinition.path.split('/')[0]}/${id}`)
    })

  const postStudentOutput = useApiCall<IPostStudentOutput["params"],IPostStudentOutput["response"]>
    ((args) => {
      return domainFetcher[PostStudentOutputHTTPDefinition.method](PostStudentOutputHTTPDefinition.path, args)
    })

  const getStudentOutputs = () => useApiCallSWR<IGetStudentOutputs["response"]>
    (tokenHeaderSet && `${GetStudentOutputsHTTPDefinition.path}`, (url) => domainFetcher[GetStudentOutputsHTTPDefinition.method](url));

  const getStudentOutput = useApiCall<IGetStudentOutput["params"], IGetStudentOutput["response"]>
    (({ id }) => {
      return domainFetcher[GetStudentOutputHTTPDefinition.method](`${GetStudentOutputHTTPDefinition.path.split('/')[0]}/${id}`)
    })

  const postFeedbackToOutput = useApiCall<IPostFeedbackToOutput["params"], void>
    (({ outputId, ...rest}) => {
      const urlParts = InsertFeedbackToActivityHTTPDefinition.path.split('/');
      return domainFetcher[InsertFeedbackToActivityHTTPDefinition.method](`${urlParts[0]}/${outputId}/${urlParts[2]}`, {...rest})
    })
    
  const inviteStudent = useApiCall<INewAssociationInvitation["params"]>
    (({ email }) => authFetcher[InsertAssociationInvitationHTTPDefinition.method](InsertAssociationInvitationHTTPDefinition.path, { email }))

  const getAssociationInvitation = useApiCall<IGetAssociationInvitation["params"], IGetAssociationInvitation["response"]>
    (({token}) => authFetcher[GetAssociationInvitationHTTPDefinition.method](`${GetAssociationInvitationHTTPDefinition.path.split('/')[0]}/${token}`));

  const acceptAssociationInvitation = useApiCall<void,void>
    (() => authFetcher[VerifyAccountHTTPDefinition.method](VerifyAccountHTTPDefinition.path));

  return {
    signUp,
    signIn,
    signOut,
    useUser,
    updateUser,
    verifyAccount,
    uploadProfileImage,
    forgotPasswordRequest,
    resetPassword,
    getActivities,
    postActivity,
    getActivity,
    postStudentOutput,
    getStudentOutputs,
    getStudentOutput,
    postFeedbackToOutput,
    inviteStudent,
    getAssociationInvitation,
    acceptAssociationInvitation
  }
}

export type {
  SignUp,
  SignIn,
  SignOut
} from './api-types';
