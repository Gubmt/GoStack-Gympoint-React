import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { MdHelpOutline } from 'react-icons/md';
import { Container, Wrapper, HelpTable, StyledModal } from './styles';
import api from '~/services/api';

import { answerRequest } from '~/store/modules/helpOrder/actions';

import Page from '~/components/Page';

const schema = Yup.object().shape({
  answer: Yup.string().required('A resposta é obrigatória'),
});

export default function HelpOrders() {
  const dispatch = useDispatch();
  const [helps, setHelps] = useState([]);
  const [question, setQuestion] = useState([]);
  const [modal, setModal] = useState(false);
  const [page, setPage] = useState(1);
  const [total_pages, setTotal_pages] = useState(0);
  const [total_list, setTotal_list] = useState(0);
  const [lastPage, setLastPage] = useState(false);

  const loading = useSelector(state => state.helpOrder.loading);

  function prevPage() {
    if (page !== 1) setPage(page - 1);
  }

  function nextPage() {
    if (!lastPage) {
      setPage(page + 1);
    }
  }

  async function loadHelps() {
    const response = await api.get('/help-orders', {
      params: {
        page,
      },
    });

    setHelps(response.data.help_order);
    setTotal_list(response.data.total_list);
    setTotal_pages(response.data.total_pages);

    if (total_pages <= page) setLastPage(true);
    else setLastPage(false);
  }

  useEffect(() => {
    loadHelps();
  }, [page, total_pages]); //eslint-disable-line

  useEffect(() => {
    if (helps.length === 0) prevPage();
  }, [helps.length]); //eslint-disable-line

  function handlequestion(id) {
    const data = helps.find(h => h.id === id);
    setQuestion(data);
    setModal(true);
  }

  function handleSubmit({ answer }) {
    dispatch(answerRequest(question.id, answer));
    setModal(false);
    setHelps(helps.filter(item => item.id !== question.id));
  }

  return (
    <>
      <Container>
        <header>
          <h1>Pedidos de auxílio</h1>
        </header>
        <Wrapper>
          <Page
            page={page}
            lastPage={lastPage}
            prevPage={() => prevPage()}
            nextPage={() => nextPage()}
          />
          {helps.length > 0 ? (
            <HelpTable>
              <thead>
                <tr>
                  <th>ALUNO</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {helps.map(help => (
                  <tr key={help.id}>
                    <td>
                      <span>{help.student.name}</span>
                    </td>
                    <td>
                      <div>
                        <button
                          onClick={() => handlequestion(help.id)}
                          type="button"
                        >
                          responder
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </HelpTable>
          ) : (
            <div className="icon">
              <MdHelpOutline size="400px" color="#DDD" />
            </div>
          )}
        </Wrapper>
        <StyledModal isOpen={modal} ariaHideApp={false}>
          <div className="modal">
            <span className="modal">PERGUNTA DO ALUNO</span>
            <p className="modal"> {question.question}</p>
            <span className="modal">SUA RESPOSTA</span>
            <Form onSubmit={handleSubmit} schema={schema} loading={loading}>
              <Input multiline name="answer" className="modal" />
              <button className="modal" type="submit">
                Responder aluno
              </button>
            </Form>
          </div>
        </StyledModal>
      </Container>
    </>
  );
}
