import React, { useEffect, useState } from 'react'
import { Button, Image, Spin, Form, Input, message } from 'antd'
import { Bar } from 'react-chartjs-2';
import {
    Chart as Chartjs,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
} from 'chart.js';
import { postRequest } from '../hook/api';
// import DatePicker from "react-datepicker";
import dayjs from 'dayjs';
import { DatePicker, Space } from 'antd';
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';
const defaultStartDate = dayjs();
const defaultEndDate = dayjs().add(7, 'day');
const defaultRange = [defaultStartDate, defaultEndDate];
Chartjs.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
)

const Statistic = () => {
    const [loading, setLoading] = useState(false)
    const [label, setLabel] = useState([]);
    const [count, setCount] = useState([]);
    const [revenue, setRevenue] = useState([]);
    const [type, setType] = useState(1);
    const [total, setTotal] = useState(0);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const fetchData = () => {
        setLoading(true)
        postRequest(`/statistic`, { type: 1 })
            .then(data => {
                data.result?.map(e => {
                    setLabel(pre => [...pre, e.date])
                    setCount(pre => [...pre, e.quantity])
                    setRevenue(pre => [...pre, e.revenue])
                    setTotal(pre => pre + e.quantity)
                    setTotalRevenue(pre => pre + e.revenue)
                })
            }
            )
            .catch((err) => console.log(err))
            .finally(() => setLoading(false))
    }
    useEffect(() => {
        if (!loading) {
            fetchData()
        }
    }, [])
    const selectType = (e) => {
        setLabel([]);
        setCount([]);
        setRevenue([]);
        setTotal(0);
        setTotalRevenue(0);
        setType(e.target.value)
        if (e.target.value == 1) {
            fetchData();
        } else {
            let startDate = dayjs().format('YYYYMMDD');
            let endDate = dayjs().add(7, 'day').format('YYYYMMDD');
            fetchDataDate(startDate, endDate)
        }
    }

    const fetchDataDate = (startDate, endDate) => {
        postRequest(`/statistic`, { type: 2, startDate: startDate, endDate: endDate })
            .then(data => {
                data.result?.map(e => {
                    setLabel(pre => [...pre, e.date])
                    setCount(pre => [...pre, e.quantity])
                    setRevenue(pre => [...pre, e.revenue])
                    setTotal(pre => pre + e.quantity)
                    setTotalRevenue(pre => pre + e.revenue)
                })
            }
            )
            .catch((err) => console.log(err))
            .finally(() => setLoading(false))
    }
    const handleRangeChange = (dates) => {
        const startDate = dates[0].format('YYYYMMDD');
        const endDate = dates[1].format('YYYYMMDD');
        fetchDataDate(startDate, endDate)
    };
    return (
                <Spin spinning={loading} className='flex justify-center w-full'>
                    <div className='p-8 flex gap-4'>
                        <select className='!w-40 !h-8' onChange={e => selectType(e)}>
                            <option value={1}>Theo tháng</option>
                            <option value={2}>Theo thời gian</option>
                        </select>
                        {
                            type == 2 ? <div className='flex gap-4'>
                                <RangePicker className='!h-8' defaultValue={defaultRange}
                                    format={dateFormat} onChange={handleRangeChange} />
                            </div> : ''
                        }
                    </div>
                    <div className='w-full flex justify-center'>
                        <div className=' h-96 flex justify-center gap-16'>
                            <Bar
                                data={{
                                    labels: label,
                                    datasets: [
                                        {
                                            label: "Thống kê doanh thu",
                                            backgroundColor: [
                                                "#3e95cd"
                                            ],
                                            data: revenue
                                        }
                                    ]
                                }}
                                options={{
                                    legend: { display: false },
                                    title: {
                                        display: true,
                                        text: "Predicted world population (millions) in 2050"
                                    }
                                }}
                            />

                            <Bar
                                data={{
                                    labels: label,
                                    datasets: [
                                        {
                                            label: "Thống kê số lượng đơn",
                                            backgroundColor: [
                                                "#c45850"
                                            ],
                                            data: count
                                        }
                                    ]
                                }}
                                options={{
                                    legend: { display: false },
                                    title: {
                                        display: true,
                                        text: "Predicted world population (millions) in 2050"
                                    }
                                }}
                            />
                        </div>
                    </div>
                    <div className='flex flex-col items-center'>
                        <span className='text-[#c45850] font-bold'>Tổng số đơn : {total}</span>
                        <span className='text-[#3e95cd] font-bold'>Tổng doanh thu : {totalRevenue.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</span>
                    </div>
                </Spin>
    )
}

export default Statistic