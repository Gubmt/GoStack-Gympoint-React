export function saveStudent(students) {
  return {
    type: '@student/SAVE_STUDENTS',
    payload: { students },
  };
}

export function savePlans(plans) {
  return {
    type: '@plan/SAVE_PLANS',
    payload: { plans },
  };
}

export function saveRegistrations(registrations) {
  return {
    type: '@registration/SAVE_REGISTRATIONS',
    payload: { registrations },
  };
}
