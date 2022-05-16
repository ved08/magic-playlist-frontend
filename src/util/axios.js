import axios from "axios"

export const serverInstance = axios.create({
    baseURL: "https://spotify-magic-playlist-6dy3mwx3y-ved08.vercel.app"
})
export const spotifyInstance = axios.create({
    baseURL: "https://api.spotify.com/v1"
})
