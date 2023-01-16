import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import style from './styles.module.css'
import { useParams } from 'react-router-dom'
import { InfinitySpin } from 'react-loader-spinner'

import axios from 'axios'
const restrition = [
  {
    id: 1,
    name: 'Sexo anal',
    image: require('./images/anal.png'),
    is: 'Permitido'
  },
  {
    id: 2,
    name: 'Sexo oral',
    image: require('./images/oral.png'),
    is: 'Permitido'
  },
  {
    id: 3,
    name: 'Sem proteção',
    image: require('./images/protetion.png'),
    is: 'Não permitido'
  }
]

const Index = () => {
  const { id } = useParams()

  const [text, setText] = useState()
  const [readMore, setReadMore] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [selectedImage, setSelectedImage] = useState('')
  const [images, setImages] = useState([])
  const [detail, setDetail] = useState([])

  useEffect(() => {
    localStorage.setItem('mobile-route', 'detail')
    getDetails()
  }, [])
  async function getDetails() {
    setLoading(true)
    let res = await axios.get(
      `${process.env.REACT_APP_ENDPOINT}detail_esort.php?id=${id}`
    )
    setDetail(res.data.items)
    setImages(res.data.images)
    setSelectedImage(res.data.images[0])
    setText(res.data.desc.slice(0, 200))
    setLoading(false)
  }

  if (isLoading)
    return (
      <div className={style.isLoading}>
        <InfinitySpin width="200" color="red" />
      </div>
    )
  return (
    <div>
      {detail.length != 0 && (
        <>
          {detail.map(item => (
            <div key={item.id} className={style.wrapper}>
              <div className={style.left_container}>
                <div className={style.profile_container}>
                  <img
                    alt="esort-image"
                    src={
                      process.env.REACT_APP_ENDPOINT +
                      selectedImage.image
                    }
                  />
                  <div className={style.thumb}>
                    {images.map(item => (
                      <img
                        onClick={() => setSelectedImage(item)}
                        key={item.id}
                        alt="thumb-images"
                        style={{
                          border:
                            selectedImage.image == item.image
                              ? '1px solid red'
                              : 'none'
                        }}
                        src={
                          process.env.REACT_APP_ENDPOINT + item.image
                        }
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className={style.right_container}>
                <div className={style.info}>
                  <h1>{item.name}</h1>
                  <span className={style.minimal_info}>
                    <span>Idade: </span>
                    {item.age} Anos
                  </span>
                  <span className={style.minimal_info}>
                    <span>Altura: </span>
                    {item.height} M
                  </span>
                  <div className={style.contact_container}>
                    <button>Solicitar acompanhante</button>
                  </div>
                  <span className={style.bio}>
                    {!readMore ? (
                      <p>{text} ...</p>
                    ) : (
                      <p>{item.description}</p>
                    )}
                    {!readMore ? (
                      <p
                        onClick={() => setReadMore(true)}
                        className={style.readmore}
                      >
                        Ler mais
                      </p>
                    ) : (
                      <p
                        onClick={() => setReadMore(false)}
                        className={style.readmore}
                      >
                        Ler menos
                      </p>
                    )}
                  </span>

                  <h1>Restrições:</h1>
                  <div className={style.restrition_container}>
                    {restrition.map(item => (
                      <div
                        className={style.container_icon}
                        key={item.id}
                      >
                        <img src={item.image} />
                        <span style={{ fontWeight: 500 }}>
                          {item.name}
                        </span>
                        <span
                          style={{
                            color:
                              item.is == 'Permitido' ? 'green' : 'red'
                          }}
                        >
                          {item.is}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  )
}

export default Index
