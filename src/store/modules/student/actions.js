export function createStudentRequest(name, email, age, weight, height) {
  return {
    type: '@student/CREATE_STUDENT_REQUEST',
    payload: { name, email, age, weight, height },
  };
}

export function updateStudentRequest(id, name, email, age, weight, height) {
  return {
    type: '@student/UPDATE_STUDENT_REQUEST',
    payload: { id, name, email, age, weight, height },
  };
}

export function studentFailure() {
  return {
    type: '@student/STUDENT_FAILURE',
  };
}

export function findStudent(student_id) {
  return {
    type: '@student/FIND_STUDENT',
    payload: { student_id },
  };
}
