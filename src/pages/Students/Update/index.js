import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { useDispatch, useSelector } from 'react-redux';
import { MdChevronLeft, MdDone } from 'react-icons/md';
import history from '~/services/history';

import { Container, Wrapper } from './styles';
import api from '~/services/api';
import { updateStudentRequest } from '~/store/modules/student/actions';

export default function UpdateStudents() {
  const [student, setStudents] = useState({});
  const dispatch = useDispatch();
  const students = useSelector(state => state.user.students);
  const studentId = useSelector(state => state.student.student_id);

  useEffect(() => {
    function loadStudents() {
      const id = window.location.pathname.split('/');
      console.tron.log(id[3]);
      setStudents(
        students.find(p => {
          return p.id === Number(id[3]);
        })
      );
    }
    loadStudents();
  }, [studentId, students]);

  function handleSubmit({ name, email, age, weight, height }) {
    const { id } = student;
    dispatch(updateStudentRequest(id, name, email, age, weight, height));
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <header>
          <h1>Edição de aluno</h1>
          <div>
            <button
              id="back"
              type="button"
              onClick={() => history.push('/students')}
            >
              <MdChevronLeft size={20} color="#fff" /> VOLTAR
            </button>
            <button type="submit">
              <MdDone size={20} color="#fff" /> SALVAR
            </button>
          </div>
        </header>

        <Wrapper>
          <strong>NOME COMPLETO</strong>
          <Input name="name" type="name" placeholder={student.name} />
          <strong>ENDEREÇO DE E-MAIL</strong>
          <Input name="email" type="email" placeholder={student.email} />
          <div>
            <div className="input">
              <strong>IDADE</strong>
              <Input name="age" type="text" placeholder={student.age} />
            </div>
            <div className="input">
              <strong>PESO(em kg)</strong>
              <Input name="weight" type="text" placeholder={student.weight} />
            </div>
            <div className="input">
              <strong>ALTURA</strong>
              <Input name="height" type="text" placeholder={student.height} />
            </div>
          </div>
        </Wrapper>
      </Form>
    </Container>
  );
}
