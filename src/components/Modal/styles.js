import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  background: transparent;
  display: absolute;
  margin-top: 238px;
  margin-left: 125px;
`;

export const Wrapper = styled.div`
  width: 450px;
  height: 425px;
  background: #fff;
  padding: 30px;
  text-align: left;
  border: 0;
  border-radius: 4px;

  span {
    font-size: 14px;
    font-weight: bold;
    color: #444;
    margin-bottom: 20px;
  }

  p {
    font-size: 16px;
    color: #666;
    margin-bottom: 20px;
  }

  input {
    border: 1px solid #eee;
    border-radius: 4px;
    height: 127px;
  }

  button {
    height: 45px;
    text-align: center;
    background: #ee4d64;
  }
`;
