import produce from 'immer';

const INITIAL_STATE = {
  content: {},
  signed: false,
  loading: false,
};

export default function student(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@registration/CREATE_REGISTRATION_REQUEST': {
        draft.loading = true;
        break;
      }

      case '@registration/REGISTRATION_FAILURE': {
        draft.loading = false;
        break;
      }

      case '@registration/FIND_REGISTRATION': {
        draft.content = action.payload.content;
        break;
      }

      default:
    }
  });
}
