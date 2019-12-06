import styled from 'styled-components';

export const Container = styled.div`
  padding: 0 60px;

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
        width: 142px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        padding: 0 10px;
        border: 0px;
        border-radius: 4px;
        background: #ee4d64;
        color: #fff;
        font-weight: bold;
      }

      input {
        width: 237px;
        height: 36px;
        border: 1px solid #ddd;
        border-radius: 4px;
        margin-left: 16px;
        padding: 10px;
        color: #000;

        &::placeholder {
          color: #999;
        }
      }
    }
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

export const RegistrationTable = styled.table`
  width: 100%;
  text-align: center;

  thead th {
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

      button#left {
        color: #4d85ee;
        margin-right: 25px;
      }

      button {
        background: none;
        color: #de3b3b;
        border: 0px;
      }
    }
  }

  .student {
    text-align: left;
  }
`;
