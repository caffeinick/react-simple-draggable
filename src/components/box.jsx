import styled from 'styled-components';

const Box = (props) => {
  return <Container>{props.children}</Container>;
};

export default Box;

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  padding: 0 10px;
  border: 1px solid white;
  background-color: rgb(147, 149, 151);
  color: white;
`;
