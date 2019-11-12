import produce from 'immer';

const INITIAL_STATE = {
  students: [],
  plans: [],
  registrations: [],
  profile: null,
};

export default function user(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_IN_SUCCESS': {
        draft.profile = action.payload.user;
        break;
      }
      case '@student/SAVE_STUDENTS': {
        draft.students = action.payload.students;
        break;
      }
      case '@plan/SAVE_PLANS': {
        draft.plans = action.payload.plans;
        break;
      }
      case '@registration/SAVE_REGISTRATIONS': {
        draft.registrations = action.payload.registrations;
        break;
      }
      default:
    }
  });
}
