# Portfolio Vue.js 轉換專案

## 專案概述

這是荷馬桑 (Homer Shie) 個人作品集網站的 Vue.js 版本，從原始的 HTML/CSS/JS 版本轉換而來。

## 技術堆疊

- **前端框架**: Vue.js 3
- **路由**: Vue Router 4
- **狀態管理**: Pinia
- **建置工具**: Vite
- **樣式**: CSS (原始樣式保留)
- **程式語言**: JavaScript (ES6+)

## 專案結構

```
src/
├── components/          # Vue 組件
│   ├── AppNavbar.vue   # 導航欄組件
│   └── AppFooter.vue   # 頁腳組件
├── views/              # 頁面組件
│   ├── HomeView.vue    # 首頁
│   ├── AboutView.vue   # 關於頁面
│   ├── ServicesView.vue # 服務頁面
│   ├── PortfolioView.vue # 作品集頁面
│   ├── BlogsView.vue   # 部落格頁面
│   └── ContactView.vue # 聯絡頁面
├── data/               # 資料檔案
│   └── portfolioData.js # 作品集和部落格資料
├── router/             # 路由配置
│   └── index.js
└── assets/             # 靜態資源
    ├── style.css       # 主要樣式
    └── imgs/           # 圖片資源
```

## 主要特色

- ✅ 完整的單頁應用程式 (SPA)
- ✅ 響應式設計
- ✅ 作品集篩選功能
- ✅ 部落格搜尋和分類
- ✅ 圖片燈箱效果
- ✅ 平滑滾動導航
- ✅ SEO 友善

## 已轉換的功能

1. **導航系統**: 完整的路由導航
2. **作品集展示**: 15個作品項目，支援分類篩選
3. **部落格系統**: 5篇詳細文章，支援搜尋和分類
4. **響應式布局**: 移動端適配
5. **互動效果**: 燈箱、模態框、動畫

## 安裝和運行

### 開發環境

```bash
# 安裝依賴
npm install

# 啟動開發伺服器
npm run dev

# 在瀏覽器中開啟 http://localhost:5173
```

### 生產建置

```bash
# 建立生產版本
npm run build

# 預覽生產版本
npm run preview
```

## 資料結構

所有作品集和部落格資料都存放在 `src/data/portfolioData.js` 中：

- `portfolioWorks`: 15個作品項目
- `blogPosts`: 5篇部落格文章

## 圖片資源管理

圖片存放在 `public/imgs/` 目錄下：

- `public/imgs/works/`: 作品集圖片
- `public/imgs/blog/`: 部落格圖片

## 瀏覽器支援

- Chrome (推薦)
- Firefox
- Safari
- Edge

## 部署建議

建議部署到支援 SPA 的靜態網站託管服務：

- Netlify
- Vercel
- GitHub Pages
- Firebase Hosting

## 作者

**荷馬桑 (Homer Shie)**

- 職業: 視覺設計師 / 動態設計師
- Instagram: [@homer_create](https://www.instagram.com/homer_create)
- Medium: [homer-create](https://medium.com/homer-create)
- Pinterest: [HomerShie](https://www.pinterest.com/HomerShie/)

## 版權

© 2024 Homer Shie. All rights reserved.
