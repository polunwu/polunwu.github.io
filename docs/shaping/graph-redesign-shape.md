---
shaping: true
---

# Graph Visualization Redesign — Shaping Doc

## Requirements (R)

| ID | Requirement | Status |
|----|-------------|--------|
| R0 | 觀者能一眼辨識「哪些是專案」 | Core goal |
| R1 | 專案節點顯示為圓角方塊，文字內嵌，全藍底白字 | Must-have |
| R2 | Tech 節點顯示為圓角小方塊，文字內嵌，大小依 connectedCount 整體縮放 | Must-have |
| R3 | Domain / Capability 為極小實色圓點（非半透明），hover 才顯示 label | Must-have |
| R4 | 側邊面板顯示 7 個高頻 tech 按鈕，點擊 highlight 相關節點與連線 | Must-have |
| R5 | Highlight 模式與現有點擊行為保持一致體驗 | Nice-to-have |

---

## Shape C: 方塊層級系統 + 側邊 Tech 篩選器

| Part | 節點類型 | 形狀 | 大小 | 顏色 |
|------|----------|------|------|------|
| C1 | **Project** | 圓角方塊，文字內嵌 | 固定，較大 | 全藍底 `#1400ff` + 白字 |
| C2 | **Tech** | 圓角小方塊，文字內嵌 | 整體依 connectedCount 縮放 | 深色 `#1a1a1a` 底 + 白字 |
| C3 | **Domain** | 極小實色圓點 | 固定，小 | 淡灰 `#c8c8c8`，hover 顯示 label |
| C4 | **Capability** | 極小實色圓點 | 固定，更小 | 更淡灰 `#e0e0e0`，hover 顯示 label |
| C5 | **側邊 Tech 篩選面板** | pill button 清單，固定在畫布左側或右側 | — | 對應 Tech 節點深色樣式 |

### C5 側邊篩選器內容（依出現頻率 + 面試高頻排序）

1. TypeScript
2. Vue.js
3. Next.js
4. React
5. Nuxt
6. Docker
7. Tailwind CSS
8. GSAP

---

## 視覺語言原則

- **方塊 = 有名字的主角**（Project、Tech 都有明確 label 內嵌）
- **點 = 次要分類**（Domain、Capability 退為背景資訊）
- **無半透明**：所有節點顏色為實色，靠大小與顏色深淺建立層級
- **Highlight 時**：非相關節點 opacity 降至 0.08，相關節點保持全亮

---

## 決定事項

- C5 篩選面板位置：**右側**
- Tech 方塊：有最小尺寸保護（`min: 60×20px`），`max: 120×32px`，connectedCount 在此範圍內縮放
- Project 方塊：設定最大寬度（`max-width: ~140px`），超過文字換行
