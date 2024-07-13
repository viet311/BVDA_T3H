import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PostItemDetail = ({ dt }) => {
    const navigate = useNavigate()
    return (
        <div className="flex gap-4 cursor-pointer" onClick={() => navigate("/post/" + dt.id)}>
            <img src={dt.avatar} className='w-1/3 aspect-square h-28 object-cover' preview={false} />
            <div>
                <div className="text-xl text-orange-500">{dt.title}</div>
                <div className=" text-gray-500">{dt.content}</div>
            </div>
        </div>
    );
};

export default PostItemDetail;
