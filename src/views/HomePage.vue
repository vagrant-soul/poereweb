<template>
  <n-layout class="min-h-screen">
    <!-- 主要内容区 -->
    <n-layout-content class="flex items-center justify-center p-6 md:p-10 bg-gray-50">
      <div
        class="w-full max-w-md bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-300"
      >
        <!-- 标题区域 -->
        <div class="mb-6 text-center">
          <h1 class="text-2xl font-bold text-gray-800 mb-2">
            {{ $t('app.title') }}
          </h1>
          <n-text class="text-gray-600">
            {{ $t('app.description') }}
          </n-text>
        </div>

        <!-- 按钮组件 -->
        <div class="mb-6">
          <n-button
            type="primary"
            size="large"
            class="w-full transition-transform hover:translate-y-[-2px]"
            @click="handleButtonClick"
          >
            {{ $t('app.actionButton') }}
          </n-button>
        </div>

        <!-- 复选框组件 -->
        <div
          class="flex items-center p-3 border rounded-lg transition-colors hover:border-primary/50"
        >
          <n-checkbox v-model:checked="checked" @update:checked="handleCheckboxChange" />
          <span class="ml-3 text-gray-700">
            {{ $t('app.checkboxLabel') }}
          </span>
        </div>

        <!-- 语言显示区域 -->
        <div class="mt-6 p-3 bg-gray-100 rounded-lg text-center">
          <n-text type="info"> 当前语言: {{ currentLanguageLabel }} </n-text>
        </div>
      </div>
    </n-layout-content>
  </n-layout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLocaleStore } from '@/stores/localeStore'

// 初始化
const { t } = useI18n()
const localeStore = useLocaleStore()
const checked = ref<boolean>(false)

// 获取当前语言标签
const currentLanguageLabel = computed(() => {
  return localeStore.currentLocaleLabel
})

// 按钮点击事件
const handleButtonClick = () => {
  console.log(t('message.buttonClicked'))
}

// 复选框状态改变事件
const handleCheckboxChange = () => {
  console.log(t('message.checkboxChanged') + `: ${checked.value}`)
}
</script>

<style scoped>
/* 样式保持不变 */
</style>
