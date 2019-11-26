import styled from 'styled-components';
import Modal from 'react-modal';

export const Container = styled.div`
  height: 100%;
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
  span.modal {
    font-size: 14px;
    font-weight: bold;
    color: #444;
    margin-bottom: 20px;
  }

  p.modal {
    font-size: 16px;
    color: #666;
    margin-bottom: 20px;
  }

  input.modal {
    border: 1px solid #eee;
    border-radius: 4px;
    height: 45px;
  }

  button.modal {
    height: 45px;
    text-align: center;
    background: #ee4d64;
  }
`;
