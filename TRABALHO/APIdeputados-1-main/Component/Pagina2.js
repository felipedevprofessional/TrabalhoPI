import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import { Container } from 'react-bootstrap';

const Pagina = (props) => {

    return (
        <>
         
            <div className='bg-primary text-white py-2 text-center mb-3'>
                <h1>{props.titulo}</h1>
            </div>
            
            <Container className='mb-5'>
                {props.children}
            </Container>

        </>
    )
}

export default Pagina