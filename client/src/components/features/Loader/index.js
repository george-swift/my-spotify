import { Container, Bars, Bar } from './styles';

const Loader = () => (
  <Container>
    <Bars>
      <Bar delay="250ms" />
      <Bar delay="715ms" />
      <Bar delay="475ms" />
      <Bar delay="25ms" />
      <Bar delay="190ms" />
    </Bars>
  </Container>
);

export default Loader;
