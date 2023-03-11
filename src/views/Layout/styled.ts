import styled from 'styled-components'

export const Main = styled.body`
  display: flex;
  flex-direction: row;
`

export const Section = styled.section`
  width: 100%;
  display: grid;
  grid-template-rows: 4rem auto;
  grid-template-columns: 15rem auto;
  grid-template-areas:
    "NavBar NavBar"
    "SideBar ChatRoom";
`
