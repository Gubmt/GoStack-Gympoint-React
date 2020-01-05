import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';

import CurrencyFormat from 'react-currency-format';
import { useDispatch } from 'react-redux';
import { MdChevronLeft, MdDone } from 'react-icons/md';
import * as Yup from 'yup';
import history from '~/services/history';

import Currency from '~/components/Currency';

import { createPlanRequest } from '~/store/modules/plan/actions';

import { Container, Wrapper } from './styles';

const schema = Yup.object().shape({
  title: Yup.string().required('O título é obrigatório'),
  duration: Yup.string().required('A duração é obrigatória'),
  price: Yup.string().required('O preço é obrigatório'),
});

export default function CreatePlans() {
  const [checkDuration, setCheckDuration] = useState();
  const [checkPrice, setCheckPrice] = useState();
  const [checkTotalPrice, setCheckTotalPrice] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    if (checkDuration && checkPrice) {
      setCheckTotalPrice(checkDuration * checkPrice);
    }
  }, [checkDuration, checkPrice]);

  function handleSubmit({ title, duration, price }) {
    console.tron.log(price);
    dispatch(createPlanRequest(title, duration, price));
  }

  return (
    <Container>
      <Form schema={schema} onSubmit={handleSubmit}>
        <header>
          <h1>Cadastro de plano</h1>
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
          <Input name="title" type="text" placeholder="Título do plano" />
          <div>
            <div className="input">
              <strong>DURAÇÃO EM MESES</strong>
              <Input
                name="duration"
                type="number"
                min="0"
                placeholder="Duração do plano"
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
                placeholder="Preço mensal"
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
