import React from 'react'

const Contact = () => {
    return (
        <div className='h-full flex flex-col items-center justify-center'>
            <div className='w-1/2 flex flex-col gap-10 p-10 shadow-md rounded-xl bg-white'>
                <div className='font-bold text-xl'>Thông tin liên hệ</div>
                <div><strong>Địa chỉ: </strong>Ngã tư sử, Nga sơn, Thanh hoá</div>
                <div><strong>Phone: </strong>554121235</div>

                <div><strong>Email: </strong>leskin@gmail.com</div>

                <div><strong>Website: </strong>leskin.com</div>

            </div>
        </div>
    )
}

export default Contact