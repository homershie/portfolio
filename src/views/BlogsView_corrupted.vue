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
                  <span class="icon pe-7s-note"></span>
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
                      <a href="#0" @click.prevent="filterByCategory('all')">
                        全部文章
                      </a>
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
                      <a href="#0" @click.prevent="filterByCategory('WorldVision')">
                        世界視界
                      </a>
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
  {
    id: 1,
    title: '新藝術運動－少女的力量｜視覺風格大全',
    excerpt: '少女、花朵和植物不管何時都是藝術家和設計師們喜愛的元素，新藝術運動可以被視作開山始祖，但在一百多年前則是受人唾棄的商業藝術、應用美術。究竟新藝術運動如何翻身一躍變成世界範圍的美術運動...',
    content: '<p>少女、花朵和植物不管何時都是藝術家和設計師們喜愛的元素，新藝術運動可以被視作開山始祖，但在一百多年前則是受人唾棄的商業藝術、應用美術。</p><p>究竟新藝術運動如何翻身一躍變成世界範圍的美術運動，直到今天還能在庫洛魔法使的牌組等等流行文化一探新藝術的身影，就讓我們繼續看下去...</p>',
    date: '2020年11月4日',
    category: 'GraphicStyle',
    categoryName: '視覺風格大全',
    image: '/src/assets/imgs/blog/06.jpg',
    thumbnail: '/src/assets/imgs/blog/t1.jpg'
  },
  {
    id: 2,
    title: '設計流派導覽－當代、現代、後現代、超現代、元現代，哪個才是現在？｜世界視界',
    excerpt: '相信大家一開始在閱讀各種西方文化運動的時候常常被各種「現代」搞的烏煙瘴氣，這個系列主要幫助大家釐清各種「現代」運動對視覺傳達領域所帶來的明顯影響...',
    content: '<p>相信大家一開始在閱讀各種西方文化運動的時候常常被各種「現代」搞的烏煙瘴氣，這個系列主要幫助大家釐清各種「現代」運動對視覺傳達領域所帶來的明顯影響，以及瞭解正在萌芽的新時代文化思潮－元現代主義。</p><p>本篇導覽把視覺風格化繁為簡，避開繁瑣的歷史脈絡和各類分支，簡單歸納成四大流派：傳統時代、現代、後現代、元現代。</p>',
    date: '2020年9月25日',
    category: 'WorldVision',
    categoryName: '世界視界',
    image: '/src/assets/imgs/blog/05.jpg',
    thumbnail: '/src/assets/imgs/blog/t2.jpg'
  },
  {
    id: 3,
    title: '蒸氣波－我們的現在是都是過去的未來｜視覺風格大全',
    excerpt: '有些專家說我們這代二十幾歲的人是Z世代、90後、數位原生世代。有些人對未來感到迷茫，找不到生活的重心，對什麼事情都提不起勁；有些人看到房子、車子的價格對現實感到挫折無力。於是我們專注在享受當下...',
    content: '<p>有些專家說我們這代二十幾歲的人是Z世代、90後、數位原生世代。有些人對未來感到迷茫，找不到生活的重心，對什麼事情都提不起勁；有些人看到房子、車子的價格對現實感到挫折無力。</p><p>於是我們專注在享受當下，蒸氣波文化正是這種心境的完美體現...</p>',
    date: '2019年11月1日',
    category: 'GraphicStyle',
    categoryName: '視覺風格大全',
    image: '/src/assets/imgs/blog/04.jpg',
    thumbnail: '/src/assets/imgs/blog/t3.jpg'
  },
  {
    id: 4,
    title: '像素風格－遊戲人生我逍遙｜視覺風格大全',
    excerpt: '「一定程度受限的條件、環境能激發你的創意」在大四苦惱畢製的劇本時，老師在課堂上分享這句話，一開始以為只能用在劇本寫作上，但最近越來越能體會這句話的意涵...',
    content: '<p>「一定程度受限的條件、環境能激發你的創意」在大四苦惱畢製的劇本時，老師在課堂上分享這句話，一開始以為只能用在劇本寫作上，但最近越來越能體會這句話的意涵。</p><p>每個創作人都無法絕對自由的創作，或多或少都受限於生命中的時間與體力，又或者是大環境之下的脈動...</p>',
    date: '2018年9月21日',
    category: 'GraphicStyle',
    categoryName: '視覺風格大全',
    image: '/src/assets/imgs/blog/03.jpg',
    thumbnail: '/src/assets/imgs/blog/t1.jpg'
  },
  {
    id: 5,
    title: 'MBE風格－MBE是什麼，可以吃嗎？｜視覺風格大全',
    excerpt: '這幾年的設計風格漸漸走向扁平化、單一化、抽象化，其中可能包含了文化因素、社會因素等等深層的原因，要論說其原因不是三言兩語就可以帶過...',
    content: '<p>這幾年的設計風格漸漸走向扁平化、單一化、抽象化，其中可能包含了文化因素、社會因素等等深層的原因，要論說其原因不是三言兩語就可以帶過。</p><p>MBE風格作為當代設計的重要表現形式，體現了簡約而不簡單的設計哲學...</p>',
    date: '2018年9月4日',
    category: 'GraphicStyle',
    categoryName: '視覺風格大全',
    image: '/src/assets/imgs/blog/02.jpg',
    thumbnail: '/src/assets/imgs/blog/t2.jpg'
  },
  {
    id: 6,
    title: '波普藝術－漫畫是不是藝術，波普藝術跟你說｜視覺風格大全',
    excerpt: '被稱為新達達派的波普藝術，繼承達達主義的虛無主義、無政府主義，藉此反抗當時的權威文化，將創作媒材與主題指向日常、流行、通俗、現成物。',
    content: '<p>被稱為新達達派的波普藝術，繼承達達主義的虛無主義、無政府主義，藉此反抗當時的權威文化，將創作媒材與主題指向日常、流行、通俗、現成物。</p><p>波普藝術的出現，徹底改變了人們對藝術的認知，讓藝術走進了大眾生活...</p>',
    date: '2018年8月27日',
    category: 'GraphicStyle',
    categoryName: '視覺風格大全',
    image: '/src/assets/imgs/blog/01.jpg',
    thumbnail: '/src/assets/imgs/blog/t3.jpg'
  }
])

const filteredPosts = computed(() => {
  let posts = allPosts.value

  if (selectedCategory.value !== 'all') {
    posts = posts.filter(post => post.category === selectedCategory.value)
  }

  if (searchQuery.value) {
    posts = posts.filter(post =>
      post.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  return posts
})

const latestPosts = computed(() => {
  return allPosts.value.slice(0, 3)
})

function getPostCountByCategory(category) {
  return allPosts.value.filter(post => post.category === category).length
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
  color: var(--main-color);
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
  border-bottom: 2px solid var(--main-color);
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
  color: var(--main-color);
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
  background-color: var(--main-color);
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
  background-color: var(--main-color);
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
