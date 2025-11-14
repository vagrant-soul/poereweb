// 支持的语言类型
export type LocaleType = 'zh-CN' | 'zh-TW'
// export type LocaleType = 'zh-CN' | 'en' | 'zh-TW'
// 语言选项类型
export interface LocaleOption {
  label: string
  value: LocaleType
}

// 应用语言包结构定义
export interface AppLocaleMessages {
  app: {
    title: string
    description: string
    actionButton: string
    checkboxLabel: string
    language: string
  }
  message: {
    buttonClicked: string
    checkboxChanged: string
  }
}
