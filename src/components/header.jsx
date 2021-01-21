import styled from 'styled-components';

const Header = ({ title = '', onRightClick = () => {} }) => {
  return (
    <HeaderContainer>
      <HeaderLeft>&nbsp;</HeaderLeft>
      <Title>{title}</Title>
      <HeaderRight>
        <HeaderButton type="button" onClick={onRightClick}>
          +
        </HeaderButton>
      </HeaderRight>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  padding: 0 20px;
  background-color: silver;
`;

const HeaderLeft = styled.div`
  width: 50px;
  height: 50px;
  text-align: center;
  font-size: 25px;
  // background-color: red;
`;

const HeaderRight = styled.div`
  width: 50px;
  height: 50px;
  text-align: center;
  font-size: 25px;
  // background-color: green;
`;

const Title = styled.div`
  width: 100px;
  text-align: center;
  font-size: 25px;
  // background-color: blue;
`;

const HeaderButton = styled.button`
  width: 50px;
  height: 50px;
`;
