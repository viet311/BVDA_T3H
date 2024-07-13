import React, { useEffect, useState } from 'react'
import { getRequest } from '../hook/api'
import { Button, Image, Spin, Form, Input, message } from 'antd'
import { Drawer } from "antd";
import { postRequest } from '../hook/api';
import moment from 'moment'
import TextArea from 'antd/es/input/TextArea';
import ServiceItem from './ServiceItem';

const Cart = () => {
  const [page, setPage] = useState(0)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [totalPage, setTotalPage] = useState()
  const fetchData = () => {
    setLoading(true)
    getRequest(`/order/search?filter=id>0;createBy.id=="${localStorage.getItem('id')}"&sort=id,desc&page=${page}&size=3`)
      .then(data => {
        setData(prev => [...prev, ...data.result.content])
        setTotalPage(data.result.totalPages)
      }
      )
      .catch((err) => console.log(err))
      .finally(() => setLoading(false))
  }


  useEffect(() => {
    if (!loading) {
      fetchData()
    }
  }, [page])
  return (
    <Spin spinning={loading}>
      <div className='h-full relative w-full flex flex-col gap-10 bg-white'>
        <div className='w-full flex justify-center items-center z-10' style={{ height: 400 }}>
          <div className='flex flex-col gap-6 items-center'>
            <div className='z-20 font-bold text-5xl'>Lịch đặt</div>
            <div className='z-20 font-bold text-2xl'>Dịch vụ làm đẹp cho mọi người</div>
          </div>
          <img src={'/banner.jpg'} className='w-full' style={{ height: 400, objectFit: 'cover', position: 'absolute', top: 0, left: 0 }} />
        </div>
        <div className='container'>
          <div className="grid grid-cols-3 gap-20">
            {
              data.map((dt) => <div key={dt.id} className='p-4 bg-white shadow-lg rounded-lg flex flex-col gap-6'>
                <div>
                  <img src={dt.service.avatar} className='w-full h-28 object-cover' preview={false} />
                  <div className="text-xl text-orange-500">{dt.service.name}</div>
                  <div className="text-lg text-orange-500">{dt.service.price} vnđ</div>
                  <div className=" text-gray-500">{dt.service.des}</div>
                </div>
                <div className='flex gap-3'>
                  <img src={dt.expert.avatar} className='w-20 h-20 object-cover' preview={false} />
                  <div>
                    <div className="text-xl text-orange-500">{dt.expert.name}</div>
                  </div>
                </div>
                <div className="text-xl text-orange-500">Ngày đặt: {moment(dt.date, 'YYYY/MM/DD').format('MM/DD/YYYY')}</div>
              </div>)
            }
          </div>
        </div>
        <div className='flex justify-center pb-28'>
          {
            totalPage && page + 1 < totalPage &&
            <Button onClick={() => setPage(prev => prev + 1)}>Xem thêm</Button>
          }
        </div>
      </div>
    </Spin>
  )
}

export default Cart