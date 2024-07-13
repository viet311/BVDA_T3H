import { Button, DatePicker, Form, Modal, Select, message } from "antd";
import React, { useEffect, useState } from "react";
import { getRequest, postRequest } from "../hook/api";
import moment from "moment";
import dayjs from 'dayjs'

const DrawerService = ({dt}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selects, setSelects] = useState([]);
  const onFinish = (values) => {
    setLoading(true);
    console.log(values)
    postRequest("/order/create", {
      date: dayjs(values.date).format('YYYYMMDD'),
      createBy: {
        id: localStorage.getItem('id'),
      },
      service: {
        id: dt.id,
      },
      expert: {
        id: values.expert,
      },
      price: dt.price,
    })
      .then((data) => {
        if (data.code == 200) {
          message.success("Đặt lịch thành công");
          setIsModalOpen(false)
        } else {
          message.error(data?.message);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    if(isModalOpen){
      getRequest("/expert/search?filter=id>0&sort=id,desc&page=0&size=100").then(
        (data) => {
          setSelects(
            data.result.content.map((dt) => ({
              value: dt.id,
              label: dt.name,
            }))
          );
        }
      );
    }
  }, [isModalOpen]);
  const onFinishFailed = () => {
    message.error("Cần điền đủ các trường");
  };
  const [loading, setLoading] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Button
        className="text-orange-500 hover:text-orange-600"
        onClick={showModal}
      >
        Đăng ký
      </Button>
      <Modal
        title="Đăng ký dịch vụ"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          layout="vertical"
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Ngày đặt lịch"
            name="date"
            rules={[{ required: true, message: "Please date!" }]}
          >
            <DatePicker className="w-full" />
          </Form.Item>
          <Form.Item
            label="Chọn chuyên gia"
            name="expert"
            rules={[{ required: true, message: "Please date!" }]}
          >
            <Select options={selects} />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full"
              loading={loading}
            >
              Xác nhận
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default DrawerService;
