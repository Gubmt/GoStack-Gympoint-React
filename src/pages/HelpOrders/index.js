import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { Container, Wrapper, HelpTable, StyledModal } from './styles';
import api from '~/services/api';

import { answerRequest } from '~/store/modules/helpOrder/actions';

const schema = Yup.object().shape({
  answer: Yup.string().required('A resposta é obrigatória'),
});

export default function HelpOrders() {
  const dispatch = useDispatch();
  const [helps, setHelps] = useState([]);
  const [question, setQuestion] = useState([]);
  const [modal, setModal] = useState(false);

  const loading = useSelector(state => state.helpOrder.loading);

  useEffect(() => {
    async function loadHelps() {
      const response = await api.get('/help-orders');

      setHelps(response.data);
    }
    loadHelps();
  }, [helps]);

  function handlequestion(id) {
    const data = helps.find(h => h.id === id);
    setQuestion(data);
    setModal(true);
  }

  function handleSubmit({ answer }) {
    dispatch(answerRequest(question.id, answer));
    if (!loading) setModal(false);
  }

  return (
    <>
      <Container>
        <header>
          <h1>Pedidos de auxílio</h1>
        </header>
        <Wrapper>
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
        </Wrapper>
        <StyledModal isOpen={modal} ariaHideApp={false}>
          <div className="modal">
            <span className="modal">PERGUNTA DO ALUNO</span>
            <p className="modal"> {question.question}</p>
            <span className="modal">SUA RESPOSTA</span>
            <Form onSubmit={handleSubmit} schema={schema}>
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
