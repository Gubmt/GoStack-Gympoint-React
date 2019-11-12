import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import history from '~/services/history';
import api from '~/services/api';

import { planFailure } from './actions';

export function* createPlan({ payload }) {
  try {
    const { title, duration, price } = payload;

    yield call(api.post, 'plans', {
      title,
      duration,
      price,
    });

    history.push('/plans');
  } catch (err) {
    toast.error('Falha ao cadastrar plano, verifique os dados');
    yield put(planFailure());
  }
}

export function* updatePlan({ payload }) {
  try {
    const { id, title, duration, price } = payload;

    yield call(api.put, `plans/${id}`, {
      title,
      duration,
      price,
    });

    history.push('/plans');
  } catch (err) {
    toast.error('Falha ao atualizar plano, verifique os dados');
    yield put(planFailure());
  }
}

export default all([
  takeLatest('@plan/CREATE_PLAN_REQUEST', createPlan),
  takeLatest('@plan/UPDATE_PLAN_REQUEST', updatePlan),
]);
