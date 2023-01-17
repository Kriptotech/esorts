import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import style from './styles.module.css'
import { useParams } from 'react-router-dom'
import { InfinitySpin } from 'react-loader-spinner'
import { AiFillPhone } from 'react-icons/ai'
import { MdVerified } from 'react-icons/md'
import { motion } from 'framer-motion'
import axios from 'axios'

const Index = () => {
  const { id } = useParams()

  const [text, setText] = useState()
  const [readMore, setReadMore] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [modal, setModal] = useState(false)
  const [selectedImage, setSelectedImage] = useState('')
  const [images, setImages] = useState([])
  const [detail, setDetail] = useState([])
  const [prices, setPrices] = useState([])

  useEffect(() => {
    localStorage.setItem('mobile-route', 'detail')
    getDetails()
    getPrices()
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
  async function getPrices() {
    setLoading(true)
    let res = await axios.get(
      `${process.env.REACT_APP_ENDPOINT}get_package.php?id=${id}`
    )
    setPrices(res.data)
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
      {modal && (
        <div className={style.modal}>
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={
              modal ? { y: 0, opacity: 1 } : { y: -80, opacity: 0 }
            }
            transition={{ duration: 1 }}
            className={style.content_modal}
          >
            <div className={style.close_modal_container}>
              <div
                onClick={() => setModal(false)}
                className={style.close_modal}
              >
                X
              </div>
            </div>

            <div className={style.content}>
              {prices.map(item => (
                <div className={style.price_container} key={item.id}>
                  <h1>
                    {item.name} - {item.price} MT
                  </h1>
                  {item.items.map(item => (
                    <ul>
                      <li>{item.service}</li>
                    </ul>
                  ))}
                  <button>Pagar plano {item.name}</button>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}
      {detail.length != 0 && (
        <>
          {detail.map(item => (
            <div key={item.id} className={style.wrapper}>
              <div className={style.left_container}>
                <div className={style.profile_container}>
                  {item.owner && (
                    <MdVerified className={style.verfied_icon} />
                  )}
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

                  <h1>Sobre</h1>
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
                  <div className={style.contact_container}>
                    {item.owner ? (
                      <button onClick={() => setModal(true)}>
                        Solicitar acompanhante
                      </button>
                    ) : (
                      <a
                        className={style.tel}
                        href={`tel:${item.number}`}
                      >
                        Contactar{' '}
                        <AiFillPhone style={{ marginLeft: 20 }} />
                      </a>
                    )}
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
