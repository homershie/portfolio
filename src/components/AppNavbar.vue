<template>
  <nav class="navbar navbar-chang navbar-expand-lg">
    <div class="container position-re">
      <div class="row">
        <div class="col-lg-3 col-6 order1">
          <div class="bord">
            <!-- Logo -->
            <router-link class="logo icon-img-120" to="/">
              <img
                src="@/assets/imgs/logo-light.png"
                alt="荷馬桑 Homer Shie - 視覺設計師標誌"
                loading="eager"
              />
            </router-link>
          </div>
        </div>
        <div class="col-lg-6 order3">
          <div class="bg">
            <!-- navbar links -->
            <div class="full-width">
              <ul class="navbar-nav">
                <li class="nav-item">
                  <router-link class="nav-link" to="/">
                    <span class="rolling-text">首頁</span>
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link class="nav-link" to="/about">
                    <span class="rolling-text">關於</span>
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link class="nav-link" to="/services">
                    <span class="rolling-text">服務</span>
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link class="nav-link" to="/portfolio">
                    <span class="rolling-text">作品</span>
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link class="nav-link" to="/blogs">
                    <span class="rolling-text">部落格</span>
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link class="nav-link" to="/contact">
                    <span class="rolling-text">聯絡我</span>
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-6 order2">
          <div class="bord d-flex justify-content-end">
            <ul class="social d-flex rest">
              <li>
                <a
                  href="https://www.instagram.com/homer_create"
                  rel="noopener noreferrer"
                  target="_blank"
                  aria-label="前往 Instagram 查看荷馬桑作品"
                >
                  <i class="fab fa-instagram" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/homershie"
                  rel="noopener noreferrer"
                  target="_blank"
                  aria-label="前往 GitHub 查看荷馬桑的程式"
                >
                  <i class="fab fa-github" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://medium.com/homer-create"
                  rel="noopener noreferrer"
                  target="_blank"
                  aria-label="前往 Medium 閱讀荷馬桑文章"
                >
                  <i class="fab fa-medium" aria-hidden="true"></i>
                </a>
              </li>
            </ul>
            <button
              class="navbar-toggler"
              type="button"
              @click="toggleMenu"
              :class="{ active: isMenuOpen }"
            >
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

onMounted(() => {
  document.querySelectorAll('.rolling-text').forEach((element) => {
    if (element.querySelector('.letter')) return
    const innerText = element.innerText
    element.innerHTML = ''

    const textContainer = document.createElement('div')
    textContainer.classList.add('block')

    for (const letter of innerText) {
      const span = document.createElement('span')
      span.innerText = letter.trim() === '' ? '\xa0' : letter
      span.classList.add('letter')
      textContainer.appendChild(span)
    }

    element.appendChild(textContainer)

    element.addEventListener('mouseover', () => {
      element.classList.remove('play')
    })
  })
})
</script>

<style lang="scss" scoped>
.navbar {
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 15px 0;

  .logo {
    img {
      height: auto;
      width: 100%;
    }
  }

  .navbar-toggler {
    border: none;
    background: none;
    color: #fff;
    font-size: 1.2rem;
    padding: 5px;

    &:focus {
      box-shadow: none;
    }

    .icon-bar {
      display: block;
      width: 22px;
      height: 2px;
      background: #fff;
      border-radius: 1px;
      transition: all 0.3s ease;
      position: relative;

      &:not(:last-child) {
        margin-bottom: 4px;
      }
    }

    &.active {
      .icon-bar:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
      }
      .icon-bar:nth-child(2) {
        opacity: 0;
      }
      .icon-bar:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
      }
    }
  }
  .rolling-text {
    vertical-align: middle;
  }

  .nav-link {
    color: #fff !important;
    font-weight: 500;
    margin: 0 15px;
    position: relative;
    transition: all 0.3s ease;

    &:hover,
    &.router-link-active {
      color: var(--maincolor) !important;
    }

    &::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 0;
      height: 2px;
      background: var(--maincolor);
      transition: width 0.3s ease;
    }
  }

  .social {
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      margin: 0 10px;

      a {
        color: #fff;
        font-size: 1.1rem;
        transition: color 0.3s ease;

        &:hover {
          color: var(--maincolor);
        }
      }
    }
  }
}

@media (max-width: 991px) {
  .navbar-collapse {
    background: rgba(0, 0, 0, 0.95);
    margin-top: 20px;
    border-radius: 10px;
    padding: 20px;

    .nav-item {
      margin: 10px 0;
    }

    .nav-link {
      text-align: center;
      padding: 10px 0;
    }
  }
}
</style>
