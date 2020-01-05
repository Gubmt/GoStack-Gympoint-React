import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { useDispatch } from 'react-redux';
import { MdChevronLeft, MdDone } from 'react-icons/md';
import CurrencyFormat from 'react-currency-format';
import * as Yup from 'yup';
import history from '~/services/history';

import Currency from '~/components/Currency';

import { Container, Wrapper } from './styles';
import api from '~/services/api';

import { updatePlanRequest } from '~/store/modules/plan/actions';

const schema = Yup.object().shape({
  title: Yup.string().required('O título é obrigatório'),
  duration: Yup.string().required('A duração é obrigatória'),
  price: Yup.string().required('O preço é obrigatório'),
});

export default function UpdatePlans() {
  const [plan, setPlan] = useState({});
  const [checkTitle, setCheckTitle] = useState();
  const [checkDuration, setCheckDuration] = useState();
  const [checkPrice, setCheckPrice] = useState();
  const [checkTotalPrice, setCheckTotalPrice] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    async function loadPlans() {
      const id = window.location.pathname.split('/');

      const plans = await api.get('/plans');

      setPlan(
        plans.data.find(p => {
          return p.id === Number(id[3]);
        })
      );

      setCheckTitle(plan.title);
      setCheckDuration(plan.duration);
      setCheckPrice(plan.price);
    }
    loadPlans();
  }, [plan.duration, plan.price, plan.title]);

  useEffect(() => {
    if (checkDuration && checkPrice) {
      setCheckTotalPrice(checkDuration * checkPrice);
    }
  }, [checkDuration, checkPrice]);

  function handleSubmit({ title, duration, price }) {
    const { id } = plan;
    dispatch(updatePlanRequest(id, title, duration, price));
  }

  return (
    <Container>
      <Form schema={schema} onSubmit={handleSubmit}>
        <header>
          <h1>Edição de plano</h1>
          <div>
            <button
              id="back"
              type="button"
              onClick={() => history.push('/plans')}
            >
              <MdChevronLeft size={20} color="#fff" /> VOLTAR
            </button>
            <button type="submit">
              <MdDone size={20} color="#fff" /> SALVAR
            </button>
          </div>
        </header>

        <Wrapper>
          <strong>TÍTULO DO PLANO</strong>
          <Input
            name="title"
            type="name"
            value={checkTitle}
            onChange={e => setCheckTitle(e.target.value)}
          />
          <div>
            <div className="input">
              <strong>DURAÇÃO (em meses)</strong>
              <Input
                name="duration"
                type="number"
                min="0"
                value={checkDuration}
                onChange={e => setCheckDuration(e.target.value)}
              />
            </div>
            <div className="input">
              <strong>PREÇO MENSAL</strong>
              <Currency
                name="price"
                thousandSeparator={false}
                prefix="R$"
                suffix=",00"
                onValueChange={values => {
                  const { value } = values;
                  setCheckPrice(value);
                  return value;
                }}
                inputvalue={checkPrice}
                value={checkPrice}
              />
            </div>
            <div className="input">
              <strong>PREÇO TOTAL</strong>
              <CurrencyFormat
                disabled
                thousandSeparator={false}
                prefix="R$"
                suffix=",00"
                name="totalPrice"
                placeholder="Preço total"
                value={checkTotalPrice}
              />
            </div>
          </div>
        </Wrapper>
      </Form>
    </Container>
  );
}
