// 本地存储工具函数
const STORAGE_KEY = 'webre_locale'

/**
 * 获取存储的语言设置
 */
export function getStoredLocale(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch (error) {
    console.warn('Failed to get stored locale from localStorage:', error)
    return null
  }
}

/**
 * 设置存储的语言设置
 */
export function setStoredLocale(locale: string): void {
  try {
    localStorage.setItem(STORAGE_KEY, locale)
  } catch (error) {
    console.warn('Failed to set locale to localStorage:', error)
  }
}
