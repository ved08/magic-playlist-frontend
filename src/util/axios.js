import axios from "axios"

export const serverInstance = axios.create({
    baseURL: "https://spotify-magic-playlist-ved.vercel.app/"
})
export const spotifyInstance = axios.create({
    baseURL: "https://api.spotify.com/v1"
})
