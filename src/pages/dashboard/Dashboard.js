import { useEffect } from "react"
import { SITE_NAME } from "../../config"

export default function Dashboard() {
    useEffect(() => {
        document.title = `Dashboard - ${SITE_NAME}`
    },[])
    return (
        <>
            Dashboard
        </>
    )
}