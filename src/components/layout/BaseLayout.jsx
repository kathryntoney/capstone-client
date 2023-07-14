import React from 'react'
import Navbar from '../Navbar'
import Footer from '../Footer'
import { useSelector } from 'react-redux'


const BaseLayout = (props) => {
    const token = useSelector(state => state.token)

    return (
        <>
            <Navbar />
            <div>
                {props.children}
            </div>
            <Footer />
        </>
    )
}

export default BaseLayout
