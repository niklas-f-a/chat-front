import NavBar from "../../components/NavBar"
import ServersBar from "../../components/ServersBar"
import SideBar from "../../components/SideBar"
import ChatRoom from "../../components/ChatRoom"
import * as S from './styled'


const Layout = () => {


  return (
    <S.Main>
      <ServersBar />
      <S.Section>
        <NavBar />
        <SideBar />
        <ChatRoom />
      </S.Section>
    </S.Main>
  )
}

export default Layout