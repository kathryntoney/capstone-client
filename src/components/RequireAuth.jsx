import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const RequireAuth = (props) => {
    const navigate = useNavigate()
    const token = useSelector(state => state.token)

    useEffect(() => {
        if (!token) { // if token is empty
            navigate('/login')
        }
    }, [])

    return props.children
}

export default RequireAuth

