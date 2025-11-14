<template>
  <n-dropdown
    :options="dropdownLocaleOptions"
    @select="handleLocaleChange"
    placement="bottom-end"
    :disabled="localeStore.isLoading"
  >
    <n-button
      type="primary"
      size="small"
      class="flex items-center gap-1"
      :loading="localeStore.isLoading"
    >
      <span>{{ localeStore.currentLocaleLabel }}</span>
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        :class="{ 'opacity-50': localeStore.isLoading }"
      >
        <path
          d="M3 4L6 7L9 4"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </n-button>
  </n-dropdown>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useLocaleStore, localeOptions } from '@/stores/localeStore'
import type { LocaleType } from '@/types/locale'

// 初始化
const localeStore = useLocaleStore()

// 配置下拉菜单选项
const dropdownLocaleOptions = computed(() => {
  return localeOptions.map((option) => ({
    label: option.label,
    key: option.value,
  }))
})

// 处理语言切换
const handleLocaleChange = async (key: string) => {
  try {
    await localeStore.setLocale(key as LocaleType)
    // 不再需要强制刷新页面，因为语言切换已经通过响应式系统处理
  } catch (error) {
    console.error('Language switch failed:', error)
  }
}
</script>

<style scoped>
svg {
  transition: transform 0.2s;
}
.n-dropdown:hover svg {
  transform: translateY(1px);
}
</style>
