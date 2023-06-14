import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Pagina2 from '../../Component/Pagina2';
import { Button, Carousel } from 'react-bootstrap';
import styles from '../../styles/Home.module.css';
import Link from 'next/link';
import apiDeputados from '../../services/apiDeputados';

function AutoLayoutExample({deputados}) {
  return (
    <Pagina2 titulo='Informações Públicas' >
      <Container >
      <Row className={styles.imagem}>
        
        <Col>
        <Carousel className={styles.cardDeputado}>
      <Carousel.Item>
         <Link href={'/deputados/' + deputados[65].id}>
        <img 
          className="d-block w-100"
          src={deputados[65].urlFoto}
          alt="First slide"
        />
        </Link>
        <Carousel.Caption>
          <h3 className={styles.nomeDeputadoCarrosel}>{deputados[65].nome}</h3>
          <h3 className={styles.nomeDeputadoCarrosel}>{deputados[13].nome}</h3>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <Link href={'/deputados/' + deputados[415].id}>
        <img src={deputados[415].urlFoto}
          className="d-block w-100"
        />
        </Link>
        <Carousel.Caption>
          <h3 className={styles.nomeDeputadoCarrosel}>{deputados[415].nome}</h3>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <Link href={'/deputados/' + deputados[204].id}>
        <img
          className="d-block w-100"
          src={deputados[204].urlFoto}
          alt="Third slide"
        />
        </Link>
        <Carousel.Caption>
          <h3 className={styles.nomeDeputadoCarrosel}>{deputados[204].nome}</h3>
          <h3 className={styles.nomeDeputadoCarrosel}>{deputados[220].nome}</h3>
          <h3 className={styles.nomeDeputadoCarrosel}>{deputados[277].nome}</h3>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <Link href={'/deputados/' + deputados[175].id}>
        <img
          className="d-block w-100"
          src={deputados[175].urlFoto}
          alt="Third slide"
        />
        </Link>
        <Carousel.Caption>
          <h3 className={styles.nomeDeputadoCarrosel}>{deputados[175].nome}</h3>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
        </Col>

      <Col>
        <div>
        <h1 className={styles.corTitulo} >Despesas</h1>
        </div>

      <p>
        Bem vindo à nova versão do serviço <strong>Dados Abertos</strong> da Câmara dos Deputados!
      </p>
        <div style={{display:'flex', justifyContent:'center'}}>
        <Link className={styles.corButton} href='../feedback'>
            <Button variant='info'>feedback</Button>
        </Link>
        </div>
        <div>
        <Link className={styles.corButton} href='../pagamento'>
            <Button variant='info'>Pagamento</Button>
        </Link>
        </div>

      </Col>
      </Row>
      </Container>
  
    </Pagina2>
  );
}

export default AutoLayoutExample;

export async function getServerSideProps(context) {

  const resultado = await apiDeputados.get('/deputados')
  const deputados = resultado.data.dados

return {
    props: { deputados},
}
}