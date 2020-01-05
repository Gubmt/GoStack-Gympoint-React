import React, { useState, useEffect } from 'react';
import { MdAdd, MdHelpOutline } from 'react-icons/md';
import { FaCheckCircle } from 'react-icons/fa';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import history from '~/services/history';

import Page from '~/components/Page';

import { Container, Wrapper, RegistrationTable } from './styles';
import api from '~/services/api';

export default function ListRegistration() {
  const [registrations, setRegistrations] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(false);

  function dataFormatted(response) {
    const data = response.data.map(reg => {
      return {
        id: reg.id,
        active: reg.active,
        start_date: format(parseISO(reg.start_date), "d 'de' MMMM 'de' yyyy", {
          locale: pt,
        }),
        end_date: format(parseISO(reg.end_date), "d 'de' MMMM 'de' yyyy", {
          locale: pt,
        }),
        student: reg.student,
        plan: reg.plan,
      };
    });
    setRegistrations(data);

    if (response.data.length < 5) setLastPage(true);
    else setLastPage(false);
  }

  useEffect(() => {
    async function loadRegistrations() {
      const response = await api.get('/registrations', {
        params: {
          page,
        },
      });

      dataFormatted(response);
    }
    loadRegistrations();
  }, [page]); //eslint-disable-line

  async function handleDelete(id) {
    if (window.confirm('Você deseja deletar essa matrícula?')) {
      const response = await api.delete(`/registrations/${id}`, {
        params: {
          page,
        },
      });
      dataFormatted(response);
    }
  }

  function prevPage() {
    if (page !== 1) setPage(page - 1);
  }

  function nextPage() {
    if (!lastPage) {
      setPage(page + 1);
    }
  }

  return (
    <Container>
      <header>
        <h1>Gerenciando matrículas</h1>
        <div>
          <button
            onClick={() => history.push('/registrations/create')}
            type="button"
          >
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
        {registrations.length > 0 ? (
          <RegistrationTable>
            <thead>
              <tr>
                <th className="student">ALUNO</th>
                <th>PLANO</th>
                <th>INÍCIO</th>
                <th>TÉRMINO</th>
                <th>ATIVA</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {registrations.map(registration => (
                <tr key={registration.id}>
                  <td className="student">
                    <span>{registration.student.name}</span>
                  </td>
                  <td>
                    <span>{registration.plan.title}</span>
                  </td>
                  <td>
                    <span>{registration.start_date}</span>
                  </td>
                  <td>
                    <span>{registration.end_date}</span>
                  </td>
                  <td>
                    <FaCheckCircle
                      size={20}
                      color={registration.active ? '#42cb59' : '#ddd'}
                    />
                  </td>
                  <td>
                    <div>
                      <button
                        id="left"
                        type="button"
                        onClick={() =>
                          history.push(
                            `/registrations/update/${registration.id}`
                          )
                        }
                      >
                        editar
                      </button>
                      <button
                        onClick={() => handleDelete(registration.id)}
                        type="button"
                      >
                        apagar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </RegistrationTable>
        ) : (
          <div className="icon">
            <MdHelpOutline size="300px" color="#DDD" />
          </div>
        )}
      </Wrapper>
    </Container>
  );
}
