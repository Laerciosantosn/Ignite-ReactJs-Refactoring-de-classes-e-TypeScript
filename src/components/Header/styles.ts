import styled from 'styled-components';

export const Container = styled.div`
  background: #c72828;
  padding: 1.875rem 2rem;

  header {
    max-width: 80rem;
    margin: 0 auto;
    padding: 0 0 10rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media screen and (max-width: 600px){
      padding: 0 1rem;
      flex-direction: column;

      nav {
        div {
          button {
            margin-top: 2rem;
          }
        }
      }
    }

    nav {
      div {
        button {
          font-weight: 600;
          border-radius: 8px;
          border: 0;
          background: #39b100;
          color: #fff;

          display: flex;
          flex-direction: row;
          align-items: center;

          .text {
            padding: 16px 24px;
          }

          .icon {
            display: flex;
            padding: 16px 16px;
            background: #41c900;
            border-radius: 0 8px 8px 0;
            margin: 0 auto;
          }
        }
      }
    }
  }
`;
