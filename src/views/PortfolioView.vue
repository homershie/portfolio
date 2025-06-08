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

      <!-- 作品列表 -->
      <PortfolioList :works="portfolioData" @view-details="handleViewDetails" />
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { preloadImages } from '@/composables/useImagePreloader.js'
import PortfolioList from '@/components/PortfolioList.vue'
import { usePortfolio } from '@/composables/usePortfolio.js'
import Masonry from 'masonry-layout'

const router = useRouter()
const { portfolioData } = usePortfolio()
const imagesLoaded = ref(false)

// 瀑布流重新計算
const recalculateMasonryLayout = () => {
  nextTick(() => {
    const grid = document.querySelector('.portfolio-list')
    if (grid) {
      const m = new Masonry(grid, {
        itemSelector: '.portfolio-item',
        columnWidth: '.portfolio-item',
        percentPosition: true,
      })
      m.layout()
    }
  })
}

// 使用 preloadImages 預載前 10 張
onMounted(async () => {
  const urls = portfolioData.value.map((w) => w.image)
  await preloadImages(urls) // 內部已做 Promise.all + slice(0,10)
  imagesLoaded.value = true
  recalculateMasonryLayout()
})

// 查看詳情
const handleViewDetails = (work) => {
  router.push(`/project/${work.id}`)
}
</script>
