export const env = "live"

const URLS = {
    live: "http://3.142.221.24:3010/",
    dev: "http://3.142.221.24:3010/"
}

const IMAGE_BASE_URL = {
    dev: "https://myzoo.s3.us-east-2.amazonaws.com/",
    live: "https://myzoo.s3.us-east-2.amazonaws.com/"
}

export const API_URL = URLS[env]

export const IMAGE_URL = IMAGE_BASE_URL[env]