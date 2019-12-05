import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import history from '~/services/history';
import api from '~/services/api';

import { registrationFailure } from './actions';

export function* createRegistration({ payload }) {
  try {
    const { student, plan_id, start_date, end_date, price } = payload;
    yield call(api.post, `registrations/${student}`, {
      plan_id,
      startDate: start_date,
      endDate: end_date,
      price,
    });

    history.push('/registrations');
  } catch (err) {
    toast.error('Falha ao cadastrar matrícula, verifique os dados');
    yield put(registrationFailure());
  }
}

export function* updateRegistration({ payload }) {
  try {
    const {
      registration_id,
      student_id,
      plan_id,
      start_date,
      end_date,
      price,
    } = payload;

    yield call(api.put, `registrations/${registration_id}`, {
      student_id,
      plan_id,
      startDate: start_date,
      endDate: end_date,
      price,
    });

    history.push('/registrations');
  } catch (err) {
    toast.error('Falha ao atualizar matrícula, verifique os dados');
    yield put(registrationFailure());
  }
}

export default all([
  takeLatest('@registration/CREATE_REGISTRATION_REQUEST', createRegistration),
  takeLatest('@registration/UPDATE_REGISTRATION_REQUEST', updateRegistration),
]);
