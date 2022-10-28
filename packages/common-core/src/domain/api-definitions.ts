import { HTTPDefinition } from '../types';

export const GetActivitiesHTTPDefinition: HTTPDefinition = {
  path: 'activities',
  method: 'get'
}

export const GetActivityHTTPDefinition: HTTPDefinition = {
  path: 'activities/:id',
  method: 'get'
}

export const NewActivityHTTPDefinition: HTTPDefinition = {
  path: 'activities',
  method: 'post'
}

export const NewActivityInstructionHTTPDefinition: HTTPDefinition = {
  path: 'activities/:id/instructions',
  method: 'post'
}

export const InsertActivityIntoStudentListHTTPDefinition: HTTPDefinition = {
  path: 'activities/student-lists',
  method: 'post'
}

export const DeleteActivityFromStudentListHTTPDefinition: HTTPDefinition = {
  path: 'activities/student-lists',
  method: 'post'
}

export const NewUserHTTPDefinition: HTTPDefinition = {
  path: 'users',
  method: 'post'
}

export const DomainUpdateUserHTTPDefinition: HTTPDefinition = {
  path: 'users',
  method: 'patch'
}

export const PostStudentOutputHTTPDefinition: HTTPDefinition = {
  path: 'student-outputs',
  method: 'post'
}

export const GetStudentOutputHTTPDefinition: HTTPDefinition = {
  path: 'student-outputs/:id',
  method: 'get'
}

export const GetStudentOutputsHTTPDefinition: HTTPDefinition = {
  path: 'student-outputs',
  method: 'get'
}

export const InsertFeedbackToActivityHTTPDefinition: HTTPDefinition = {
  path: 'student-outputs/:outputId/feedback',
  method: 'post'
}

export const InsertAssociationInvitationHTTPDefinition: HTTPDefinition = {
  path: 'association-invitation',
  method: 'post'
}

export const GetAssociationInvitationHTTPDefinition: HTTPDefinition = {
  path: 'association-invitation/:token',
  method: 'get'
}

export const EditAssociationInvitationHTTPDefinition: HTTPDefinition = {
  path: 'association-invitation/:token',
  method: 'patch'
}

export const GetInstructorStudentsHTTPDefinition: HTTPDefinition = {
  path: 'instructors/students',
  method: 'get'
}