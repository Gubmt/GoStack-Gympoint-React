import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { useDispatch } from 'react-redux';
import { MdAdd } from 'react-icons/md';
import history from '~/services/history';

import { Container, Wrapper, PlanTable } from './styles';
import api from '~/services/api';
import { savePlans } from '~/store/modules/user/actions';
import { formatPrice } from '~/util/format';

export default function Plans() {
  const dispatch = useDispatch();
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    async function loadPlans() {
      const response = await api.get('/plans');

      const data = response.data.map(plan => ({
        ...plan,
        priceFormatted: formatPrice(plan.price),
      }));

      setPlans(data);
      dispatch(savePlans(response.data));
    }
    loadPlans();
  }, [dispatch]);

  return (
    <Container>
      <header>
        <h1>Gerenciando planos</h1>
        <div>
          <button onClick={() => history.push('/plans/create')} type="button">
            <MdAdd size={20} color="#fff" /> CADASTRAR
          </button>
        </div>
      </header>

      <Wrapper>
        <PlanTable>
          <thead>
            <tr>
              <th>TÍTULO</th>
              <th>DURAÇÃO</th>
              <th className="price">VALOR p/ MÊS</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {plans.map(plan => (
              <tr key={plan.id}>
                <td>
                  <span>{plan.title}</span>
                </td>
                <td>
                  <span>{plan.duration}</span>
                </td>
                <td className="age">
                  <span>{plan.priceFormatted}</span>
                </td>
                <td>
                  <div>
                    <button
                      onClick={() => history.push(`/plans/update/${plan.id}`)}
                      id="left"
                      type="button"
                    >
                      editar
                    </button>
                    <button type="button">apagar</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </PlanTable>
      </Wrapper>
    </Container>
  );
}
