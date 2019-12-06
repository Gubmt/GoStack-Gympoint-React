import styled from 'styled-components';
import Modal from 'react-modal';

export const Container = styled.div`
  padding: 0 370px;

  header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 30px;
  }
`;

export const Wrapper = styled.div`
  background: #fff;
  margin-top: 20px;
  padding: 20px 30px;

  div.icon {
    width: 100%;
    text-align: center;
  }
`;

export const HelpTable = styled.table`
  width: 100%;

  thead th {
    text-align: left;
    padding: 10px 0;
    font-size: 16px;
    font-weight: bold;
  }

  tbody td {
    padding: 16px 0;
    border-bottom: 1px solid #eee;
    color: #666;
    font-size: 16px;

    div {
      text-align: right;

      button {
        background: none;
        color: #4d85ee;
        border: 0px;
      }
    }
  }
`;

export const StyledModal = styled(Modal)`
  width: 100%;
  height: 100%;
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);

  div.modal {
    width: 450px;
    height: auto;
    display: flex;
    flex-direction: column;
    align-content: left;
    padding: 30px;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);

    span.modal {
      font-size: 14px;
      font-weight: bold;
      color: #444;
      margin-bottom: 8px;
    }

    span {
      font-size: 14px;
      color: #ee4d64;
      font-weight: bold;
      margin-bottom: 10px;
    }

    p.modal {
      font-size: 16px;
      color: #666;
      margin-bottom: 20px;
    }

    form {
      display: flex;
      flex-direction: column;
      height: 100%;
      justify-content: flex-end;

      textarea.modal {
        border: 1px solid #ddd;
        border-radius: 4px;
        height: 127px;
        margin-bottom: 20px;
        padding: 10px;
        font-size: 14px;
      }

      button.modal {
        height: 45px;
        border: 0;
        border-radius: 4px;
        font-size: 16px;
        text-align: center;
        font-weight: bold;
        color: #fff;
        background: #ee4d64;
      }
    }
  }
`;
