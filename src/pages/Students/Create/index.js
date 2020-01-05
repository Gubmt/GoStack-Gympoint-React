import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import { useDispatch } from 'react-redux';
import { MdChevronLeft, MdDone } from 'react-icons/md';
import * as Yup from 'yup';
import history from '~/services/history';

import { createStudentRequest } from '~/store/modules/student/actions';

import { Container, Wrapper } from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('Insira um email válido')
    .required('O email é obrigatório'),
  age: Yup.string().required('A idade é obrigatória'),
  weight: Yup.string().required('O peso é obrigatório'),
  height: Yup.string().required('A altura é obrigatória'),
});

export default function CreateStudents() {
  const dispatch = useDispatch();

  function handleSubmit({ name, email, age, weight, height }) {
    dispatch(createStudentRequest(name, email, age, weight, height));
  }

  return (
    <Container>
      <Form schema={schema} onSubmit={handleSubmit}>
        <header>
          <h1>Cadastro de aluno</h1>
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
          <Input name="name" type="name" placeholder="Nome completo do aluno" />
          <strong>ENDEREÇO DE E-MAIL</strong>
          <Input name="email" type="email" placeholder="example@email.com" />
          <div>
            <div className="input">
              <strong>IDADE</strong>
              <Input
                name="age"
                type="number"
                min="0"
                placeholder="Idade do aluno"
              />
            </div>
            <div className="input">
              <strong>PESO(em kg)</strong>
              <Input
                name="weight"
                type="number"
                min="0"
                placeholder="Peso do aluno"
              />
            </div>
            <div className="input">
              <strong>ALTURA</strong>
              <Input
                name="height"
                type="number"
                min="0"
                step="0.01"
                placeholder="Altura do aluno"
              />
            </div>
          </div>
        </Wrapper>
      </Form>
    </Container>
  );
}
