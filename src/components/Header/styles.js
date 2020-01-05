import styled from 'styled-components';

export const Container = styled.div`
  height: 64px;
  background: #fff;
  padding: 0 30px;
`;

export const Content = styled.div`
  height: 64px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    img#dir {
      margin-left: -12px;
      margin-right: 15px;
    }

    > a {
      font-weight: bold;
      color: #ee4d64;
      font-size: 15px;
      line-height: 18px;
    }

    div {
      margin-left: 30px;
      border-left: 1px solid #eee;
      padding: 10px 30px;

      a {
        margin-right: 20px;
        font-weight: bold;
        color: ${props => (props.current ? '#000' : '#999')};
      }
    }
  }

  aside {
    display: flex;

    div {
      display: flex;
      flex-direction: column;
      text-align: right;

      strong {
        font-weight: bold;
        color: #666;
      }

      button {
        background: none;
        border: 0;
        color: #de3b3b;
        margin-top: 4px;
      }
    }
  }
`;
