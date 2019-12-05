export function createRegistrationRequest(
  student,
  plan_id,
  start_date,
  end_date,
  price
) {
  return {
    type: '@registration/CREATE_REGISTRATION_REQUEST',
    payload: { student, plan_id, start_date, end_date, price },
  };
}

export function updateRegistrationRequest(
  registration_id,
  student_id,
  plan_id,
  start_date,
  end_date,
  price
) {
  return {
    type: '@registration/UPDATE_REGISTRATION_REQUEST',
    payload: {
      registration_id,
      student_id,
      plan_id,
      start_date,
      end_date,
      price,
    },
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
