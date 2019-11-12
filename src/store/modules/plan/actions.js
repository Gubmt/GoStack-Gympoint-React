export function createPlanRequest(title, duration, price) {
  return {
    type: '@plan/CREATE_PLAN_REQUEST',
    payload: { title, duration, price },
  };
}

export function updatePlanRequest(id, title, duration, price) {
  return {
    type: '@plan/UPDATE_PLAN_REQUEST',
    payload: { id, title, duration, price },
  };
}

export function planFailure() {
  return {
    type: '@plan/PLAN_FAILURE',
  };
}

export function findPlan(plan_id) {
  return {
    type: '@plan/FIND_PLAN',
    payload: { plan_id },
  };
}
