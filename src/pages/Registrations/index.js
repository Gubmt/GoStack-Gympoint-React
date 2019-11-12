import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import { MdAdd } from 'react-icons/md';
import { FaCheckCircle } from 'react-icons/fa';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import history from '~/services/history';

import { Container, Wrapper, RegistrationTable } from './styles';
import api from '~/services/api';
import { findRegistration } from '~/store/modules/student/actions';

export default function ListRegistration() {
  const dispatch = useDispatch();
  const [registrations, setRegistrations] = useState([]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  useEffect(() => {
    async function loadRegistrations() {
      const response = await api.get('/registrations');
      const data = response.data.map(reg => {
        return {
          id: reg.id,
          active: reg.active,
          start_date: format(
            parseISO(reg.start_date),
            "d 'de' MMMM 'de' yyyy",
            {
              locale: pt,
            }
          ),
          end_date: format(parseISO(reg.end_date), "d 'de' MMMM 'de' yyyy", {
            locale: pt,
          }),
          student: reg.student,
          plan: reg.plan,
        };
      });
      setRegistrations(data);
    }
    loadRegistrations();
  }, []);

  /* async function updateRegistration(id) {
    const registration = registrations.find(p => {
      return p.id === id;
    });
    dispatch(findRegistration(registration));
    history.push('/registration/update');
  } */

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
                    <button id="left" type="button">
                      editar
                    </button>
                    <button type="button">apagar</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </RegistrationTable>
      </Wrapper>
    </Container>
  );
}
