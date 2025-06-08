<template>
  <section class="portfolio section-padding">
    <div class="container">
      <div class="sec-head mb-40">
        <div class="row justify-content-center">
          <div class="col-lg-8 text-center">
            <div class="d-inline-block">
              <div class="sub-title-icon d-flex align-items-center">
                <span class="icon fas fa-briefcase"></span>
                <h6>我的作品</h6>
              </div>
            </div>
            <h3>
              透過視覺方法 <br />
              讓萬物賦予意義
            </h3>
          </div>
        </div>
      </div>

      <!-- 載入中 -->
      <LoadingSpinner v-if="!imagesLoaded || dataLoading" />

      <!-- 錯誤訊息 -->
      <div v-else-if="error" class="alert alert-danger text-center">
        {{ error }}
      </div>

      <!-- 作品列表 -->
      <PortfolioList v-else :works="portfolioData" @view-details="handleViewDetails" />
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import PortfolioList from '@/components/PortfolioList.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import { usePortfolio } from '@/composables/usePortfolio.js'
import Masonry from 'masonry-layout'

const router = useRouter()
const { portfolioData, loading: dataLoading, error } = usePortfolio()
const imagesLoaded = ref(false)

// 預載入單張圖片
function loadImage(src) {
  return new Promise((resolve) => {
    const img = new Image()
    img.src = src
    img.onload = resolve
    img.onerror = resolve
  })
}

// 預載入所有作品圖
async function preloadAllImages() {
  const urls = portfolioData.value.map((work) => work.image)
  await Promise.all(urls.map((src) => loadImage(src)))
}

// 處理查看詳情
const handleViewDetails = (work) => {
  router.push(`/project/${work.id}`)
}

// 瀑布流布局重新計算
const recalculateMasonryLayout = () => {
  nextTick(() => {
    const grid = document.querySelector('.portfolio-list')
    if (grid) {
      const masonry = new Masonry(grid, {
        itemSelector: '.portfolio-item',
        columnWidth: '.portfolio-item',
        percentPosition: true,
      })
      masonry.layout()
    }
  })
}

// 監聽圖片載入完成
const monitorImageLoad = () => {
  const images = document.querySelectorAll('.portfolio-item img')
  let loadedCount = 0
  images.forEach((img) => {
    img.onload = () => {
      loadedCount++
      if (loadedCount === images.length) {
        recalculateMasonryLayout()
      }
    }
  })
}

// 載入資料
onMounted(async () => {
  await preloadAllImages()
  imagesLoaded.value = true
  monitorImageLoad()
})
</script>
