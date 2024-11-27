import axios from 'axios'
import { BASE_URL } from '@/helpers/constants'

export default {
  get: async (url) => {
    return await axios
      .get(BASE_URL + url)
      .then(({ data }) => {
        return data
      })
      .catch(({ response }) => {
        throw response
      })
  },

  post: async (url, params) => {
    return await instance
      .post(BASE_URL + url, params)
      .then(({ data }) => {
        return data
      })
      .catch(({ response }) => {
        throw response
      })
  },
}
