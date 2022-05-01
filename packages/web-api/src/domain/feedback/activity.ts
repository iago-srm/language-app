import { ActivityVersion, Student, Feedback } from '@domain';

export class FeedbackToActivity {
  activityVersion: ActivityVersion;
  student: Student;
  feedback: Feedback;
}
