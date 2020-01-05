import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { useDispatch } from 'react-redux';
import { MdChevronLeft, MdDone } from 'react-icons/md';
import { format, addMonths } from 'date-fns';
import * as Yup from 'yup';
import DatePicker from '~/components/DatePicker';
import SelectStudent from '~/components/SelectStudent';
import SelectPlan from '~/components/SelectPlan';
import history from '~/services/history';
import Currency from '~/components/Currency';

import { createRegistrationRequest } from '~/store/modules/registration/actions';

import { Container, Wrapper } from './styles';
import api from '~/services/api';

const schema = Yup.object().shape({
  student: Yup.string().required('O aluno é obrigatório'),
  plan_id: Yup.string().required('O plano é obrigatório'),
  start_date: Yup.string().required('A data é obrigatória'),
});

export default function CreateRegistrations() {
  const [selected, setSelected] = useState();

  const [plan, setPlan] = useState();
  const [plans, setPlans] = useState();
  const [totalPrice, setTotalPrice] = useState({});
  const [endDate, setEndDate] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    async function loadPlans() {
      const response = await api.get('/plans');
      setPlans(response.data);
    }
    loadPlans();
  }, []);

  useEffect(() => {
    console.tron.log(selected);
    if (selected && plan) {
      const newEndDate = addMonths(selected, plan.duration);

      const newEndDateFormatted = format(newEndDate, "dd'/'MM'/'yyyy");
      setEndDate({ newEndDate, newEndDateFormatted });

      const newTotalPrice = plan.price * plan.duration;
      setTotalPrice({ newTotalPrice });
    }
  }, [plan, selected]);

  const loadStudents = async inputValue => {
    const students = await api.get('/students');
    const labels = students.data.map(s => {
      return { id: s.id, name: s.name };
    });
    const data = labels.find(s =>
      s.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    if (inputValue === '') return labels;
    return data && [data];
  };

  const studentOptions = inputValue =>
    new Promise(resolve => {
      resolve(loadStudents(inputValue));
    });

  function handleSubmit({ student, plan_id, start_date }) {
    dispatch(
      createRegistrationRequest(
        student,
        plan_id,
        new Date(start_date),
        endDate.newEndDate,
        totalPrice.newTotalPrice
      )
    );
  }

  const handleDateChange = newDate => {
    setSelected(newDate);
  };

  const handlePlanChange = newPlan => {
    setPlan(plans.find(p => p.id === newPlan.id));
  };

  return (
    <Container>
      <Form schema={schema} onSubmit={handleSubmit}>
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
          <div className="student">
            <strong>ALUNO</strong>
            <SelectStudent
              name="student"
              options={studentOptions}
              inputChange={studentOptions}
              placeholder="Selecione o aluno"
            />
          </div>
          <div className="inf">
            <div className="planbox">
              <strong>PLANO</strong>
              <SelectPlan
                className="plan"
                name="plan_id"
                options={plans}
                inputChange={handlePlanChange}
                placeholder="Selecione o plano"
              />
            </div>

            <div className="inputbox">
              <strong>DATA DE INÍCIO</strong>
              <DatePicker
                name="start_date"
                id="date"
                inputChange={handleDateChange}
                customInput={<Input className="input" />}
                placeholder="Selecione a data"
                selected={selected}
              />
            </div>
            <div className="inputbox">
              <strong>DATA DE TÉRMINO</strong>
              <Input
                className="input"
                name="end_date"
                type="text"
                value={endDate.newEndDateFormatted}
                disabled
              />
            </div>
            <div className="inputbox" id="price">
              <strong>VALOR FINAL</strong>
              <Currency
                className="input"
                name="price"
                thousandSeparator={false}
                prefix="R$"
                suffix=",00"
                inputvalue={totalPrice.newTotalPrice}
                value={totalPrice.newTotalPrice}
                disabled
              />
            </div>
          </div>
        </Wrapper>
      </Form>
    </Container>
  );
}
