import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Pagina2 from '../../Component/Pagina2';
import { Button, Carousel } from 'react-bootstrap';
import styles from '../../styles/Home.module.css';
import Link from 'next/link';
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import apiDeputados from '../../services/apiDeputados';

function AutoLayoutExample({deputados}) {

  const columns = [
    {
        headerName: 'Name',
        field: 'nome',
        checkboxSelection: true
    },
    {
        headerName: 'Age', field: 'age'
    }
]
const defaultColDef = {
    sortable: true, editable: true, filter: true

}

  return (
    <Pagina2 titulo='Informações Públicas' >
      <Container >
      <Row className={styles.imagem}>
        
        <Col>
        <Carousel className={styles.cardDeputado}>
        {deputados.map(item => (
      <Carousel.Item>
         <Link href={'/deputados/' + item.id}>
        <img 
          className="d-block w-100"
          src={item.urlFoto}
          alt="First slide"
        />
        </Link>
        <Carousel.Caption>
          <h3 className={styles.nomeDeputadoCarrosel}>{item.nome}</h3>
        </Carousel.Caption>
      </Carousel.Item>
      ))}
      </Carousel>

        </Col>

      <Col>
        <div>
        <h1 className={styles.corTitulo} >Despesas</h1>
        </div>

      <p>
        Bem vindo à nova versão do serviço <strong>Dados Abertos</strong> da Câmara dos Deputados!
      </p>


        <div className='ag-theme-alpine '
            style={{
                height: '250px',
                width: '600px'
            }}>

            <AgGridReact rowData={deputados.map(deputado => ({ nome: deputado.nome }))} columnDefs={columns} defaultColDef={defaultColDef} />


        </div>

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