import { reactive, onUnmounted } from 'vue'
import useToken from '@/composables/useToken'
import pLimit from 'p-limit'

export default function useDataService({ getIds, getById, autoUpdate = false }) {
  const { tokenHandler } = useToken()
  const cache = new Map()
  const limit = pLimit(20)
  const batchSize = 30
  let timerId = null

  const startProcessing = () => (autoUpdate ? startUpdates() : fetchData())

  const dataService = reactive({
    content: [],
    isLoaded: false,
    isBusy: false,

    refresh: () => {
      cancelPendingOperations()
      dataService.isLoaded = false
      dataService.isBusy = false
      dataService.content = []
      startProcessing()
    },
  })

  const cancelPendingOperations = () => {
    tokenHandler.reset()
    limit.clearQueue()
  }

  const fetchData = async () => {
    tokenHandler.set()
    dataService.isBusy = true
    dataService.isLoaded = false

    try {
      const ids = await getIds()
      for (let i = 0; i < ids.length; i += batchSize) {
        if (!tokenHandler.isValid()) break

        const batch = ids.slice(i, i + batchSize)

        const uncachedIds = batch.filter((id) => !cache.has(id))
        const promises = uncachedIds.map((id) => limit(() => getById(id)))
        const batchData = await Promise.all(promises)

        if (!tokenHandler.isValid()) break

        batchData.forEach((item, index) => {
          if (item && !item.dead && !item.deleted) {
            cache.set(uncachedIds[index], item)
          }
        })

        if (!dataService.isLoaded) {
          dataService.content = []
        }

        const validData = batch.map((id) => cache.get(id)).filter((item) => item)
        dataService.content.push(...validData)

        if (!dataService.isLoaded) {
          dataService.isLoaded = true
        }
      }
    } catch (error) {
      if (tokenHandler.isValid()) {
        console.error('Ошибка при загрузке данных:', error)
      }
    } finally {
      if (tokenHandler.isValid()) {
        dataService.isBusy = false
        dataService.isLoaded = true
      }
    }
  }

  const stopUpdates = () => {
    if (timerId) clearTimeout(timerId)
    timerId = null
  }

  const startUpdates = () => {
    stopUpdates()
    const update = async () => {
      await fetchData()
      if (tokenHandler.has()) {
        timerId = setTimeout(update, 60000)
      }
    }
    update()
  }

  startProcessing()

  onUnmounted(() => {
    cancelPendingOperations()
    stopUpdates()
  })

  return { dataService, cache }
}
