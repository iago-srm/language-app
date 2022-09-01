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

export const NewUserHTTPDefinition: HTTPDefinition = {
  path: 'users/',
  method: 'post'
}

export const NewStudentOutputHTTPDefinition: HTTPDefinition = {
  path: 'student-outputs/',
  method: 'post'
}

export const GetStudentOutputHTTPDefinition: HTTPDefinition = {
  path: 'student-outputs/:id',
  method: 'get'
}

export const GetStudentOutputsHTTPDefinition: HTTPDefinition = {
  path: 'student-outputs/',
  method: 'get'
}