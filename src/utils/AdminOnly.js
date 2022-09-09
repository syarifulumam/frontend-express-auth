import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet,Navigate   } from 'react-router-dom'

export default function PrivateRoute() {
    const {user} = useSelector((state) => state.auth)

    if (user.role !== "admin") {
      return <Navigate to="/" />
    }
    return <Outlet />
}
