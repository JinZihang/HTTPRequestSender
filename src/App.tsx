import { Container, Typography } from '@mui/material';
import Spacer from './components/Spacer';
import HttpRequestSender from './components/HttpRequestSender';

const App = () => {
  return (
    <Container>
      <Typography variant="h1">HTTP Request Sender</Typography>
      <Spacer />
      <HttpRequestSender />
    </Container>
  );
};

export default App;
