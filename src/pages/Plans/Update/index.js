import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { useDispatch, useSelector } from 'react-redux';
import { MdChevronLeft, MdDone } from 'react-icons/md';
import history from '~/services/history';

import { Container, Wrapper } from './styles';
import { updatePlanRequest } from '~/store/modules/plan/actions';

export default function UpdatePlans() {
  const [plan, setPlan] = useState({});
  const dispatch = useDispatch();
  const plans = useSelector(state => state.user.plans);
  const planId = useSelector(state => state.plan.plan_id);

  useEffect(() => {
    function loadPlans() {
      const id = window.location.pathname.slice(-1);

      setPlan(
        plans.find(p => {
          return p.id === Number(id);
        })
      );
    }
    loadPlans();
  }, [planId, plans]);

  function handleSubmit({ title, duration, price }) {
    const { id } = plan;
    dispatch(updatePlanRequest(id, title, duration, price));
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
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
          <Input name="title" type="name" placeholder={plan.title} />
          <div>
            <div className="input">
              <strong>DURAÇÃO (em meses)</strong>
              <Input name="duration" type="text" placeholder={plan.duration} />
            </div>
            <div className="input">
              <strong>PREÇO MENSAL</strong>
              <Input name="price" type="text" placeholder={plan.price} />
            </div>
            <div className="input">
              <strong>PREÇO TOTAL</strong>
              <Input name="totalPrice" type="text" disabled />
            </div>
          </div>
        </Wrapper>
      </Form>
    </Container>
  );
}
