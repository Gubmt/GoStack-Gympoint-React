import React from 'react';
import { Form, Input } from '@rocketseat/unform';

import { Container, Wrapper } from './styles';

export default function Modal() {
  return (
    <Container>
      <Wrapper>
        <span>PERGUNTA DO ALUNO</span>
        <p>Resposta do instrutor para o aluno</p>
        <span>SUA RESPOSTA</span>
        <Form>
          <Input name="answer" type="text" />
          <button type="submit">Responder aluno</button>
        </Form>
      </Wrapper>
    </Container>
  );
}
