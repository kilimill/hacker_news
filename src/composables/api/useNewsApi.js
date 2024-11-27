import api from '@/composables/api/index'

export default {
  getById: async (id) => {
    try {
      const data = await api.get(`item/${id}.json`)
      return data
    } catch (error) {
      console.error(`Ошибка при получении новости с ID ${id}:`, error)
      return null
    }
  },

  getList: async () => {
    try {
      const ids = await api.get('newstories.json?orderBy="$key"&limitToFirst=100')
      return ids
    } catch (error) {
      console.error('Ошибка при получении списка новостей:', error)
      return []
    }
  },
}
