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
      <PortfolioList :works="displayedWorks" @view-details="handleViewDetails" />
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { preloadImages } from '@/composables/useImagePreloader.js'
import PortfolioList from '@/components/PortfolioList.vue'
import { usePortfolio } from '@/composables/usePortfolio.js'
import Masonry from 'masonry-layout'

const displayedWorks = ref([]) // 實際顯示的作品
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
  // 先載入前 10 張
  const firstTen = portfolioData.value.slice(0, 10)
  displayedWorks.value = firstTen
  const urls = firstTen.map((w) => w.image)
  await preloadImages(urls)
  imagesLoaded.value = true
  recalculateMasonryLayout()

  // 再載入剩下的
  const rest = portfolioData.value.slice(10)
  for (const work of rest) {
    await preloadImages([work.image])
    displayedWorks.value.push(work)
    await nextTick()
    recalculateMasonryLayout()
  }
})
</script>
