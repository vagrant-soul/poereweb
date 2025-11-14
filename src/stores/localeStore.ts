// 修改localeStore.ts，优化语言切换逻辑
import { defineStore } from 'pinia'
import type { LocaleType, LocaleOption } from '@/types/locale'
import i18n from '@/i18n'
import { setStoredLocale, getStoredLocale } from '@/utils/storage'

// 导入NaiveUI语言包
import zhCN from '@/locales/naive/zhCN'
import enUS from '@/locales/naive/enUS'
import zhTW from '@/locales/naive/zhTW '

// 语言选项配置
export const localeOptions: LocaleOption[] = [
  { label: '简体中文', value: 'zh-CN' },
  { label: 'English', value: 'en' },
  { label: '正體中文', value: 'zh-TW' },
]

// NaiveUI语言包映射
type NaiveUILocale = typeof zhCN
const naiveLocales: Record<LocaleType, NaiveUILocale> = {
  'zh-CN': zhCN,
  en: enUS,
  'zh-TW': zhTW,
}

// 预加载过的语言缓存
const preloadedLocales = new Set<LocaleType>(['zh-CN']) // 默认语言已预加载

// 在localeStore中添加初始化方法
export const useLocaleStore = defineStore('locale', {
  state: () => ({
    currentLocale: i18n.global.locale as LocaleType,
    naiveLocale: naiveLocales[i18n.global.locale as LocaleType],
    isLoading: false, // 添加加载状态
  }),
  getters: {
    /** 获取当前语言显示标签 */
    currentLocaleLabel(state): string {
      return localeOptions.find((option) => option.value === state.currentLocale)?.label || '中文'
    },
  },
  actions: {
    /** 切换语言 */
    async setLocale(locale: LocaleType) {
      if (this.currentLocale === locale || this.isLoading) return

      this.isLoading = true
      try {
        // 检查语言包是否已加载
        if (!preloadedLocales.has(locale)) {
          // 按需加载语言包
          const messages = await import(`@/locales/lang/${locale}.json`)
          i18n.global.setLocaleMessage(locale, messages.default)
          preloadedLocales.add(locale) // 添加到已加载缓存
        }

        // 切换语言（同步操作，立即生效）
        i18n.global.locale = locale
        this.naiveLocale = naiveLocales[locale]
        this.currentLocale = locale
        setStoredLocale(locale)

        // 触发全局事件，通知所有组件语言已改变
        window.dispatchEvent(new CustomEvent('localeChanged', { detail: locale }))
      } catch (error) {
        console.error('Failed to switch locale:', error)
        // 出错时恢复原状态
        this.currentLocale = i18n.global.locale as LocaleType
      } finally {
        this.isLoading = false
      }
    },

    /** 初始化语言设置 */
    async initializeLocale() {
      const storedLocale = getStoredLocale()
      const browserLocale = navigator?.language?.split('-')[0] || ''

      // 确定默认语言
      let defaultLocale: LocaleType = 'zh-TW'

      if (
        storedLocale &&
        (storedLocale === 'zh-CN' || storedLocale === 'en' || storedLocale === 'zh-TW')
      ) {
        defaultLocale = storedLocale
      } else if (browserLocale === 'en' || browserLocale === 'zh-TW') {
        defaultLocale = browserLocale
      }

      // 如果不是默认语言，需要加载语言包
      if (defaultLocale !== 'zh-TW') {
        await this.setLocale(defaultLocale)
      }
    },
  },
})
