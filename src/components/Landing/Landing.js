import { useEffect, useState } from "react"
import { Navigate, useSearchParams } from "react-router-dom"
import { BsSpotify } from "react-icons/bs"
import { serverInstance } from "../../util/axios"
const Landing = props => {
    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        console.log(searchParams.get("code"))
    }, [])

    const loginHandler = async () => {
        serverInstance.get("/login").then(res => {
            const { loginUrl, state } = res.data
            props.cookieState(state)
            window.open(loginUrl, "_self")
        })
    }

    return(
        sessionStorage.getItem("access_token") === null ?
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <button style={{justifyContent: "space-between"}} className="Create-playlist-btn" onClick={loginHandler}><BsSpotify size={30} style={{
                float: "left"
            }}/>Login<div></div></button>
        </div> :
        <Navigate to={"/dashboard"} replace/>
    )
}
export default Landing