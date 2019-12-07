import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { useDispatch } from 'react-redux';
import { MdChevronLeft, MdDone } from 'react-icons/md';
import * as Yup from 'yup';
import history from '~/services/history';

import { Container, Wrapper } from './styles';
import { updateStudentRequest } from '~/store/modules/student/actions';
import api from '~/services/api';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('Insira um email válido')
    .required('O email é obrigatório'),
  age: Yup.string().required('A idade é obrigatória'),
  weight: Yup.string().required('O peso é obrigatório'),
  height: Yup.string().required('A altura é obrigatória'),
});

export default function UpdateStudents() {
  const [student, setStudent] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    async function loadStudents() {
      const students = await api.get('/students');
      const id = window.location.pathname.split('/');

      setStudent(
        students.data.find(p => {
          return p.id === Number(id[3]);
        })
      );
    }
    loadStudents();
  }, []);

  function handleSubmit({ name, email, age, weight, height }) {
    const { id } = student;
    dispatch(updateStudentRequest(id, name, email, age, weight, height));
  }

  return (
    <Container>
      <Form schema={schema} onSubmit={handleSubmit}>
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
              <Input
                name="age"
                type="number"
                min="0"
                placeholder={student.age}
              />
            </div>
            <div className="input">
              <strong>PESO(em kg)</strong>
              <Input
                name="weight"
                type="number"
                min="0"
                placeholder={student.weight}
              />
            </div>
            <div className="input">
              <strong>ALTURA</strong>
              <Input
                name="height"
                type="number"
                min="0"
                placeholder={student.height}
              />
            </div>
          </div>
        </Wrapper>
      </Form>
    </Container>
  );
}
