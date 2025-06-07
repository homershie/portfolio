<template>
  <main class="pt-80">
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
        <LoadingSpinner v-if="loading" />

        <!-- 錯誤訊息 -->
        <div v-else-if="error" class="alert alert-danger text-center">
          {{ error }}
        </div>

        <!-- 作品列表 -->
        <PortfolioList v-else :works="portfolioData" @view-details="handleViewDetails" />
      </div>
    </section>
  </main>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import PortfolioList from '@/components/PortfolioList.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import { usePortfolio } from '@/composables/usePortfolio.js'

const router = useRouter()
const { portfolioData, loading, error, loadPortfolio } = usePortfolio()

// 處理查看詳情
const handleViewDetails = (work) => {
  router.push(`/project/${work.id}`)
}

// 載入資料
onMounted(() => {
  loadPortfolio()
})
</script>
