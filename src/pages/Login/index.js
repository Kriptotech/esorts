import React, { useState } from 'react'
import style from './styles.module.css'
import Login from './images/login.jpg'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios'
import { ThreeDots } from 'react-loader-spinner'

const Index = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setLoading] = useState(false)

  const navigate = useNavigate()

  async function login(e) {
    e.preventDefault()
    if (password.trim() == '' || email.trim() == '') {
      Swal.fire(' Alerta ', 'Preencha todos os campos', 'warning')
    } else {
      setLoading(true)
      let res = await axios.post(
        `${process.env.REACT_APP_ENDPOINT}user_login.php`,
        JSON.stringify({
          email: email,
          password: password
        })
      )
      console.log(res.data)
      setLoading(false)
      if (res.data.response == false) {
        Swal.fire(' Alerta ', 'Usuário ou senha invalida ', 'error')
      } else if (res.data.response == true) {
        localStorage.setItem('token', res.data.id)
        localStorage.setItem('name', res.data.name)
        localStorage.setItem('cell', res.data.cell)
        localStorage.setItem('email', res.data.email)

        navigate('/')
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

            <div className={style.form_submit}>
              <p>Esqueci a palavra-passe</p>
              <button disabled={isLoading} onClick={e => login(e)}>
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
                  'Iniciar sessão'
                )}
              </button>
              <span className={style.no_have_account}>
                Nao tem conta ?{' '}
                <Link to={'/Signup'}>Criar conta</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
      <div className={style.right_container}>
        <img src={Login} />
      </div>
    </div>
  )
}

export default Index
