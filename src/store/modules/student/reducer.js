import produce from 'immer';

const INITIAL_STATE = {
  student_id: null,
  signed: false,
  loading: false,
};

export default function student(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@student/CREATE_STUDENT_REQUEST': {
        draft.loading = true;
        break;
      }

      case '@student/STUDENT_FAILURE': {
        draft.loading = false;
        break;
      }

      case '@student/FIND_STUDENT': {
        draft.student_id = action.payload.student_id;
        break;
      }

      default:
    }
  });
}
