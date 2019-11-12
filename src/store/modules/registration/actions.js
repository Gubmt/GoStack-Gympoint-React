export function createRegistrationRequest(
  student,
  plan_id,
  startDate,
  end_date,
  price
) {
  return {
    type: '@registration/CREATE_REGISTRATION_REQUEST',
    payload: { student, plan_id, startDate, end_date, price },
  };
}

export function updateRegistrationRequest(student, plan, start_date) {
  return {
    type: '@registration/UPDATE_REGISTRATION_REQUEST',
    payload: { student, plan, start_date },
  };
}

export function registrationFailure() {
  return {
    type: '@registration/REGISTRATION_FAILURE',
  };
}

export function findRegistration(content) {
  return {
    type: '@registration/FIND_REGISTRATION',
    payload: { content },
  };
}
