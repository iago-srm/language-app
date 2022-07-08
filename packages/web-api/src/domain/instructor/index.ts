import { PersonId } from '@language-app/common';
import { Activity } from '../activity/activity';

interface InstructorConstructorParams {
  id: PersonId;
  activities: Activity[];
}

export class Instructor {}
