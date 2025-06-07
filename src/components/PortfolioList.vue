<template>
  <div class="gallery">
    <div class="row">
      <div class="col-lg-4 items" v-for="work in sortedWorks" :key="work.id">
        <div class="item">
          <div class="img">
            <img :src="work.image" :alt="work.title" />
            <a href="#0" class="link" @click.prevent="viewDetails(work)"></a>
          </div>
          <div class="cont d-flex align-items-center">
            <div>
              <h6>{{ work.title }}</h6>
              <!-- 修改這裡，迭代 category 陣列 -->
              <span class="tag" v-for="(tag, index) in work.category" :key="index">{{ tag }}</span>
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
