import Link from 'next/link'
import Pagina2 from '../../Component/Pagina2'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import {Button, Form, Table} from 'react-bootstrap'
import {AiFillDelete} from 'react-icons/ai'
import {BsFillPencilFill} from 'react-icons/bs'


export const index = () => {

  
  const {push, query} = useRouter()
  const { register, handleSubmit, setValue } = useForm()

  const[feedback, setFeedback] = useState([])

  useEffect(() => {
    setFeedback(getAll())
},[])

  function getAll(){
    return JSON.parse(window.localStorage.getItem('feedback')) || []
  }

  function salvar(dados) {
    const feedback = JSON.parse(window.localStorage.getItem('feedback')) || []
    feedback.push(dados)
    window.localStorage.setItem('feedback', JSON.stringify(feedback))
    setFeedback(feedback)
}

  function excluir(id){
    if(confirm('Deseja realmente excluir')){
    const feedback = getAll()
    feedback.splice(id,1)
    window.localStorage.setItem('feedback',JSON.stringify(feedback))
    setFeedback(feedback)
  }
  }

  const validadorNome = {
    required: 'O campo é obrigatório'
  }

    const validadorEmail= {
    required: 'O campo é obrigatório'
  }

  const validadorObservacoes = {
    required: 'O campo é obrigatório'
  }

console.log(feedback)
    return (
        <Pagina2 titulo="feedback">

<Form>
      <Form.Group className="mb-3" controlId="nome">
        <Form.Label>Nome</Form.Label>
        <Form.Control type="text" placeholder="" {...register('nome', validadorNome)} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control type="text" placeholder="" {...register('email', validadorEmail)} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="observacoes">
        <Form.Label>Observações</Form.Label>
        <Form.Control type="text" placeholder="" {...register('observacoes', validadorObservacoes)} />
      </Form.Group>

      <div className='text-center'>
      <Button variant="primary" type="submit" onClick={handleSubmit(salvar)}>
        Enviar
      </Button>

      <Link href='/deputados' className='btn btn-danger ms-2'>
            Voltar
      </Link>
      </div>

    </Form>

    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>#</th>
          <th>Nome</th>
          <th>Email</th>
          <th>Observações</th>
        </tr>
      </thead>
     
      <tbody>
      {feedback.map((item,i) => (
        <tr key={i}>
          <td>
            <td>
                {' '}
                    <Button title="Excluir" onClick={() => excluir(i)} className='text-danger' />
                </td>
          </td>
          <td>{item.nome}</td>
          <td>{item.email}</td>
          <td>{item.observacoes}</td>
        </tr>
         ))}
      </tbody>
      
    </Table> 
        
   
        </Pagina2>
    )}

export default index