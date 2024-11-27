import { reactive } from 'vue'
import newsApi from '@/composables/api/useNewsApi'
import useDataLoader from '@/composables/useDataService'
import pLimit from 'p-limit'
import useToken from '@/composables/useToken'

export default function useComments(id) {
  const { tokenHandler } = useToken()
  const limit = pLimit(100)

  const totalComments = reactive({
    isLoaded: false,
    count: 0,
  })

  async function processRecursively(id, processFn) {
    if (!tokenHandler.isValid()) return null
    const data = await limit(() => newsApi.getById(id))
    if (!data || data.deleted || data.dead) return null

    const childResults = await Promise.all(
      (data.kids || []).map((kidId) => processRecursively(kidId, processFn)),
    )

    return processFn(data, childResults)
  }

  const cancelPendingOperations = () => {
    tokenHandler.reset()
    limit.clearQueue()
  }

  const story = reactive({
    content: null,
    isLoaded: false,

    refresh: () => {
      cancelPendingOperations()
      totalComments.isLoaded = false
      totalComments.count = 0
      dataService.refresh()
    },
  })

  async function loadChildComments(id, onProgress) {
    return processRecursively(
      id,
      async (data, childReplies) => {
        data.replies = childReplies.filter((reply) => reply !== null)
        return data
      },
      onProgress,
    )
  }

  async function setTotalComments(id) {
    const total = await processRecursively(id, (data, childCounts) => {
      const countForThisComment = data.deleted || data.dead || story.content.id == data.id ? 0 : 1
      const totalChildren = childCounts.reduce(
        (total, count) => total + (typeof count === 'number' ? count : 0),
        0,
      )
      return countForThisComment + totalChildren
    })

    if (tokenHandler.isValid()) {
      totalComments.count = typeof total === 'number' ? total : 0
      totalComments.isLoaded = true
    }
  }

  const { dataService } = useDataLoader({
    getIds: async () => {
      tokenHandler.set()
      const news = await newsApi.getById(id)
      story.content = news
      if (news?.kids) {
        setTotalComments(id)
      } else {
        totalComments.isLoaded = true
      }
      story.isLoaded = true
      return news?.kids || []
    },
    getById: newsApi.getById,
    autoUpdate: false,
  })

  return { dataService, story, loadChildComments, totalComments }
}
