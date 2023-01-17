import React from 'react'
import style from './style.module.css'
import { AiOutlineHome } from 'react-icons/ai'
import { FiSettings } from 'react-icons/fi'
import { MdOutlinePersonOutline } from 'react-icons/md'
import { BiSearch } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import Slide from 'react-reveal/Slide'

const route = [
  {
    name: 'Inicio',
    icon: (
      <AiOutlineHome
        color={
          localStorage.getItem('mobile-route') == 'Inicio'
            ? 'red'
            : 'black'
        }
      />
    ),
    route: '/'
  },

  {
    name: 'Pesquisar',
    icon: (
      <BiSearch
        color={
          localStorage.getItem('mobile-route') == 'Pesquisar'
            ? 'red'
            : 'black'
        }
      />
    ),
    route: '/'
  },
  {
    name: 'Perfil',
    icon: (
      <MdOutlinePersonOutline
        color={
          localStorage.getItem('mobile-route') == 'Perfil'
            ? 'red'
            : 'black'
        }
      />
    ),
    route: localStorage.getItem('token') ? '/Profile' : '/Login'
  },
  {
    name: 'Definições',
    icon: (
      <FiSettings
        color={
          localStorage.getItem('mobile-route') == 'Definições'
            ? 'red'
            : 'black'
        }
      />
    ),
    route: localStorage.getItem('token') ? '/Profile' : '/Login'
  }
]

const index = () => {
  function navigate(route) {
    localStorage.setItem('mobile-route', route)
  }
  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        {route.map(item => (
          <Link
            to={item.route}
            key={item.name}
            onClick={() =>
              localStorage.setItem('mobile-route', item.name)
            }
          >
            <Slide bottom>{item.icon}</Slide>
            <span
              style={{
                color:
                  localStorage.getItem('mobile-route') == item.name
                    ? 'red'
                    : 'black'
              }}
              className={style.text}
            >
              {item.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default index
