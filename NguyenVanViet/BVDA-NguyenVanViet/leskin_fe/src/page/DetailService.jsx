import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getRequest } from '../hook/api'
import { Spin } from 'antd'
import ExpertItem from './ExpertItem'
import ExpertItemDetail from './ExpertItemDetail'

const DetailService = () => {
    const params = useParams()
    const [data, setData] = useState()
    const [suggest, setSuggest] = useState([])
    const [loading, setLoading] = useState(false)
    console.log(params)
    useEffect(() => {
        setLoading(true)
        getRequest(`/service/detail?id=${params?.id}`)
            .then(data => {
                setData(data?.result)
                getRequest(`/expert/search?filter=id>0&sort=id,desc&page=0&size=3`)
                    .then(dt => {
                        setSuggest(dt.result.content)
                    }
                    )
                    .catch((err) => console.log(err))
                    .finally(() => setLoading(false))

            }
            )
            .catch((err) => console.log(err))
    }, [])

    return (
        <Spin spinning={loading}>
            <div>
                <div className='w-full flex justify-center items-center z-10' style={{ height: 400 }}>
                    <div className='flex flex-col gap-6 items-center'>
                        <div className='z-20 font-bold text-5xl'>Dịch vụ</div>
                        <div className='z-20 font-bold text-2xl'>Dịch vụ làm đẹp cho mọi người</div>
                    </div>
                    <img src={'/banner.jpg'} className='w-full' style={{ height: 400, objectFit: 'cover', position: 'absolute', top: 0, left: 0 }} />
                </div>
                <div className='grid grid-cols-3 container py-6 gap-6'>
                    <div className='col-span-2'>
                        <img src={data?.avatar} className='aspect-square w-full object-cover rounded-md' />
                        <div className='text-xl font-bold'>{data?.name}</div>
                        <div>{data?.des}</div>
                    </div>
                    <div className='flex flex-col gap-6'>
                        <p className='text-xl font-bold'>Đề xuất</p>
                        {
                            suggest.map((dt, index) => <ExpertItemDetail key={index} dt={dt} />)
                        }
                    </div>
                </div>
            </div>
        </Spin>
    )
}

export default DetailService