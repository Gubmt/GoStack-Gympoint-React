export function answerRequest(id, answer) {
  return {
    type: '@help/ANSWER_REQUEST',
    payload: { id, answer },
  };
}

export function answerSuccess() {
  return {
    type: '@help/ANSWER_SUCCESS',
  };
}

export function answerFailure() {
  return {
    type: '@help/ANSWER_FAILURE',
  };
}
