import axios from "axios"
import { useEffect, useState } from "react"
import { Navigate, useSearchParams } from "react-router-dom"
const Landing = props => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [authenticated, setAuthenticated] = useState(false)

    useEffect(() => {
        console.log(searchParams.get("code"))
    }, [])

    const loginHandler = async () => {
        axios.get("http://localhost:5000/login").then(res => {
            const { loginUrl, state } = res.data
            props.cookieState(state)
            window.open(loginUrl, "_self")
        })
    }

    return(
        sessionStorage.getItem("access_token") === null ?
        <div>
            <button onClick={loginHandler}>Login</button>
        </div> :
        <Navigate to={"/dashboard"} replace/>
    )
}
export default Landing