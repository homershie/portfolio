<template>
  <main class="pt-80">
    <!-- ==================== Start Blogs ==================== -->
    <section class="blog section-padding">
      <div class="container with-pad">
        <div class="sec-head mb-80">
          <div class="row justify-content-center">
            <div class="col-lg-8 text-center">
              <div class="d-inline-block">
                <div class="sub-title-icon d-flex align-items-center">
                  <span class="icon fas fa-sticky-note"></span>
                  <h6>部落格</h6>
                </div>
              </div>
              <h3>開啟你的視界</h3>
            </div>
          </div>
        </div>
        <div class="row lg-marg justify-content-center">
          <div class="col-lg-7">
            <div class="md-mb80">
              <div
                v-for="post in filteredPosts"
                :key="post.id"
                class="item pb-50 mb-50 bord-thin-bottom blog-post"
                :data-category="post.category"
              >
                <div class="img">
                  <img :src="post.image" :alt="post.title" />
                </div>
                <div class="cont mt-30">
                  <span class="date mb-10">{{ post.date }}</span>
                  <h4 class="mb-15 post-title">
                    <a href="#0" @click.prevent="openBlogPost(post)">
                      {{ post.title }}
                    </a>
                  </h4>
                  <p>{{ post.excerpt }}</p>
                  <a href="#0" @click.prevent="openBlogPost(post)" class="mt-15 read-more">
                    閱讀更多 <i class="fas fa-arrow-right ml-10"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-4">
            <div class="sidebar">
              <div class="search-box">
                <input
                  type="text"
                  v-model="searchQuery"
                  placeholder="搜尋文章"
                  @input="filterPosts"
                />
                <span class="icon pe-7s-search"></span>
              </div>
              <div class="widget catogry">
                <h6 class="title-widget">分類</h6>
                <ul class="rest">
                  <li>
                    <span>
                      <a href="#0" @click.prevent="filterByCategory('all')"> 全部文章 </a>
                    </span>
                    <span class="ml-auto">{{ allPosts.length }}</span>
                  </li>
                  <li>
                    <span>
                      <a href="#0" @click.prevent="filterByCategory('GraphicStyle')">
                        視覺風格大全
                      </a>
                    </span>
                    <span class="ml-auto">{{ getPostCountByCategory('GraphicStyle') }}</span>
                  </li>
                  <li>
                    <span>
                      <a href="#0" @click.prevent="filterByCategory('WorldVision')"> 世界視界 </a>
                    </span>
                    <span class="ml-auto">{{ getPostCountByCategory('WorldVision') }}</span>
                  </li>
                </ul>
              </div>
              <div class="widget last-post-thum">
                <h6 class="title-widget">最新文章</h6>
                <div v-for="post in latestPosts" :key="post.id" class="item">
                  <div class="valign">
                    <div class="img">
                      <a href="#0" @click.prevent="openBlogPost(post)">
                        <img :src="post.thumbnail" :alt="post.title" />
                      </a>
                    </div>
                  </div>
                  <div class="cont">
                    <h6>
                      <a href="#0" @click.prevent="openBlogPost(post)">
                        {{ post.title }}
                      </a>
                    </h6>
                    <span>
                      <a href="#0" @click.prevent="openBlogPost(post)">
                        {{ post.date }}
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- ==================== End Blogs ==================== -->

    <!-- Blog Post Modal -->
    <div v-if="selectedPost" class="blog-modal-overlay" @click="closeBlogPost">
      <div class="blog-modal-content" @click.stop>
        <button class="close-btn" @click="closeBlogPost">&times;</button>
        <div class="blog-post-detail">
          <img :src="selectedPost.image" :alt="selectedPost.title" class="featured-image" />
          <div class="post-content">
            <span class="date">{{ selectedPost.date }}</span>
            <h2>{{ selectedPost.title }}</h2>
            <div class="category-tag">{{ selectedPost.categoryName }}</div>
            <div class="content" v-html="selectedPost.content"></div>
            <div class="post-footer">
              <p>想了解更多設計趨勢和視覺風格？</p>
              <a href="https://medium.com/homer-create" target="_blank" class="medium-link">
                在 Medium 上關注我 <i class="fab fa-medium"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed } from 'vue'
import { blogPosts as blogData } from '@/data/portfolioData.js'

const searchQuery = ref('')
const selectedCategory = ref('all')
const selectedPost = ref(null)

const allPosts = ref(blogData)

const filteredPosts = computed(() => {
  let posts = allPosts.value

  if (selectedCategory.value !== 'all') {
    posts = posts.filter((post) => post.category === selectedCategory.value)
  }

  if (searchQuery.value) {
    posts = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.value.toLowerCase()),
    )
  }

  return posts
})

const latestPosts = computed(() => {
  return allPosts.value.slice(0, 3)
})

function getPostCountByCategory(category) {
  return allPosts.value.filter((post) => post.category === category).length
}

function filterByCategory(category) {
  selectedCategory.value = category
}

function filterPosts() {
  // 搜尋功能通過 computed 自動觸發
}

function openBlogPost(post) {
  selectedPost.value = post
  document.body.style.overflow = 'hidden'
}

function closeBlogPost() {
  selectedPost.value = null
  document.body.style.overflow = 'auto'
}
</script>

<style scoped>
.read-more {
  color: var(--maincolor);
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
}

.read-more:hover {
  text-decoration: underline;
}

.search-box {
  position: relative;
  margin-bottom: 40px;
}

.search-box input {
  width: 100%;
  padding: 15px 50px 15px 20px;
  border: 1px solid #ddd;
  border-radius: 25px;
  outline: none;
}

.search-box .icon {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
}

.sidebar .widget {
  margin-bottom: 50px;
}

.title-widget {
  font-size: 18px;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid var(--maincolor);
}

.catogry ul li {
  padding: 10px 0;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.catogry ul li:last-child {
  border-bottom: none;
}

.catogry ul li a {
  color: #666;
  text-decoration: none;
  transition: color 0.3s ease;
}

.catogry ul li a:hover {
  color: var(--maincolor);
}

.last-post-thum .item {
  display: flex;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
}

.last-post-thum .item:last-child {
  border-bottom: none;
}

.last-post-thum .img {
  width: 80px;
  height: 60px;
  margin-right: 15px;
  overflow: hidden;
  border-radius: 5px;
}

.last-post-thum .img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.last-post-thum .cont h6 {
  font-size: 14px;
  line-height: 1.4;
  margin-bottom: 5px;
}

.last-post-thum .cont h6 a {
  color: #333;
  text-decoration: none;
}

.last-post-thum .cont span a {
  color: #999;
  font-size: 12px;
  text-decoration: none;
}

.blog-modal-overlay {
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
  overflow-y: auto;
}

.blog-modal-content {
  position: relative;
  max-width: 800px;
  width: 90%;
  max-height: 90vh;
  background: white;
  border-radius: 10px;
  overflow: hidden;
  margin: 20px;
}

.close-btn {
  position: absolute;
  top: 15px;
  right: 20px;
  background: rgba(0, 0, 0, 0.5);
  border: none;
  color: white;
  font-size: 24px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.blog-post-detail {
  max-height: 90vh;
  overflow-y: auto;
}

.featured-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
}

.post-content {
  padding: 40px;
}

.post-content .date {
  color: #999;
  font-size: 14px;
}

.post-content h2 {
  margin: 10px 0 20px 0;
  line-height: 1.3;
}

.category-tag {
  display: inline-block;
  background-color: var(--maincolor);
  color: white;
  padding: 5px 15px;
  border-radius: 15px;
  font-size: 12px;
  margin-bottom: 20px;
}

.post-content .content {
  line-height: 1.6;
  margin-bottom: 30px;
}

.post-footer {
  padding-top: 20px;
  border-top: 1px solid #eee;
  text-align: center;
}

.medium-link {
  display: inline-block;
  background-color: #000;
  color: white;
  padding: 10px 20px;
  border-radius: 25px;
  text-decoration: none;
  margin-top: 10px;
  transition: background-color 0.3s ease;
}

.medium-link:hover {
  background-color: var(--maincolor);
}

@media (max-width: 768px) {
  .blog-modal-content {
    width: 95%;
    margin: 10px;
  }

  .post-content {
    padding: 20px;
  }
}
</style>
