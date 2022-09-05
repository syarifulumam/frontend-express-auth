import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet,Navigate   } from 'react-router-dom'

export default function RequestLogin() {
    const {user} = useSelector((state) => state.auth)

    if (user === null) {
      return <Navigate to="/login" />
    }
    return <Outlet />
}
