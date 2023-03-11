import styled from 'styled-components';

export const Main = styled.main`
  display: flex;
  flex-direction: row;
  height: 100vh;
  background-color: gray;
`;

export const Section = styled.section`
  width: 100%;
  display: grid;
  grid-template-rows: 4rem auto;
  grid-template-columns: 15rem auto;
  grid-template-areas:
    'NavBar NavBar'
    'SideBar ChatRoom';
`;
