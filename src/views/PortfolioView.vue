<template>
  <main class="pt-80">
    <!-- ==================== Start portfolio ==================== -->
    <section class="portfolio section-padding">
      <div class="container">
        <div class="sec-head mb-40">
          <div class="row justify-content-center">
            <div class="col-lg-8 text-center">
              <div class="d-inline-block">
                <div class="sub-title-icon d-flex align-items-center">
                  <span class="icon pe-7s-portfolio"></span>
                  <h6>我的作品集</h6>
                </div>
              </div>
              <h3>
                透過設計<br />
                幫助品牌成長
              </h3>
            </div>
          </div>
        </div>

        <div class="gallery">
          <div class="row">
            <div class="col-lg-4 items" v-for="work in portfolioWorks" :key="work.id">
              <div class="item">
                <div class="img">
                  <img :src="work.image" :alt="work.title" />
                  <a href="#0" class="link" @click.prevent="openProject(work)"></a>
                </div>
                <div class="cont d-flex align-items-center">
                  <div>
                    <h6>{{ work.title }}</h6>
                    <span class="tag">{{ work.category }}</span>
                  </div>
                  <div class="ml-auto">
                    <div class="arrow">
                      <a href="#0" @click.prevent="openProject(work)">
                        <svg
                          class="arrow-right"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                          x="0px"
                          y="0px"
                          viewBox="0 0 34.2 32.3"
                          xml:space="preserve"
                          style="stroke-width: 2"
                        >
                          <line x1="0" y1="16" x2="33" y2="16"></line>
                          <line x1="17.3" y1="0.7" x2="33.2" y2="16.5"></line>
                          <line x1="17.3" y1="31.6" x2="33.5" y2="15.4"></line>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Filter Buttons -->
        <div class="text-center mt-80">
          <div class="filtering d-flex justify-content-center">
            <div class="filter">
              <span
                :class="['text', { active: activeFilter === 'all' }]"
                @click="filterWorks('all')"
              >
                全部
              </span>
              <span
                :class="['text', { active: activeFilter === 'graphic' }]"
                @click="filterWorks('graphic')"
              >
                平面設計
              </span>
              <span
                :class="['text', { active: activeFilter === 'motion' }]"
                @click="filterWorks('motion')"
              >
                動態設計
              </span>
              <span
                :class="['text', { active: activeFilter === 'illustration' }]"
                @click="filterWorks('illustration')"
              >
                插畫
              </span>
              <span :class="['text', { active: activeFilter === '3d' }]" @click="filterWorks('3d')">
                3D動畫
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ==================== End portfolio ==================== -->

    <!-- Lightbox Modal -->
    <div v-if="selectedWork" class="lightbox-overlay" @click="closeProject">
      <div class="lightbox-content" @click.stop>
        <button class="close-btn" @click="closeProject">&times;</button>
        <div class="project-details">
          <img :src="selectedWork.image" :alt="selectedWork.title" />
          <div class="project-info">
            <h3>{{ selectedWork.title }}</h3>
            <p class="category">{{ selectedWork.category }}</p>
            <p>{{ selectedWork.description }}</p>
            <div class="tools" v-if="selectedWork.tools">
              <strong>使用工具：</strong>
              <span v-for="tool in selectedWork.tools" :key="tool" class="tool-tag">
                {{ tool }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed } from 'vue'
import { portfolioWorks as portfolioData } from '@/data/portfolioData.js'

const activeFilter = ref('all')
const selectedWork = ref(null)

const allWorks = ref(portfolioData)

const portfolioWorks = computed(() => {
  if (activeFilter.value === 'all') {
    return allWorks.value
  }
  return allWorks.value.filter((work) => work.type === activeFilter.value)
})

function filterWorks(filter) {
  activeFilter.value = filter
}

function openProject(work) {
  selectedWork.value = work
  document.body.style.overflow = 'hidden'
}

function closeProject() {
  selectedWork.value = null
  document.body.style.overflow = 'auto'
}
</script>

<style scoped>
.filtering .filter .text {
  cursor: pointer;
  padding: 10px 20px;
  margin: 0 10px;
  border-radius: 25px;
  transition: all 0.3s ease;
}

.filtering .filter .text:hover,
.filtering .filter .text.active {
  background-color: var(--main-color);
  color: white;
}

.lightbox-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.lightbox-content {
  position: relative;
  max-width: 90%;
  max-height: 90%;
  background: white;
  border-radius: 10px;
  overflow: hidden;
}

.close-btn {
  position: absolute;
  top: 15px;
  right: 20px;
  background: none;
  border: none;
  font-size: 30px;
  color: #666;
  cursor: pointer;
  z-index: 10000;
}

.project-details {
  display: flex;
  flex-direction: column;
  max-height: 80vh;
  overflow-y: auto;
}

.project-details img {
  width: 100%;
  height: 400px;
  object-fit: cover;
}

.project-info {
  padding: 30px;
}

.project-info h3 {
  margin-bottom: 10px;
  font-size: 24px;
}

.project-info .category {
  color: var(--main-color);
  font-weight: 600;
  margin-bottom: 15px;
}

.tools {
  margin-top: 20px;
}

.tool-tag {
  display: inline-block;
  background-color: #f5f5f5;
  padding: 5px 10px;
  margin: 5px 5px 5px 0;
  border-radius: 15px;
  font-size: 12px;
}

@media (max-width: 768px) {
  .project-details {
    flex-direction: column;
  }

  .lightbox-content {
    max-width: 95%;
    max-height: 95%;
  }
}
</style>
