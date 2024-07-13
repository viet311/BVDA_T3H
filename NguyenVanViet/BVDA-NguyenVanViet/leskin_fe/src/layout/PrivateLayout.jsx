import React from 'react'
import Header from '../component/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../component/Footer'

const PrivateLayout = () => {
    return (
        <div className="fle">
            <Header />
            <div>
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default PrivateLayout