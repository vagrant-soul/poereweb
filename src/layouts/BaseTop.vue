<template>
  <div
    class="top-bar"
    style="
      display: flex;
      align-items: center;
      padding: 0 16px;
      height: 56px;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    "
  >
    <div class="left-group" style="display: flex; align-items: center; gap: 16px">
      <n-image width="30" src="../public/UniqueAtlasSkillBook.png" preview-disabled />
      <div class="app-title">{{ $t('app.title') }}</div>
    </div>

    <!-- 右侧区域：语言选择、功能图标、赞助按钮 -->
    <div
      class="right-group"
      style="display: flex; align-items: center; gap: 16px; margin-left: auto"
    >
      <LanguageSelector />

      <n-button circle size="small" type="primary" ghost>
        <n-icon><information-circle-outline /></n-icon>
      </n-button>
      <n-button circle ghost text style="font-size: 24px" @click="() => themeStore.toggleTheme()">
        <n-icon v-if="themeStore.isDark" size="25" :component="Sunny" />
        <n-icon v-else size="25" :component="Moon" />
      </n-button>
      <n-button type="success" size="small" ghost>
        {{ $t('app.sponsor') }} <n-icon><heart-outline /></n-icon>
      </n-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { InformationCircleOutline, Moon, Sunny, HeartOutline } from '@vicons/ionicons5'
import { useThemeStore } from '@/stores/themeStore'
import LanguageSelector from '@/components/LanguageSelector.vue'
import { NIcon } from 'naive-ui'

const themeStore = useThemeStore()
</script>

<style scoped>
.app-title {
  font-size: 18px; /* 加大字体 */
  font-weight: 600; /* 加粗 */
  color: var(--n-text-color-primary); /* 使用主题色变量，适配暗色模式 */
  letter-spacing: 0.5px; /* 稍微增加字间距提升可读性 */
}
</style>
