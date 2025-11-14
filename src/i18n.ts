// 简化i18n.ts，只负责创建实例
import { createI18n, type I18nOptions } from 'vue-i18n'
import zhCN from './locales/lang/zh-CN.json'

// 创建基础i18n实例
const i18nOptions: I18nOptions = {
  legacy: false,
  locale: 'zh-CN',
  fallbackLocale: 'zh-CN',
  silentTranslationWarn: true,
  messages: {
    'zh-CN': zhCN,
  },
}

const i18n = createI18n(i18nOptions)

export default i18n
