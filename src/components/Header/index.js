import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiPlusCircle } from 'react-icons/fi'
import { IoLogInOutline } from 'react-icons/io5'
import { FaBars } from 'react-icons/fa'
import { AiOutlineClose } from 'react-icons/ai'
import { MdPersonAddAlt1 } from 'react-icons/md'
import { motion } from 'framer-motion'
import style from './style.module.css'

const Header = () => {
  const [on, setOn] = useState(false)

  const toogleClick = () => {
    setOn(!on)
  }

  return (
    <nav className={style.nav}>
      <div className={style.nav_wrapper}>
        <h1 className={style.logo}>MOZ ESCORTS</h1>
        <ul className={style.list}>
          <li className={style.list_item}>
            <FiPlusCircle className={style.icons} />
            <Link>Quero ser acompanhante</Link>
          </li>
          <li className={style.list_item}>
            <IoLogInOutline className={style.icons} />
            <Link>Entrar</Link>
          </li>
          <li className={style.list_item}>
            <MdPersonAddAlt1 className={style.icons} />
            <Link>Registrar</Link>
          </li>
        </ul>
        <div onClick={toogleClick} className={style.mobile}>
          {on ? (
            <AiOutlineClose color="red" size={20} />
          ) : (
            <FaBars color="red" size={20} />
          )}
        </div>

        {on && (
          <motion.ul
            initial={{ x: 500 }}
            animate={
              on ? { x: 0, opacity: 0.95 } : { x: 500, opacity: 0 }
            }
            transition={{ duration: 0.2 }}
            className={style.list_mobile}
          >
            <li className={style.list_item}>
              <FiPlusCircle className={style.icons} />
              <Link>Quero ser acompanhante</Link>
            </li>
            <li className={style.list_item}>
              <IoLogInOutline className={style.icons} />
              <Link>Entrar</Link>
            </li>
            <li className={style.list_item}>
              <MdPersonAddAlt1 className={style.icons} />
              <Link>Registrar</Link>
            </li>
          </motion.ul>
        )}
        {/* <motion.div
          initial={{ x: 300 }}
          animate={on ? { x: 0 } : { x: 300 }}
          transition={{ duration: 0.8 }}
          className={on ? style.mobile_nav : style.mobile_nav}
        >
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/filmes">Filmes</Link>
          </li>
          <li>
            <Link to="/animacao">Animação</Link>
          </li>
          <li>
            <Link to="/Series">Series</Link>
          </li>
        </motion.div>  */}
      </div>
    </nav>
  )
}

export default Header
