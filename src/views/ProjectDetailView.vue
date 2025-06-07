<template>
  <main class="pt-80">
    <section class="project section-padding radius-15">
      <div class="container">
        <div v-if="project" class="row justify-content-center">
          <div class="col-lg-12">
            <div class="img mb-80">
              <img :src="project.mainImage" :alt="project.title" class="radius-5" />
            </div>
            <div class="row justify-content-center">
              <div class="col-lg-7">
                <div class="cont md-mb50">
                  <h3 class="mb-15 fw-500">{{ project.title }}</h3>
                  <div v-html="project.description"></div>

                  <!-- 圖片畫廊 -->
                  <div v-if="project.gallery && project.gallery.length" class="imgs mt-80">
                    <div class="row md-marg">
                      <div v-for="(image, index) in project.gallery" :key="index" class="col-md-6">
                        <div class="img sm-mb30">
                          <img :src="image" :alt="`${project.title} ${index + 1}`" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-4">
                <div class="info">
                  <ul>
                    <li class="mb-30">
                      <span class="sub-title">
                        <i class="far fa-calendar-alt mr-10"></i> 日期 :
                      </span>
                      <p>{{ project.date }}</p>
                    </li>
                    <li class="mb-30">
                      <span class="sub-title"> <i class="fas fa-list-ul mr-10"></i> 類別 : </span>
                      <p>{{ project.category }}</p>
                    </li>
                    <li class="mb-30" v-if="project.client">
                      <span class="sub-title"> <i class="far fa-user mr-10"></i> 客戶 : </span>
                      <p>{{ project.client }}</p>
                    </li>
                    <li v-if="project.website">
                      <span class="sub-title"> <i class="fas fa-globe mr-10"></i> 網站 : </span>
                      <p>
                        <a :href="project.website" target="_blank">{{ project.website }}</a>
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <loadingSpinner v-else class="text-center" />
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { usePortfolio } from '@/composables/usePortfolio.js'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

const route = useRoute()
const project = ref(null)
const { loadPortfolio, getWorkById } = usePortfolio()

onMounted(async () => {
  await loadPortfolio()
  const projectId = route.params.id
  project.value = getWorkById(projectId)
})
</script>
