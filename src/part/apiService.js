import axios from "axios";
const baseURL = "https://pixabay.com/api/"
const API_KEY = "22603230-d9263c0bbd59724fbb3598b9f"

export const apiService = async (request, page) => {
    try {
        const response = await axios
            .get(`${baseURL}?key=${API_KEY}&q=${request}&image_type=photo&pretty=true&per_page=42&page=${page}`)
        return response.data
    }
    catch(error) {
        console.log(error)
    }
}


