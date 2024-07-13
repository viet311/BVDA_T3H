import React, { useEffect, useState } from 'react'
import { getRequest } from '../hook/api'
import { Button, Carousel, Image, Spin } from 'antd'
import moment from 'moment'
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import DrawerService from "./DrawerService";

const Home = () => {
  const [service, setService] = useState([])
  const [exert, setExert] = useState([])
  const [post, setPost] = useState([])
  const navigate = useNavigate()


  const [loading, setLoading] = useState(false)
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3
  };
  const fetchData = () => {
    setLoading(true)
    getRequest(`/service/search?filter=id>0&sort=id,asc&page=0&size=5`)
      .then(data => {
        setService(data.result.content)
      }
      )
      .catch((err) => console.log(err))
    getRequest(`/expert/search?filter=id>0&sort=id,asc&page=0&size=5`)
      .then(data => {
        setExert(data.result.content)
      }
      )
      .catch((err) => console.log(err))
    getRequest(`/post/search?filter=id>0&sort=id,asc&page=0&size=5`)
      .then(data => {
        setPost(data.result.content)
      }
      )
      .catch((err) => console.log(err))
      .finally(() => setLoading(false)
      )
  }

  useEffect(() => {
    fetchData()
  }, [])
  return (
    <Spin spinning={loading}>
      <div className='h-full relative w-full flex flex-col gap-10 bg-white'>
        <div className='w-full flex justify-center items-center z-10' style={{ height: 400 }}>
          <div className='flex flex-col gap-6 items-center'>
            <div className='z-20 font-bold text-5xl'>Dịch vụ</div>
            <div className='z-20 font-bold text-2xl'>Dịch vụ làm đẹp cho mọi người</div>
          </div>
          <img src={'/banner.jpg'} className='w-full' style={{ height: 400, objectFit: 'cover', position: 'absolute', top: 0, left: 0 }} />
        </div>
        <div className='container flex flex-col gap-10 pb-20'>
          <div className='font-bold text-3xl py-6 text-center'>Dịch vụ</div>
          <div className="slider-container">
            <Slider {...settings}>
              {
                service.map((dt) => <div key={dt.id} className='flex flex-col justify-center gap-4 text-center'>
                  <Image src={dt.avatar} className='rounded-full p-10 aspect-square object-cover' preview={false} />
                  <div className='text-xl text-orange-500'>{dt.name}</div>
                  <div className='text-lg text-orange-500'>{dt.price} vnđ</div>
                  <div className=' text-gray-500'>{dt.des}</div>
                  <div>
                    <DrawerService dt={dt} />
                  </div>
                </div>)
              }
            </Slider>
          </div>
          <div className='font-bold text-3xl py-6 text-center'>Chuyên gia</div>
          <div className="slider-container">
            <Slider {...settings}>
              {
                exert.map((dt) => <div key={dt.id} className='flex flex-col justify-center gap-4 text-center'>
                  <Image src={dt.avatar} className='rounded-full p-10 aspect-square object-cover' preview={false} />
                  <div className='text-xl text-orange-500'>{dt.name}</div>
                  <div className='text-lg text-orange-500'>{dt.price} vnđ</div>
                  <div className=' text-gray-500'>{dt.des}</div>
                  <div>
                    <Button className='text-orange-500 hover:text-orange-600' onClick={() => navigate("/expert/" + dt.id)}>Xem chi tiết</Button>
                  </div>
                </div>)
              }
            </Slider>
          </div>
          <div className='font-bold text-3xl py-6 text-center'>Bài viết</div>
          <div className="slider-container">
            <Slider {...settings}>
              {
                post.map((dt) => <div key={dt.id} className='flex flex-col justify-center gap-4 text-center'>
                  <Image src={dt.avatar} className='rounded-full p-10 aspect-square object-cover' preview={false} />
                  <div className='text-xl text-orange-500'>{dt.title}</div>
                  <div className=' text-gray-500'>{dt.content}</div>
                  <div>
                    <Button className='text-orange-500 hover:text-orange-600' onClick={() => navigate("/post/" + dt.id)}>Xem chi tiết</Button>
                  </div>
                </div>)
              }
            </Slider>
          </div>
        </div>
      </div>
    </Spin>
  )
}

export default Home