import React, { useState } from 'react'
import style from './styles.module.css'
import Signup from './images/signup.jpg'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios'
import { ThreeDots } from 'react-loader-spinner'

const Index = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [cell, setCell] = useState('')
  const [password, setPassword] = useState('')
  const [confrimapassword, setconfirmapassword] = useState('')
  const [isLoading, setLoading] = useState(false)

  const navigate = useNavigate()

  async function createAccount(e) {
    e.preventDefault()
    if (
      (password.trim() == '' || email.trim() == '',
      name.trim() == '',
      cell.trim() == '',
      password.trim() == '',
      confrimapassword.trim() == '')
    ) {
      Swal.fire(' Alerta ', 'Preencha todos os campos', 'warning')
    } else if (password != confrimapassword) {
      Swal.fire(' Alerta ', 'As senhas não coincidem ', 'warning')
    } else {
      setLoading(true)
      let res = await axios.post(
        `${process.env.REACT_APP_ENDPOINT}create_account.php`,
        JSON.stringify({
          email: email,
          name: name,
          cell: cell,
          password: password
        })
      )
      setLoading(false)
      if (res.data == 'user-exist') {
        Swal.fire(
          ' Alerta ',
          'Já existe uma conta com esse email',
          'warning'
        )
      } else if (res.data == false) {
        Swal.fire(
          ' Alerta ',
          'Erro ao criar conta, tente novamente',
          'error'
        )
      } else if (res.data == true) {
        Swal.fire(
          ' Parabéns ',
          'Parabéns sua conta foi criada com sucesso',
          'success'
        )
        navigate('/Login')
      }
    }
  }

  return (
    <div className={style.container}>
      <div className={style.left_container}>
        <h1>Moz Escorts</h1>
        <div className={style.left_content}>
          <h1>Bem vindo(a) de volta</h1>
          <p>Por favor digite suas credencias</p>

          <form>
            <h4>Nome</h4>
            <input
              required
              type={'text'}
              placeholder="Digite seu nome"
              onChange={e => setName(e.target.value)}
            />
            <h4>Celular</h4>
            <input
              maxLength={9}
              required
              type={'tel'}
              placeholder="+258"
              onChange={e => setCell(e.target.value)}
            />
            <h4>Email</h4>
            <input
              required
              type={'email'}
              placeholder="Digite seu email"
              onChange={e => setEmail(e.target.value)}
            />

            <h4>Password</h4>
            <input
              required
              type={'password'}
              placeholder="Digite seu password"
              onChange={e => setPassword(e.target.value)}
            />
            <h4>Confirmar Password</h4>
            <input
              required
              type={'password'}
              placeholder="Digite seu password"
              onChange={e => setconfirmapassword(e.target.value)}
            />

            <div className={style.form_submit}>
              <button
                disabled={isLoading}
                onClick={e => createAccount(e)}
              >
                {isLoading ? (
                  <ThreeDots
                    height="10"
                    width="50"
                    radius="9"
                    color="white"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClassName=""
                    visible={true}
                  />
                ) : (
                  'Criar conta'
                )}
              </button>
              <span className={style.no_have_account}>
                Já tem conta ? <Link to="/Login">iniciar sessão</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
      <div className={style.right_container}>
        <img src={Signup} />
      </div>
    </div>
  )
}

export default Index
