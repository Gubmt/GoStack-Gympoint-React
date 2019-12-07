import styled from 'styled-components';

export const Container = styled.div`
  padding: 0 270px;

  form {
    header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin-top: 30px;

      div {
        display: flex;
        flex-direction: row;
        align-items: center;

        button {
          width: 112px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: space-around;
          padding: 0 10px;
          margin-left: 16px;
          border: 0px;
          border-radius: 4px;
          background: #ee4d64;
          color: #fff;
          font-weight: bold;
        }

        #back {
          background: #ccc;
        }
      }
    }
  }
`;

export const Wrapper = styled.div`
  background: #fff;
  margin-top: 20px;
  padding: 30px 30px 10px 30px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;

  strong {
    font-weight: bold;
    font-size: 14px;
    color: #444;
    margin-bottom: 8px;
  }

  input {
    margin-bottom: 20px;
    padding: 10px;
    height: 44px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  span {
    color: #ee4d64;
    align-self: flex-start;
    margin: -15px 0 15px;
    font-weight: bold;
  }

  div {
    display: flex;
    flex-direction: row;
    margin-right: -16px;
  }

  div.input {
    display: flex;
    flex-direction: column;
    margin-right: 16px;
    width: 100%;
  }
`;
