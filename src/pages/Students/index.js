import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import { MdAdd } from 'react-icons/md';
import history from '~/services/history';

import { Container, Wrapper, StudentTable } from './styles';
import api from '~/services/api';
import { saveStudent } from '~/store/modules/user/actions';

export default function List() {
  const dispatch = useDispatch();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function loadStudents() {
      const response = await api.get('/students');

      setStudents(response.data);

      dispatch(saveStudent(response.data));
    }
    loadStudents();
  }, [dispatch]);

  return (
    <Container>
      <header>
        <h1>Gerenciando alunos</h1>
        <div>
          <button
            onClick={() => history.push('/students/create')}
            type="button"
          >
            <MdAdd size={20} color="#fff" /> CADASTRAR
          </button>
          <Form>
            <Input name="name" type="name" placeholder="Buscar aluno" />
          </Form>
        </div>
      </header>

      <Wrapper>
        <StudentTable>
          <thead>
            <tr>
              <th>NOME</th>
              <th>E-MAIL</th>
              <th className="age">IDADE</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student.id}>
                <td>
                  <span>{student.name}</span>
                </td>
                <td>
                  <span>{student.email}</span>
                </td>
                <td className="age">
                  <span>{student.age}</span>
                </td>
                <td>
                  <div>
                    <button
                      onClick={() =>
                        history.push(`/students/update/${student.id}`)
                      }
                      id="left"
                      type="button"
                    >
                      editar
                    </button>
                    <button type="button">apagar</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </StudentTable>
      </Wrapper>
    </Container>
  );
}
