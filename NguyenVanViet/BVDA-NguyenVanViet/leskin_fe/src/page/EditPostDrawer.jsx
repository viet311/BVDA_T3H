import { Button, Drawer, Form, Input, message } from "antd";
import React, { useState } from "react";
import { postRequest, putRequest } from "../hook/api";
import TextArea from "antd/es/input/TextArea";

const EditPostDrawer = ({ dt, setData }) => {
    const [open, setOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(dt.avatar)
    const [crLoading, setCRLoading] = useState(false)
    const onClose = () => {
        setOpen(false);
    };

    const showDrawer = () => {
        setOpen(true);
    };
    const getBase64 = (file) => {
        return new Promise((resolve) => {
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
        setCRLoading(true);
        putRequest("/post/update", {
            title: values.name,
            content: values.des,
            id: dt.id,
            avatar: selectedImage
        })
            .then((data) => {
                if (data.code == 200) {
                    message.success("Sửa mới bài dịch vụ thành công");
                    setData((prev) => prev.map(d => d.id != dt.id ? d : {
                        title: values.name,
                        content: values.des,
                        id: d.id,
                        avatar: selectedImage
                    }));
                    setOpen(false);
                } else {
                    message.error(data?.message);
                }
            })
            .catch((err) => console.log(err))
            .finally(() => setCRLoading(false));
    };

    const onFinishFailed = () => {
        message.error("Cần điền đủ các trường");
    };
    return (
        <div className="w-full">
            <Button
                className="w-full"
                type="primary"
                onClick={() => {
                    setOpen(true)
                }}
            >
                Sửa
            </Button>
            <Drawer title="Sửa" onClose={onClose} open={open}>
                <Form
                    layout="vertical"
                    name="basic"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    initialValues={{
                        name: dt.title,
                        des: dt.content,
                    }}
                >
                    <Form.Item
                        label="Tên"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "Hãy nhập tên dịch vụ",
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
                                message: "Hãy nhập mô tả dịch vụ",
                            },
                        ]}
                    >
                        <TextArea />
                    </Form.Item>
                    <Form.Item
                        label="Ảnh"
                        name="avatar"
                    >
                        {selectedImage && (
                            <div>
                                <img
                                    alt="not found"
                                    width={"250px"}
                                    src={selectedImage}
                                />
                            </div>
                        )}
                        <input
                            type="file"
                            name="myImage"
                            onChange={async (event) => {
                                setSelectedImage(await getBase64(event.target.files[0]));
                            }}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="w-full"
                            loading={crLoading}
                        >
                            Xác nhận
                        </Button>
                    </Form.Item>
                </Form>
            </Drawer>
        </div>
    );
};

export default EditPostDrawer;
