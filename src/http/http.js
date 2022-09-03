import axios from "axios";
import qs from "qs";

const baseUrl = 'http://79.143.31.216'

export const register = async (username, password) => {
    return axios.post(`${baseUrl}/register`, null, { params: {username, password}})
}

export const login = async (username, password) => {
    return axios({
        method: 'POST',
        headers: {'content-type': 'application/x-www-form-urlencoded'},
        data: qs.stringify({username, password}),
        url: `${baseUrl}/login`
    });
}

export const getLinksQuantity = async () => {
    const res =  await axios.get(
        `${baseUrl}/statistics`,
        {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}`},
        }
    )
    return res.data.length
}

export const squeeze = async (link) => {
    const res = await axios.post(
        `${baseUrl}/squeeze`,
        null,
        {
            params: {link},
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }}
    )
    return res.data
}

export const getStatistics = async (limit = null, offset = 0, order = null) => {
    const res = await axios.get(
        `${baseUrl}/statistics`,
        {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}`},
            params: {order, offset, limit},
            paramsSerializer: params => {
                return qs.stringify(params, { arrayFormat: "repeat" })
            }
        }
    );
    return res.data
}