import styled from 'styled-components';

export const Container = styled.div`
  padding: 0 270px;

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
`;

export const Wrapper = styled.div`
  background: #fff;
  margin-top: 20px;
  padding: 30px;
  border-radius: 4px;
  flex: 1;

  div.student {
    margin-bottom: 20px;
  }

  div.inf {
    display: flex;
    flex: 1;
    flex-direction: row;
    width: 100%;

    div.planbox {
      display: flex;
      flex-direction: column;
      width: 400px;
      margin-right: 10px;
      flex-grow: 1;
    }

    div.inputbox {
      display: flex;
      flex-direction: column;
      width: 400px;
      margin-right: 10px;
      flex-grow: 1;

      .input {
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
        height: 45px;
        width: 100%;
      }
    }
    #price {
      margin-right: 0;
    }
  }
  strong {
    font-weight: bold;
    font-size: 14px;
    color: #444;
    margin-bottom: 8px;
  }

  span {
    color: #ee4d64;
    align-self: flex-start;
    margin: 0 0 15px;
    font-weight: bold;
  }
`;
