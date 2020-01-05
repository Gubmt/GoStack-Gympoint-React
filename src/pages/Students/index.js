import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { MdAdd, MdHelpOutline } from 'react-icons/md';
import history from '~/services/history';

import Page from '~/components/Page';

import { Container, Wrapper, StudentTable } from './styles';
import api from '~/services/api';

export default function List() {
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(false);

  useEffect(() => {
    async function loadStudents() {
      const response = await api.get('/students', {
        params: {
          page,
        },
      });

      setStudents(response.data);
      if (response.data.length < 5) setLastPage(true);
      else setLastPage(false);
    }
    loadStudents();
  }, [page]);

  async function handleDelete(id) {
    if (window.confirm('Você deseja deletar esse aluno?')) {
      const response = await api.delete(`/students/${id}`, {
        params: {
          page,
        },
      });
      setStudents(response.data);
    }
  }

  function prevPage() {
    if (page !== 1) setPage(page - 1);
  }

  function nextPage() {
    if (!lastPage) {
      setPage(page + 1);
    }
  }

  async function handleSearch(e) {
    const name = e.target.value;
    const response = await api.get('/students', {
      params: {
        page,
        name,
      },
    });
    const studentSearch = response.data;

    if (response.data.length > 1) {
      setStudents(studentSearch);
      setLastPage(false);
    } else {
      setStudents([studentSearch]);
      setLastPage(true);
    }
  }

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
            <Input
              name="name"
              type="name"
              placeholder="Buscar aluno"
              onChange={handleSearch}
            />
          </Form>
        </div>
      </header>

      <Wrapper>
        <Page
          page={page}
          lastPage={lastPage}
          prevPage={() => prevPage()}
          nextPage={() => nextPage()}
        />
        {students.length > 0 ? (
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
                      <button
                        onClick={() => handleDelete(student.id)}
                        type="button"
                      >
                        apagar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </StudentTable>
        ) : (
          <div className="icon">
            <MdHelpOutline size="300px" color="#DDD" />
          </div>
        )}
      </Wrapper>
    </Container>
  );
}
