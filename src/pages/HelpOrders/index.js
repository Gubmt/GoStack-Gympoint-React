import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Modal from 'react-modal';
import { Form, Input } from '@rocketseat/unform';

import { Container, Wrapper, HelpTable, StyledModal } from './styles';
import api from '~/services/api';

const styles = {
  overlay: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0, 0.5)',
  },
  content: {
    width: '450px',
    height: '425px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
  },
};

export default function HelpOrders() {
  const dispatch = useDispatch();
  const [helps, setHelps] = useState([]);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    async function loadHelps() {
      const response = await api.get('/help-orders');

      setHelps(response.data);
    }
    loadHelps();
  }, []);

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
                      <button onClick={() => setModal(true)} type="button">
                        responder
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </HelpTable>
        </Wrapper>
        <StyledModal isOpen={modal} style={styles}>
          <span className="modal">PERGUNTA DO ALUNO</span>
          <p className="modal">Pergunta do aluno para o instrutor</p>
          <span className="modal">SUA RESPOSTA</span>
          <Form onSubmit={() => setModal(false)}>
            <Input name="answer" type="text" />
            <button className="modal" type="submit">
              Responder aluno
            </button>
          </Form>
        </StyledModal>
      </Container>
    </>
  );
}
