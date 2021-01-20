import styled from 'styled-components';

const Draggable = (props) => {
  return <Container>{props.children}</Container>;
};

export default Draggable;

const Container = styled.div`
  height: 100%;
  padding: 20px;
  background-color: rgb(245, 223, 77);
`;
