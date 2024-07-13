import { Button, Image, message } from "antd";
import React, { useState } from "react";
import DrawerService from "./DrawerService";
import { deleteRequest } from "../hook/api";
import EditSeviceDrawer from "./EditSeviceDrawer";
import EditExpertDrawer from "./EditExpertDrawer";
import { useNavigate } from "react-router-dom";

const ExpertItemDetail = ({ dt }) => {
    const navigate = useNavigate()
    return (
        <div className="flex gap-4 cursor-pointer" onClick={() => navigate("/expert/" + dt.id)}>
            <img src={dt.avatar} className='w-1/3 aspect-square h-28 object-cover' preview={false} />
            <div>
                <div className="text-xl text-orange-500">{dt.name}</div>
                <div className=" text-gray-500">{dt.des}</div>
            </div>
        </div>
    );
};

export default ExpertItemDetail;
