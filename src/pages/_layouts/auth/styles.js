import styled from 'styled-components';

import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: #ee4d64;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 360px;
  height: 448px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  text-align: center;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px 30px;

  img {
    width: 153px;
    height: 100px;
  }

  form {
    display: flex;
    flex-direction: column;
    align-self: stretch;

    strong {
      text-align: left;
      margin-bottom: 8px;
      margin-top: 20px;
      color: #444;
    }

    input {
      border: 1px solid #999;
      border-radius: 4px;
      height: 44px;
      padding: 13px 15px;
      color: #000;

      &::placeholder {
        color: #999;
      }
    }

    span {
      color: #ee4d64;
      align-self: flex-start;
      margin: 5px 0 10px;
      font-weight: bold;
    }

    button {
      margin-top: 15px;
      height: 44px;
      background: #ee4d64;
      font-weight: bold;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      color: #fff;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.03, '#ee4d64')};
      }
    }
  }
`;
