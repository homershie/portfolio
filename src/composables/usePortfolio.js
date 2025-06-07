import { ref, computed } from 'vue'

const portfolioData = ref([])
const loading = ref(false)
const error = ref(null)

export function usePortfolio() {
  // 載入作品資料
  const loadPortfolio = async () => {
    if (portfolioData.value.length > 0) return // 避免重複載入

    loading.value = true
    error.value = null

    try {
      const response = await fetch('/data/portfolio.json')
      if (!response.ok) {
        throw new Error('載入作品資料失敗! status: ${response.status}')
      }
      const data = await response.json()
      portfolioData.value = data.works
    } catch (err) {
      error.value = err.message
      console.error('載入作品資料錯誤:', err)
    } finally {
      loading.value = false
    }
  }

  // 根據 ID 取得單一作品
  const getWorkById = (id) => {
    return portfolioData.value.find((work) => work.id === parseInt(id))
  }

  // 根據類別篩選作品
  const getWorksByCategory = (category) => {
    if (!category || category === 'all') return portfolioData.value
    return portfolioData.value.filter((work) => work.category === category)
  }

  // 取得所有類別
  const categories = computed(() => {
    const cats = [...new Set(portfolioData.value.map((work) => work.category))]
    return ['all', ...cats]
  })

  return {
    portfolioData: computed(() => portfolioData.value),
    loading: computed(() => loading.value),
    error: computed(() => error.value),
    loadPortfolio,
    getWorkById,
    getWorksByCategory,
    categories,
  }
}
