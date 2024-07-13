import { Button, Image, message } from "antd";
import React, { useState } from "react";
import DrawerService from "./DrawerService";
import { deleteRequest } from "../hook/api";
import EditSeviceDrawer from "./EditSeviceDrawer";
import EditExpertDrawer from "./EditExpertDrawer";
import EditPostDrawer from "./EditPostDrawer";
import { useNavigate } from "react-router-dom";

const PostItem = ({ dt, setData, data }) => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const addToCard = () => { };
    return (
        <div className="flex flex-col justify-center gap-4 text-center">
            <img src={dt.avatar} className='w-full aspect-square object-cover' preview={false} />
            <div className="text-xl text-orange-500">{dt.title}</div>
            <div className=" text-gray-500">{dt.content}</div>
            <div>
                <Button className="text-orange-500 hover:text-orange-600" onClick={() => navigate("/post/" + dt.id)}
                >
                    Xem chi tiết
                </Button>
            </div>
            {localStorage.getItem("role") == "admin" && (
                <div className="flex gap-3">
                    <EditPostDrawer dt={dt} setData={setData} />
                    <Button
                        loading={loading}
                        type="primary"
                        onClick={() => {
                            setLoading(true);
                            deleteRequest("/post/delete?id=" + dt.id).then(() => {
                                message.success("Xóa thành công");
                                setLoading(false);
                                setData(() => {
                                    let data_ = data.filter((d) => d.id != dt.id);
                                    return data_;
                                });
                            });
                        }}
                        className="w-full"
                        danger
                    >
                        Xóa
                    </Button>
                </div>
            )}
        </div>
    );
};

export default PostItem;
