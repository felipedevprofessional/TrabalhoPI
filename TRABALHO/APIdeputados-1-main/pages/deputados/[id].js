import React from 'react'
import { Button, Card, Col, Row, Table } from 'react-bootstrap'
import Link from 'next/link'
import Pagina2 from '@/Component/Pagina2'
import apiDeputados from '@/services/apiDeputados'
import { Chart as chartjs, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js'
import { Line } from 'react-chartjs-2'
import styles from '../../styles/Home.module.css';

chartjs.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement
)

const Detalhes = ({ deputado, despesas, profissoes }) => {
    const valoresDespesas = despesas.map((item) => item.valorDocumento);
    const datasDespesas = despesas.map((item) => item.dataDocumento);

    const data = {
        labels: datasDespesas,
        datasets: [{
            data: valoresDespesas,
            backgroundColor: 'gray',
            borderColor: 'blue'
        }]
    };
    const option = {};

    return (
        <Pagina2 titulo={deputado.ultimoStatus.nome}>

            <Row>
                <Col md={2}>
                    <Card className='mb-4'>
                        <Card.Img variant="top" key={deputado.id} src={deputado.ultimoStatus.urlFoto} />
                        <Card.Body>
                            <Card.Title>{deputado.ultimoStatus.nome}</Card.Title>
                            <Card.Text>Partido: {deputado.ultimoStatus.siglaPartido}</Card.Text>
                            <Card.Text>UF Partido: {deputado.ultimoStatus.siglaUf}</Card.Text>
                        </Card.Body>
                    </Card>
                    <Link className={styles.corButton} href='/deputados'>
                        <Button variant='info'>Voltar</Button>
                    </Link>
                </Col>
                <Col md={7} style={{height:'' }}>
                    <h1>Despesas</h1>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>Data</th>
                                <th>Descrição</th>
                                <th>Valor</th>
                            </tr>
                        </thead>
                        <tbody>
                            {despesas.map((item, lista) => (
                                <tr key={lista}>
                                    <td>{item.dataDocumento}</td>
                                    <td>{item.tipoDespesa}</td>
                                    <td>${item.valorDocumento}</td>
                                </tr>
                            ))}
                        </tbody>

                    </Table>
                </Col>
                <Col md={3}>
                    <h1>Profissões</h1>
                    <ul>
                        {profissoes.map(item => (
                            <li>{item.titulo}</li>
                        ))}
                    </ul>

                </Col>
                <Col style={{ width: '500px', height: '500px', marginLeft: '20px' }}>
                    <Line data={data} options={option}></Line>

                </Col>
            </Row>

        </Pagina2>
    )
}

export default Detalhes

export async function getServerSideProps(context) {

    const id = context.params.id

    const dep = await apiDeputados.get('/deputados/' + id)
    const deputado = dep.data.dados

    const desp = await apiDeputados.get('/deputados/' + id + '/despesas')
    const despesas = desp.data.dados

    const prof = await apiDeputados.get('/deputados/' + id + '/profissoes')
    const profissoes = prof.data.dados

    return {
        props: { despesas, deputado, profissoes },
    }

}