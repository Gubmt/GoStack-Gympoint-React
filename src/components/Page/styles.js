import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
  div {
    width: 300px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    .prev {
      background: none;
      border: 0;
      padding: 8px;
      margin: 0 0.25rem;
      &:disabled {
        opacity: 0.6;
        cursor: default;
      }
      span {
        font-size: 14px;
        font-weight: bold;
      }
    }
    .pageNumber {
      font-size: 16px;
      font-weight: bold;
      color: #000;
    }
    .next {
      background: none;
      border: 0;
      padding: 8px;
      margin: 0 0.25rem;
      &:disabled {
        opacity: 0.6;
        cursor: default;
      }
      span {
        font-size: 14px;
        font-weight: bold;
      }
    }
  }
`;
