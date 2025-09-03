import { ClipLoader } from 'react-spinners'
import { Colors } from '../../styles'
import { Container } from './styles'

const Loader = () => (
  <Container>
    <ClipLoader color={Colors.red} />
  </Container>
)

export default Loader
