import React, { useState, useEffect, useMemo } from 'react';
import { MdAdd, MdHelpOutline } from 'react-icons/md';
import history from '~/services/history';

import Page from '~/components/Page';

import { Container, Wrapper, PlanTable } from './styles';
import api from '~/services/api';
import { formatPrice } from '~/util/format';

export default function Plans() {
  const [plans, setPlans] = useState([]);
  const [page, setPage] = useState(1);
  const [total_pages, setTotal_pages] = useState(0);
  const [total_list, setTotal_list] = useState(0);
  const [lastPage, setLastPage] = useState(false);

  function prevPage() {
    if (page !== 1) setPage(page - 1);
  }

  function nextPage() {
    if (!lastPage) {
      setPage(page + 1);
    }
  }

  function dateFormatted(response) {
    const data = response.data.plans.map(plan => ({
      ...plan,
      durationFormatted:
        plan.duration > 1 ? `${plan.duration} meses` : `${plan.duration} mês`,
      priceFormatted: formatPrice(plan.price),
    }));

    setPlans(data);
  }

  useEffect(() => {
    async function loadPlans() {
      const response = await api.get('/plans', {
        params: {
          page,
        },
      });

      dateFormatted(response);
      setTotal_list(response.data.total_list);
      setTotal_pages(response.data.total_pages);

      if (total_pages <= page) setLastPage(true);
      else setLastPage(false);
    }
    loadPlans();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, total_pages]);

  async function handleDelete(id) {
    if (window.confirm('Você deseja deletar esse plano?')) {
      const response = await api.delete(`/plans/${id}`, {
        params: {
          page,
        },
      });

      dateFormatted(response);
      setTotal_list(response.data.total_list);
      setTotal_pages(response.data.total_pages);

      if (response.data.plans.length === 0) prevPage();
    }
  }

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
        <Page
          page={page}
          lastPage={lastPage}
          prevPage={() => prevPage()}
          nextPage={() => nextPage()}
        />
        {plans.length > 0 ? (
          <PlanTable>
            <thead>
              <tr>
                <th className="title">TÍTULO</th>
                <th>DURAÇÃO</th>
                <th className="price">VALOR p/ MÊS</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {plans.map(plan => (
                <tr key={plan.id}>
                  <td className="title">
                    <span>{plan.title}</span>
                  </td>
                  <td>
                    <span>{plan.durationFormatted}</span>
                  </td>
                  <td className="age">
                    <span>{plan.priceFormatted}</span>
                  </td>
                  <td>
                    <div>
                      <button
                        onClick={() =>
                          history.push(`/plans/update/${plan.id}`, {
                            id: plan.id,
                            title: plan.title,
                            price: plan.price,
                            duration: plan.duration,
                          })
                        }
                        id="left"
                        type="button"
                      >
                        editar
                      </button>
                      <button
                        onClick={() => handleDelete(plan.id)}
                        type="button"
                      >
                        apagar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </PlanTable>
        ) : (
          <div className="icon">
            <MdHelpOutline size="400px" color="#DDD" />
          </div>
        )}
      </Wrapper>
    </Container>
  );
}
