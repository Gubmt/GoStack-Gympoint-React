import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { useDispatch, useSelector } from 'react-redux';
import { MdChevronLeft, MdDone } from 'react-icons/md';
import { format, addMonths, parseISO } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import DatePicker from '~/components/DatePicker';
import SelectPlan from '~/components/SelectPlan';
import { formatPrice } from '~/util/format';
import history from '~/services/history';

import { updateRegistrationRequest } from '~/store/modules/registration/actions';

import { Container, Wrapper } from './styles';

export default function UpdateRegistrations() {
  const [selected, setSelected] = useState();

  const [plan, setPlan] = useState();
  const [totalPrice, setTotalPrice] = useState({});
  const [endDate, setEndDate] = useState({});
  const [registration, setRegistration] = useState({});

  const dispatch = useDispatch();
  const plans = useSelector(state => state.user.plans);
  const registrations = useSelector(state => state.user.registrations);

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  useEffect(() => {
    function loadRegistrations() {
      const id = window.location.pathname.split('/');

      const data = registrations.find(p => {
        return p.id === Number(id[3]);
      });

      setRegistration({
        student_id: data.student.id,
        student_name: data.student.name,
        plan_title: data.plan.title,
        start_date: format(parseISO(data.start_date), "dd'/'MM'/'yyyy"),
        end_date: format(parseISO(data.end_date), "dd'/'MM'/'yyyy"),
        price: formatPrice(data.price),
      });
    }
    loadRegistrations();
  }, [registrations]);

  useEffect(() => {
    if (selected && plan) {
      const newEndDate = utcToZonedTime(
        addMonths(selected, plan.duration),
        timezone
      );
      const newEndDateFormatted = format(newEndDate, "dd'/'MM'/'yyyy");
      setEndDate({ newEndDate, newEndDateFormatted });

      const newTotalPrice = plan.price * plan.duration;
      const newTotalPriceFormatted = formatPrice(newTotalPrice);
      setTotalPrice({ newTotalPrice, newTotalPriceFormatted });
    }
  }, [plan, selected, timezone]);

  function handleSubmit({ plan_id, start_date }) {
    dispatch(
      updateRegistrationRequest(
        registration.student_id,
        plan_id,
        start_date,
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
      <Form onSubmit={handleSubmit}>
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
            <Input
              name="student"
              className="input"
              value={registration.student_name}
              disabled
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
                placeholder={registration.end_date}
                disabled
              />
            </div>
            <div className="inputbox" id="price">
              <strong>VALOR FINAL</strong>
              <Input
                className="input"
                name="price"
                type="text"
                value={totalPrice.newTotalPriceFormatted}
                placeholder={registration.price}
                disabled
              />
            </div>
          </div>
        </Wrapper>
      </Form>
    </Container>
  );
}
