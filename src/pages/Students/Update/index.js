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
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
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

      setName(student.name);
      setEmail(student.email);
      setAge(student.age);
      setWeight(student.weight);
      setHeight(student.height);
    }
    loadStudents();
  }, [
    student.age,
    student.email,
    student.height,
    student.name,
    student.weight,
  ]);

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
          <Input
            name="name"
            type="name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <strong>ENDEREÇO DE E-MAIL</strong>
          <Input
            name="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <div>
            <div className="input">
              <strong>IDADE</strong>
              <Input
                name="age"
                type="number"
                min="0"
                value={age}
                onChange={e => setAge(e.target.value)}
              />
            </div>
            <div className="input">
              <strong>PESO(em kg)</strong>
              <Input
                name="weight"
                type="number"
                min="0"
                value={weight}
                onChange={e => setWeight(e.target.value)}
              />
            </div>
            <div className="input">
              <strong>ALTURA</strong>
              <Input
                name="height"
                type="number"
                min="0"
                step="0.01"
                value={height}
                onChange={e => setHeight(e.target.value)}
              />
            </div>
          </div>
        </Wrapper>
      </Form>
    </Container>
  );
}
