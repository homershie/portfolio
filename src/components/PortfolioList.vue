<template>
  <div class="portfolio-list">
    <div class="row">
      <div class="col-lg-4 col-md-6" v-for="work in sortedWorks" :key="work.id">
        <div class="item">
          <div class="img">
            <img :src="work.image" :alt="work.title" />
            <a href="#0" class="link" @click.prevent="viewDetails(work)"></a>
          </div>
          <div class="cont d-flex align-items-center">
            <div>
              <h6>{{ work.title }}</h6>
              <span class="tag">{{ work.category }}</span>
            </div>
            <div class="ml-auto">
              <div class="arrow">
                <a href="#0" @click.prevent="viewDetails(work)">
                  <svg
                    class="arrow-right"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 34.2 32.3"
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
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  works: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['view-details'])

function viewDetails(work) {
  emit('view-details', work)
}

const sortedWorks = computed(() => {
  return [...props.works].sort((a, b) => b.id - a.id)
})
</script>

<style scoped>
.portfolio-list {
  margin-top: 20px;
}

.item {
  margin-bottom: 30px;
}

.img {
  position: relative;
  overflow: hidden;
}

.img img {
  width: 100%;
  border-radius: 5px;
  transition: transform 0.3s ease;
}

.img:hover img {
  transform: scale(1.05);
}

.link {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.cont {
  padding: 15px;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.tag {
  display: inline-block;
  margin-top: 5px;
  font-size: 14px;
  color: #777;
}

.arrow svg {
  width: 20px;
  height: 20px;
  stroke: currentColor;
  fill: none;
}
</style>
