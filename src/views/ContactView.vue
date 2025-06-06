<template>
  <main class="pt-80">
    <!-- ==================== Start Contact ==================== -->
    <section class="contact section-padding">
      <div class="container">
        <div class="sec-head mb-80">
          <div class="row justify-content-center">
            <div class="col-lg-8 text-center">
              <div class="d-inline-block">
                <div class="sub-title-icon d-flex align-items-center">
                  <span class="icon pe-7s-map-marker"></span>
                  <h6>聯絡我</h6>
                </div>
              </div>
              <h3>如有任何問題，請隨時與我聯繫。</h3>
            </div>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-lg-12">
            <div class="google-map mb-80">
              <iframe
                id="gmap_canvas"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1807.7907963814307!2d121.46259308881785!3d25.01432952508229!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a8196a224e67%3A0xec9f88ff96729962!2zMjIw5paw5YyX5biC5p2_5qmL5Y2A57ij5rCR5aSn6YGT5LqM5q61N-iVn-adv-api-i7iuermQ!5e0!3m2!1szh-TW!2stw!4v1722060602168!5m2!1szh-TW!2stw"
                width="100%"
                height="400"
                style="border: 0"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              >
              </iframe>
            </div>
          </div>
          <div class="col-lg-5 valign">
            <div class="info full-width md-mb80">
              <div class="item mb-30 d-flex align-items-center">
                <div class="mr-15">
                  <span class="icon fz-40 main-color pe-7s-mail"></span>
                </div>
                <div class="mr-10">
                  <h6 class="opacity-7">電子信箱</h6>
                </div>
                <div class="ml-auto">
                  <h4>
                    <a href="mailto:homerxworkshop@gmail.com"> homerxworkshop@gmail.com </a>
                  </h4>
                </div>
              </div>
              <div class="item mb-30 d-flex align-items-center">
                <div class="mr-15">
                  <span class="icon fz-40 main-color pe-7s-map-marker"></span>
                </div>
                <div class="mr-10">
                  <h6 class="opacity-7">地址</h6>
                </div>
                <div class="ml-auto">
                  <h4>新北市板橋區，台灣</h4>
                </div>
              </div>
              <div class="item d-flex align-items-center">
                <div class="mr-15">
                  <span class="icon fz-40 main-color pe-7s-users"></span>
                </div>
                <div class="mr-10">
                  <h6 class="opacity-7">社群媒體</h6>
                </div>
                <div class="ml-auto">
                  <div class="social-links">
                    <a
                      href="https://www.instagram.com/homer_create"
                      target="_blank"
                      class="social-link"
                    >
                      <i class="fab fa-instagram"></i>
                    </a>
                    <a
                      href="https://www.pinterest.com/HomerShie/"
                      target="_blank"
                      class="social-link"
                    >
                      <i class="fab fa-pinterest"></i>
                    </a>
                    <a href="https://medium.com/homer-create" target="_blank" class="social-link">
                      <i class="fab fa-medium"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-7 valign">
            <div class="full-width">
              <form @submit.prevent="submitForm" ref="contactForm">
                <div class="messages" v-if="formMessage">
                  <div :class="messageClass">{{ formMessage }}</div>
                </div>

                <div class="controls row">
                  <div class="col-lg-6">
                    <div class="form-group mb-30">
                      <label>你的名字 *</label>
                      <input
                        v-model="form.name"
                        type="text"
                        name="name"
                        required
                        :disabled="isSubmitting"
                      />
                    </div>
                  </div>

                  <div class="col-lg-6">
                    <div class="form-group mb-30">
                      <label>你的電子信箱 *</label>
                      <input
                        v-model="form.email"
                        type="email"
                        name="email"
                        required
                        :disabled="isSubmitting"
                      />
                    </div>
                  </div>

                  <div class="col-12">
                    <div class="form-group mb-30">
                      <label>主旨</label>
                      <input
                        v-model="form.subject"
                        type="text"
                        name="subject"
                        :disabled="isSubmitting"
                      />
                    </div>
                  </div>

                  <div class="col-12">
                    <div class="form-group">
                      <label>你的訊息 *</label>
                      <textarea
                        v-model="form.message"
                        name="message"
                        rows="6"
                        required
                        :disabled="isSubmitting"
                        placeholder="請詳細描述您的需求、預算範圍、專案時程等資訊..."
                      ></textarea>
                    </div>
                    <div class="mt-30">
                      <button type="submit" :disabled="isSubmitting" class="submit-btn">
                        <span class="text" v-if="!isSubmitting">傳送訊息</span>
                        <span class="text" v-else>
                          <i class="fas fa-spinner fa-spin"></i> 傳送中...
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </form>

              <div class="contact-alternatives mt-50">
                <h5 class="mb-30">其他聯絡方式</h5>
                <div class="row">
                  <div class="col-md-4 mb-20">
                    <div class="contact-card text-center p-20">
                      <i class="fab fa-instagram fz-30 main-color mb-15"></i>
                      <h6>Instagram</h6>
                      <p class="fz-14">查看我的最新作品</p>
                      <a
                        href="https://www.instagram.com/homer_create"
                        target="_blank"
                        class="contact-link"
                      >
                        關注我
                      </a>
                    </div>
                  </div>
                  <div class="col-md-4 mb-20">
                    <div class="contact-card text-center p-20">
                      <i class="fab fa-medium fz-30 main-color mb-15"></i>
                      <h6>Medium</h6>
                      <p class="fz-14">閱讀設計相關文章</p>
                      <a
                        href="https://medium.com/homer-create"
                        target="_blank"
                        class="contact-link"
                      >
                        閱讀文章
                      </a>
                    </div>
                  </div>
                  <div class="col-md-4 mb-20">
                    <div class="contact-card text-center p-20">
                      <i class="fas fa-envelope fz-30 main-color mb-15"></i>
                      <h6>直接信件</h6>
                      <p class="fz-14">發送詳細需求</p>
                      <a href="mailto:homerxworkshop@gmail.com" class="contact-link"> 立即聯絡 </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- ==================== End Contact ==================== -->
  </main>
</template>

<script setup>
import { ref, reactive } from 'vue'

const isSubmitting = ref(false)
const formMessage = ref('')
const messageClass = ref('')

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: '',
})

async function submitForm() {
  isSubmitting.value = true
  formMessage.value = ''

  try {
    // 模擬表單提交（實際應用中需要連接到後端API）
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // 模擬成功響應
    formMessage.value = '訊息已成功發送！我會盡快回復您。'
    messageClass.value = 'alert alert-success'

    // 重置表單
    Object.keys(form).forEach((key) => {
      form[key] = ''
    })
  } catch (error) {
    console.error('表單發送錯誤:', error)
    formMessage.value = '發送失敗，請稍後再試或直接發送電子郵件給我。'
    messageClass.value = 'alert alert-danger'
  } finally {
    isSubmitting.value = false

    // 5秒後清除訊息
    setTimeout(() => {
      formMessage.value = ''
    }, 5000)
  }
}
</script>

<style scoped>
.google-map iframe {
  width: 100%;
  height: 400px;
  border: 0;
  border-radius: 10px;
}

.info .item {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 10px;
  transition: all 0.3s ease;
}

.info .item:hover {
  background: #e9ecef;
}

.info .item h4 a {
  color: #333;
  text-decoration: none;
  transition: color 0.3s ease;
}

.info .item h4 a:hover {
  color: var(--main-color);
}

.social-links {
  display: flex;
  gap: 15px;
}

.social-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: var(--main-color);
  color: white;
  border-radius: 50%;
  text-decoration: none;
  transition: all 0.3s ease;
}

.social-link:hover {
  background: #333;
  transform: translateY(-2px);
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #333;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  outline: none;
  transition: border-color 0.3s ease;
  font-family: inherit;
}

.form-group input:focus,
.form-group textarea:focus {
  border-color: var(--main-color);
}

.form-group input:disabled,
.form-group textarea:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
}

.submit-btn {
  background: var(--main-color);
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 25px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  min-width: 150px;
}

.submit-btn:hover:not(:disabled) {
  background: #333;
  transform: translateY(-2px);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.messages .alert {
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
}

.alert-success {
  background-color: #d4edda;
  border: 1px solid #c3e6cb;
  color: #155724;
}

.alert-danger {
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  color: #721c24;
}

.contact-alternatives {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 40px;
  color: #fff;
}

.contact-card {
  background: #0c0c0c;
  border-radius: 10px;
  transition: all 0.3s ease;
  height: 100%;
  color: #fff;
  position: relative;
}

.contact-card:before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(140deg, rgba(255, 255, 255, 0.24), rgba(255, 255, 255, 0.04));
  opacity: 0.3;
  border-radius: 10px;
  pointer-events: none;
}

.contact-card:hover {
  background: #1a1a1a;
  transform: translateY(-5px);
}

.contact-link {
  color: var(--main-color);
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.contact-link:hover {
  color: #333;
  text-decoration: underline;
}

@media (max-width: 768px) {
  .info .item {
    flex-direction: column;
    text-align: center;
    gap: 10px;
  }

  .info .item .ml-auto {
    margin-left: 0 !important;
  }

  .social-links {
    justify-content: center;
  }
}
</style>
