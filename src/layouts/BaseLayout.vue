<template>
  <div class="base-layout">
    <!-- 背景图片层 -->
    <div class="background-layer"></div>

    <!-- 内容容器，限制最大宽度 -->
    <div class="content-container">
      <n-space vertical size="large">
        <n-layout>
          <n-layout-header>
            <BaseTop />
          </n-layout-header>
          <n-layout has-sider>
            <BaseSider />
            <n-layout-content content-style="padding: 24px;">
              <router-view />
            </n-layout-content>
          </n-layout>
          <n-layout-footer>页脚</n-layout-footer>
        </n-layout>
      </n-space>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseSider from './BaseSider.vue'
import BaseTop from './BaseTop.vue'
</script>

<style scoped>
.base-layout {
  position: relative;
  min-height: 100vh;
}

.background-layer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('/images/bg.webp'); /* 请替换为你的背景图片路径 */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.9; /* 轻微透明度，不影响内容阅读 */
  z-index: -1;
}

.content-container {
  max-width: 1400px; /* 限制最大宽度 */
  margin: 0 auto; /* 居中显示 */
  position: relative;
  z-index: 1; /* 确保内容在背景之上 */
}

/* 响应式设计 */
@media (max-width: 1400px) {
  .content-container {
    max-width: 1200px;
  }
}

@media (max-width: 1200px) {
  .content-container {
    max-width: 100%;
    padding: 0 20px;
  }
}

@media (max-width: 768px) {
  .content-container {
    padding: 0 16px;
  }
}
</style>
