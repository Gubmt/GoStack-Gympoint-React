import React from 'react';
import { Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import { Container, Content } from './styles';

import { signOut } from '~/store/modules/auth/actions';

import logoesq from '~/assets/minilogoesq.png';
import logodir from '~/assets/minilogodir.png';

export default function Header() {
  const dispatch = useDispatch();

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <nav>
          <img src={logoesq} alt="GympointEsq" />
          <img id="dir" src={logodir} alt="GympointDir" />
          <Link to="/students">GYMPOINT</Link>

          <div>
            <Link to="/students">ALUNOS</Link>
            <Link to="/plans">PLANOS</Link>
            <Link to="/registrations">MATRÍCULAS</Link>
            <Link to="/help-orders">PEDIDO DE AUXÍLIO</Link>
          </div>
        </nav>

        <aside>
          <div>
            <strong>Administrador</strong>
            <button onClick={handleSignOut} type="button">
              sair do sistema
            </button>
          </div>
        </aside>
      </Content>
    </Container>
  );
}
