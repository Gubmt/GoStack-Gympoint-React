import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { useDispatch } from 'react-redux';
import { MdChevronLeft, MdDone } from 'react-icons/md';
import { format, addMonths, parseISO } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import * as Yup from 'yup';
import DatePicker from '~/components/DatePicker';
import SelectStudent from '~/components/SelectStudent';
import SelectPlan from '~/components/SelectPlan';
import { formatPrice } from '~/util/format';
import history from '~/services/history';

import Currency from '~/components/Currency';

import { updateRegistrationRequest } from '~/store/modules/registration/actions';

import { Container, Wrapper } from './styles';
import api from '~/services/api';

const schema = Yup.object().shape({
  student_id: Yup.string().required('O aluno é obrigatório'),
  plan_id: Yup.string().required('O plano é obrigatório'),
  start_date: Yup.string().required('A data é obrigatória'),
});

export default function UpdateRegistrations() {
  const [selected, setSelected] = useState();

  const [plan, setPlan] = useState();
  const [plans, setPlans] = useState();
  const [totalPrice, setTotalPrice] = useState({});
  const [endDate, setEndDate] = useState({});
  const [registration, setRegistration] = useState({});

  const dispatch = useDispatch();

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  useEffect(() => {
    async function loadPlans() {
      const response = await api.get('/plans');
      setPlans(response.data);
    }
    loadPlans();
  }, []);

  useEffect(() => {
    async function loadRegistrations() {
      const id = window.location.pathname.split('/');

      const registrations = await api.get('/registrations');

      const data = registrations.data.find(p => {
        return p.id === Number(id[3]);
      });

      setEndDate({
        newEndDate: data.end_date,
        newEndDateFormatted: format(parseISO(data.end_date), "dd'/'MM'/'yyyy"),
      });

      setTotalPrice({ newTotalPrice: data.price });

      setRegistration({
        registration_id: data.id,
        student_id: data.student.id,
        student_name: data.student.name,
        plan_title: data.plan.title,
        start_date: format(parseISO(data.start_date), "dd'/'MM'/'yyyy"),
        end_date: format(parseISO(data.end_date), "dd'/'MM'/'yyyy"),
        price: formatPrice(data.price),
      });
    }
    loadRegistrations();
  }, []);

  useEffect(() => {
    if (selected && plan) {
      const newEndDate = utcToZonedTime(
        addMonths(selected, plan.duration),
        timezone
      );
      const newEndDateFormatted = format(newEndDate, "dd'/'MM'/'yyyy");
      setEndDate({ newEndDate, newEndDateFormatted });

      const newTotalPrice = plan.price * plan.duration;
      setTotalPrice({ newTotalPrice });
    }
  }, [plan, selected, timezone]);

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

  function handleSubmit({ student_id, plan_id, start_date }) {
    dispatch(
      updateRegistrationRequest(
        registration.registration_id,
        student_id,
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
          <h1>Edição de matrícula</h1>
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
              name="student_id"
              options={studentOptions}
              inputChange={studentOptions}
              placeholder={registration.student_name}
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
                placeholder={registration.plan_title}
              />
            </div>

            <div className="inputbox">
              <strong>DATA DE INÍCIO</strong>
              <DatePicker
                name="start_date"
                id="date"
                inputChange={handleDateChange}
                customInput={<Input className="input" />}
                selected={selected}
                placeholder={registration.start_date}
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
