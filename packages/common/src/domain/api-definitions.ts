import { HTTPDefinition } from '../types';

export const GetActivitiesHTTPDefinition: HTTPDefinition = {
  path: 'activities',
  method: 'get'
}

export const GetActivityHTTPDefinition: HTTPDefinition = {
  path: 'activities/:id',
  method: 'get'
}

export const PostActivityHTTPDefinition: HTTPDefinition = {
  path: 'activities',
  method: 'post'
}

export const PostActivityInstructionHTTPDefinition: HTTPDefinition = {
  path: 'activities/:id/instructions',
  method: 'post'
}
