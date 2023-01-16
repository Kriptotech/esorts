import React, { useEffect, useState } from 'react'
import style from './styles.module.css'
import { FiMapPin } from 'react-icons/fi'
import { GoAlert } from 'react-icons/go'
import { AiOutlineClose } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import { InfinitySpin } from 'react-loader-spinner'

import axios from 'axios'

const Index = () => {
  const [selectedProvince, setSelectedProvince] = useState('')
  const [isLoading, setLoading] = useState(false)
  const [alert, SetAlert] = useState(true)
  const [esorts, setEsorts] = useState([])

  const navigate = useNavigate()
  useEffect(() => {
    getEsorts()
    localStorage.setItem('mobile-route', 'Inicio')
  }, [])

  function ToDetail(item) {
    navigate('/Detail', { state: { item: item } })
    localStorage.setItem('mobile-route', '')
  }
  async function getEsorts() {
    setLoading(true)
    let res = await axios.get(
      `${process.env.REACT_APP_ENDPOINT}getesorts.php`
    )
    setLoading(false)
    console.log(res.data)
    setEsorts(res.data.items)
  }
  function click() {
    SetAlert(false)
  }

  if (isLoading)
    return (
      <div className={style.isLoading}>
        <InfinitySpin width="200" color="red" />
      </div>
    )

  return (
    <div className={style.container}>
      <div className={style.search_container}>
        <select
          className={style.province}
          onChange={e => setSelectedProvince(e.target.value)}
        >
          <option value="Nampula">Nampula</option>
          <option value="Beira">Beira</option>
          <option value="Maputo">Maputo</option>
        </select>
        <select
          className={style.province}
          onChange={e => setSelectedProvince(e.target.value)}
        >
          <option value="Nampula">Mulheres</option>
          <option value="Beira">Homens</option>
          <option value="Maputo">Gays</option>
          <option value="Maputo">Lesbicas</option>
        </select>
        <button className={style.search_button}>Buscar</button>
      </div>
      {alert == true && (
        <div onClick={() => click()} className={style.info_alert}>
          <AiOutlineClose className={style.icon_alert_close} />
          <GoAlert className={style.icon_alert} />
          Moz Esorts não é responsável por produtos ou serviços
          oferecidos nos anúncios e não se responsabiliza por ações do
          usuário.
        </div>
      )}
      <div className={style.welcome}>
        <h1>Acompanhantes</h1>
        <p>
          Caro visitante, se você quiser encontrar alguém para sexo
          duro, uma noite apaixonada ou talvez você queira um encontro
          romântico com putas de programa ou acompanhantes em
          Moçambique, você está no lugar certo! Descubra o nosso site
          e encontre o parceiro que deseja: loira, morena, latina,
          adolescentes, madura, putas de escola, pornstars e
          transexuais. Há escoltas de Maputo, prostitutas de Matola,
          Beira, Nampula , Chimoio e 20 outras cidades . Nossa web
          desperta paixões!
        </p>
      </div>

      <div className={style.wrapper}>
        {esorts.map(item => (
          <Link
            to={`/detail/${item.id}`}
            key={item.id}
            className={style.image_area}
          >
            <div className={style.image}>
              <img
                src={
                  process.env.REACT_APP_ENDPOINT + item.image_backdrop
                }
                alt="image-de-perfil"
              />
            </div>

            {/* <button className={style.hearthbutton_outline}>
                <AiOutlineHeart />
              </button> */}
            {item.verified && (
              <button className={style.verificado}>
                Verificado(a)
              </button>
            )}
            <div className={style.info_container}>
              <span className={style.name}>{item.name}</span>
              <span className={style.bio}>
                {item.description.length > 80
                  ? item.description.substring(0, 80) + '...'
                  : item.description}
              </span>
              <span className={style.local}>
                <FiMapPin /> {item.province}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Index
