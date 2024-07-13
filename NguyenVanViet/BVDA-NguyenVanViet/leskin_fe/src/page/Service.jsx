import React, { useEffect, useState } from 'react'
import { getRequest } from '../hook/api'
import { Button, Image, Spin, Form, Input, message } from 'antd'
import { Drawer } from "antd";
import { postRequest } from '../hook/api';
import moment from 'moment'
import TextArea from 'antd/es/input/TextArea';
import ServiceItem from './ServiceItem';
const { Search } = Input;

const Service = () => {
    const [page, setPage] = useState(0)
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [totalPage, setTotalPage] = useState()
    const [total, setTotal] = useState();
    const [open, setOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null)
    const [search, setSearch] = useState("")
    const [crLoading, setCRLoading] = useState(false)

    const fetchData = () => {
        setLoading(true)
        getRequest(`/service/search?filter=id>0;name==*${search}*&sort=id,desc&page=${page}&size=3`)
            .then(data => {
                setData(prev => [...prev, ...data.result.content])
                setTotalPage(data.result.totalPages)
                setTotal(data.result.totalElements);
            }
            )
            .catch((err) => console.log(err))
            .finally(() => setLoading(false))
    }

    const onClose = () => {
        setOpen(false);
    };

    const showDrawer = () => {
        setOpen(true);
    };
    const getBase64 = (file) => {
        return new Promise(resolve => {
            let fileInfo;
            let baseURL = "";
            // Make new FileReader
            let reader = new FileReader();

            // Convert the file to base64 text
            reader.readAsDataURL(file);

            // on reader load somthing...
            reader.onload = () => {
                // Make a fileInfo Object
                baseURL = reader.result;
                resolve(baseURL);
            };
        });
    };

    const onFinish = (values) => {
        setCRLoading(true)
        getBase64(selectedImage)
            .then(result => {
                values.avatar = result
                postRequest('/service/create', values)
                    .then(data => {
                        if (data.code == 200) {
                            message.success('Tạo mới bài dịch vụ thành công')
                            setData(prev => [data.result, ...prev])
                            setOpen(false)
                        }
                        else {
                            message.error(data?.message)
                        }
                    })
                    .catch(err => console.log(err))
                    .finally(() => setCRLoading(false))
            })
            .catch(err => {
                console.log(err);
            });
    };

    const onFinishFailed = () => {
        message.error("Cần điền đủ các trường")
    };

    useEffect(() => {
        if (!loading) {
            fetchData()
        }
    }, [page])
    const onSearch = (value) => {
        setLoading(true)
        setSearch(value)
        getRequest(`/service/search?filter=id>0;name==*${value}*&sort=id,desc&page=0&size=3`)
            .then(data => {
                setData(data.result.content)
                setTotalPage(data.result.totalPages)
            }
            )
            .catch((err) => console.log(err))
            .finally(() => setLoading(false))
    };

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

                <div className='flex justify-center'>
                    {
                        localStorage.getItem("role") == "admin" ?
                            <Button onClick={showDrawer} style={{ backgroundColor: 'orange', color: 'white' }}>Create</Button> : ""
                    }
                </div>
                <Drawer title="Basic Drawer" onClose={onClose} open={open}>
                    <Form
                        layout="vertical"
                        name="basic"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Tên"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập tên dịch vụ',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Mô tả"
                            name="des"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập mô tả dịch vụ',
                                },
                            ]}
                        >
                            <TextArea />
                        </Form.Item>
                        <Form.Item
                            label="Giá"
                            name="price"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập giá dịch vụ',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Ảnh"
                            name="avatar"
                            rules={[
                                {
                                    required: true,
                                    message: "Hãy tải ảnh lên"
                                }
                            ]}>
                            {selectedImage && (
                                <div>
                                    <img
                                        alt="not found"
                                        width={"250px"}
                                        src={URL.createObjectURL(selectedImage)}
                                    />
                                </div>
                            )}
                            <input
                                type="file"
                                name="myImage"
                                onChange={(event) => {
                                    setSelectedImage(event.target.files[0]);
                                }}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className='w-full' loading={crLoading}>
                                Xác nhận
                            </Button>
                        </Form.Item>
                    </Form>
                </Drawer>
                <div className='container'>
                    <div className='flex justify-center pb-6'>
                        <Search placeholder="Tìm kiếm theo tên " onSearch={onSearch} style={{ width: 400 }} size='large' />
                    </div>
                    <div className='flex justify-center p-4'>Tổng số dịch vụ : {total}</div>
                    <div className="grid grid-cols-3 gap-20">
                        {
                            data.map((dt) => <ServiceItem setData={setData} data={data} key={dt.id} dt={dt} />)
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

export default Service