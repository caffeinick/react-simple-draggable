import styled from 'styled-components';

import Draggable from './components/draggable';
import Box from './components/box';

function App() {
  return (
    <Container>
      <Draggable>
        <Box>box1</Box>
        <Box>box2</Box>
        <Box>box3</Box>
        <Box>box4</Box>
        <Box>box5</Box>
      </Draggable>
    </Container>
  );
}

export default App;

const Container = styled.div`
  height: 100vh;
  padding: 10px;
  background-color: black;
`;
