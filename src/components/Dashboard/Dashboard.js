import { Fragment, useEffect, useState } from "react"
import { useSearchParams, Navigate } from "react-router-dom"
import { serverInstance, spotifyInstance } from "../../util/axios"
import { createMagicPlaylistAndSave, getGenreSeeds, getProfile, magicRecommendation, searchSpotify } from "../../util/helpers"
import SearchResultCard from "../SearchResultCard"
import "./Dashboard.css"
const Dashboard = ({cookieState}) => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [artistSearchResult, setArtistSearchResult] = useState(null)
    const [trackSearchResult, setTrackSearchResult] = useState(null)
    const [selectedItem, setSelectedItem] = useState([])
    useEffect(() => {
        const access_token = sessionStorage.getItem("access_token")
        if(access_token === null) {
            serverInstance.post("/user", {
                code: searchParams.get("code"), state: searchParams.get("state"), cookieState
            }).then(res => {
                const {access_token} = res.data
                sessionStorage.setItem("access_token", access_token)
                spotifyInstance.defaults.headers.common["Authorization"] = 'Bearer ' + access_token
            })
        }
        spotifyInstance.defaults.headers.common["Authorization"] = 'Bearer ' + access_token
        setSearchParams({})
    }, [])
    const querySearchHandler = async e => {
        if(e.target.value.trim().length > 0) {
            const searchResults = await searchSpotify(e.target.value)
            console.log(searchResults)
            setArtistSearchResult(searchResults.artists)
            setTrackSearchResult(searchResults.tracks)
        } else {
            setArtistSearchResult(null)
            setTrackSearchResult(null)
        }
    }
    const createMagicPlaylist = () => {
        let artistObj = selectedItem.filter(e => e.type === "artist")
        let artistUris = [];
        for(let i of artistObj) {
            artistUris.push(i.id)
        }
        let tracksObj = selectedItem.filter(e => e.type === "track")
        let tracksUris = []
        for(let i of tracksObj) {
            tracksUris.push(i.id)
        }
        magicRecommendation(artistUris, tracksUris)
        .then(res => {
            let trackUris = []
            for(let i of res.tracks) {
                trackUris.push(i.uri)
            }
            getProfile().then(res => {
                let uid = res.id
                createMagicPlaylistAndSave(uid, trackUris)
            })
        })
    }
    const render = true ?
    <div className="Dashboard">
        <input onChange={e => querySearchHandler(e)} placeholder="Search Spotify"/>
        <div className="Search-results">
            {
                artistSearchResult !== null &&
                <div className="Artists-result">
                <h2>Artists</h2>
                {artistSearchResult.items.map((e, i) => {
                    return <SearchResultCard selected={() => {
                        if(selectedItem.includes(e) === false && selectedItem.length < 5) {
                            setSelectedItem(prevState => [...prevState, e])
                        }
                    }} name={e.name.length > 16? e.name.slice(0, 15) + "..." : e.name} imgSrc={e.images[2]?.url} key={i}/>
                })}
                
            </div>
            }   
            {
                trackSearchResult !== null &&
                <div className="Tracks-result">
                    <h2>Tracks</h2>
                    {trackSearchResult.items.map((e, i) => {
                        return <SearchResultCard selected={() => {
                            if(selectedItem.includes(e) === false && selectedItem.length < 5) {
                                setSelectedItem(prevState => [...prevState, e])
                            }
                        }} name={e.name.length > 16? e.name.slice(0, 15) + "..." : e.name} imgSrc={e.album.images[2]?.url} key={i}/>
                    })}
                    
                </div>
            }
        </div>
        {
            selectedItem.length > 0 &&
            <div className="Selected-items-container">
                <h2>Selected Items</h2>
                <div className="Selected-items">
                    {selectedItem.map((e, i) => (
                        <SearchResultCard selected={() => {
                            setSelectedItem(prevState => prevState.filter(item => item.id !== e.id))
                        }} name={e.name.length > 16? e.name.slice(0, 15) + "..." : e.name} imgSrc={e.album?.images[2].url || e.images[2]?.url} key={i}/>
                    ))}
                </div>
                <button className="Create-playlist-btn" onClick={createMagicPlaylist}>Create Playlist</button>
            </div>
        }
    </div>:
    <Navigate to={"/"}/>

    return render
}
export default Dashboard