import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { answerFailure, answerSuccess } from './actions';

export function* createAnswer({ payload }) {
  try {
    const { id, answer } = payload;

    yield call(api.put, `help-orders/${id}/answer`, {
      answer,
    });

    yield put(answerSuccess());
  } catch (err) {
    toast.error('Falha ao inserir resposta, verifique os dados');
    yield put(answerFailure());
  }
}

export default all([takeLatest('@help/ANSWER_REQUEST', createAnswer)]);
