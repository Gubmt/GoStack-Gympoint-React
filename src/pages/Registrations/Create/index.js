import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import AsyncSelect from 'react-select/async';
import { useDispatch, useSelector } from 'react-redux';
import { MdChevronLeft, MdDone } from 'react-icons/md';
import {
  format,
  parseISO,
  addDays,
  eachDayOfInterval,
  addMonths,
} from 'date-fns';
import pt from 'date-fns/locale/pt';
import { formatPrice } from '~/util/format';
import history from '~/services/history';

import { createRegistrationRequest } from '~/store/modules/registration/actions';

import { Container, Wrapper } from './styles';

export default function CreateRegistrations() {
  const [start_date, setStartDate] = useState([]);
  const [totalPrice, setTotalPrice] = useState();
  const [endDate, setEndDate] = useState();
  const [value, setValue] = useState();
  const [selectedPlan, setSelectedPlan] = useState({ duration: 0, price: 0 });
  const dispatch = useDispatch();
  const students = useSelector(state => state.user.students);
  const plans = useSelector(state => state.user.plans);

  const studentOptions = (student, cb) => {
    setTimeout(() => {
      cb(
        students.map(s => {
          return s.name;
        })
      );
    }, 1000);
  };

  const planOptions = plans.map(p => {
    return { value: p.id, lable: p.title };
  });

  useEffect(() => {
    function defineDate() {
      const lastDay = addDays(new Date(), 10);
      const days = eachDayOfInterval({ start: new Date(), end: lastDay });

      setStartDate(
        days.map(day => {
          return {
            id: format(day, "yyyy'-'MM'-'d", {
              locale: pt,
            }),
            title: format(day, "d'/'MM'/'yyyy", {
              locale: pt,
            }),
          };
        })
      );
    }
    defineDate();
  }, []);

  function handleSubmit({ student, plan_id, startDate, end_date, price }) {
    dispatch(
      createRegistrationRequest(
        student,
        plan_id,
        parseISO(startDate),
        parseISO(end_date),
        price
      )
    );
  }

  function handlePlan(e) {
    setSelectedPlan(
      plans.find(p => {
        return p.id == e.target.value;
      })
    );
  }

  function handleStartDay(e) {
    const { duration, price } = selectedPlan;
    const day = parseISO(e.target.value);
    if (duration !== 0) {
      setEndDate(
        format(addMonths(day, duration), "d'/'MM'/'yyyy", {
          locale: pt,
        })
      );
    }

    setTotalPrice(formatPrice(price * duration));
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <header>
          <h1>Cadastro de matrícula</h1>
          <div>
            <button
              id="back"
              type="button"
              onClick={() => history.push('/registrations')}
            >
              <MdChevronLeft size={20} color="#fff" /> VOLTAR
            </button>
            <button type="submit">
              <MdDone size={20} color="#fff" /> SALVAR
            </button>
          </div>
        </header>

        <Wrapper>
          <strong>ALUNO</strong>
          <AsyncSelect name="student" loadOptions={studentOptions} />
          <div>
            <div className="input">
              <strong>PLANO</strong>
              <AsyncSelect
                name="plan_id"
                loadOptions={planOptions}
                placeholder="Selecione o plano"
                onChange={handlePlan}
              />
            </div>
            <div className="input">
              <strong>DATA DE INÍCIO</strong>
              <AsyncSelect
                name="startDate"
                loadOptions={start_date}
                placeholder="Escolha a data"
                onChange={handleStartDay}
              />
            </div>
            <div className="input">
              <strong>DATA DE TÉRMINO</strong>
              <Input name="end_date" type="text" value={endDate} disabled />
            </div>
            <div className="input">
              <strong>VALOR FINAL</strong>
              <Input name="price" type="text" value={totalPrice} disabled />
            </div>
          </div>
        </Wrapper>
      </Form>
    </Container>
  );
}
