import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import { useDispatch, useSelector } from 'react-redux';
import { MdChevronLeft, MdDone } from 'react-icons/md';
import * as Yup from 'yup';
import history from '~/services/history';

import { createPlanRequest } from '~/store/modules/plan/actions';

import { Container, Wrapper } from './styles';

const schema = Yup.object().shape({
  title: Yup.string().required('O título é obrigatório'),
  duration: Yup.string().required('A duração é obrigatória'),
  price: Yup.number().required('O preço é obrigatório'),
});

export default function CreatePlans() {
  const dispatch = useDispatch();

  function handleSubmit({ title, duration, price }) {
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
          <Input name="title" type="name" />
          <div>
            <div className="input">
              <strong>DURAÇÃO EM MESES</strong>
              <Input name="duration" type="text" />
            </div>
            <div className="input">
              <strong>PREÇO MENSAL</strong>
              <Input name="price" type="text" />
            </div>
            <div className="input">
              <strong>PREÇO TOTAL</strong>
              <Input name="totalPrice" type="text" />
            </div>
          </div>
        </Wrapper>
      </Form>
    </Container>
  );
}
