import produce from 'immer';

const INITIAL_STATE = {
  plan_id: null,
  signed: false,
  loading: false,
};

export default function plan(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@plan/CREATE_PLAN_REQUEST': {
        draft.loading = true;
        break;
      }

      case '@plan/UPDATE_PLAN_REQUEST': {
        draft.loading = false;
        break;
      }

      case '@plan/FIND_PLAN': {
        draft.plan_id = action.payload.plan_id;
        break;
      }

      default:
    }
  });
}
