import { useDark, useToggle } from '@vueuse/core'
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import type { GlobalTheme } from 'naive-ui'
import { darkTheme } from 'naive-ui'

// 定义主题 Store
export const useThemeStore = defineStore('theme', () => {
  // 使用 @vueuse/core 的 useDark 管理系统暗色模式状态
  const isDark = useDark()

  // 使用 @vueuse/core 的 useToggle 获取切换方法
  const toggleDark = useToggle(isDark)

  // 使用 naive-ui 的主题类型和深色主题
  const theme = ref<GlobalTheme | null>(null)

  // 同步 naive-ui 主题与系统暗色模式状态
  const syncTheme = () => {
    theme.value = isDark.value ? darkTheme : null
  }

  // 初始化时同步一次主题
  syncTheme()

  // 监听系统暗色模式状态变化，实时同步 naive-ui 主题
  watch(isDark, () => {
    syncTheme()
    console.log('isDark changed', isDark.value)
  })

  // 暴露状态和方法
  return {
    theme,
    isDark,
    toggleTheme: toggleDark,
    syncTheme,
  }
})

// 导出 Store 的类型
export type ThemeStore = ReturnType<typeof useThemeStore>
