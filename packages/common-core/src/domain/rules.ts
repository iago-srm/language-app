export const DomainRules = {
  CEFR: {
    POSSIBLE_VALUES: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']
  },
  FLASHCARD: {
    TEXT: {
      MIN_LENGTH: 5,
      MAX_LENGTH: 300
    },
    BUCKETS: [1,2,3,4,5,6,7]
  },
  ACTIVITY: {
    OPTION: {
      MIN_LENGTH: 3,
      MAX_LENGTH: 50
    },
    INSTRUCTION: {
      MIN_LENGTH: 5,
      MAX_LENGTH: 200
    },
    TITLE: {
      MIN_LENGTH: 5,
      MAX_LENGTH: 100
    },
    DESCRIPTION: {
      MIN_LENGTH: 5,
      MAX_LENGTH: 200
    },
    CONTENTTYPE: ['VIDEO', 'TEXT'],
    MAX_VIDEO_LENGTH: 10*60, // in seconds. 10 min max
    MAX_TEXT_LENGTH: 2000, // in characters
    MIN_TIME_TO_COMPLETE: 5, // in minutes
    MAX_TIME_TO_COMPLETE: 30, // in minutes
    TOPICS: ['SCIENCE & TECHONOLOGY', 'ARTS', 'CURRENT AFFAIRS', 'SPORTS']
  },
  FEEDBACK: {
    GRADES: [1,2,3,4,5],
    MAX_LENGTH: 500 // in characters
  },
  USER: {
    ROLES: ['STUDENT', 'INSTRUCTOR', 'ADMIN']
  }
}
