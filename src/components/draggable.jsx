import styled from 'styled-components';

const Draggable = (props) => {
  return <DraggableContainer>{props.children}</DraggableContainer>;
};

export default Draggable;

const DraggableContainer = styled.div`
  height: 100%;
  padding: 20px;
  background-color: rgb(245, 223, 77);
`;
