import produce from 'immer';

const INITIAL_STATE = {
  loading: false,
};

export default function helpOrder(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@help/ANSWER_REQUEST': {
        draft.loading = true;
        break;
      }

      case '@help/ANSWER_SUCCESS': {
        draft.loading = false;
        break;
      }

      case '@help/ANSWER_FAILURE': {
        draft.loading = false;
        break;
      }

      default:
    }
  });
}
