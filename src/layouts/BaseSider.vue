<template>
  <n-layout-sider
    bordered
    collapse-mode="width"
    :collapsed-width="64"
    :width="160"
    :collapsed="collapsed"
    show-trigger
    @collapse="collapsed = true"
    @expand="collapsed = false"
  >
    <n-menu
      v-model:value="activeKey"
      :collapsed="collapsed"
      :collapsed-width="64"
      :collapsed-icon-size="23"
      :options="menuOptions"
    />
  </n-layout-sider>
</template>

<script setup lang="ts">
import type { Component } from 'vue'
import { LaptopOutline as WorkIcon } from '@vicons/ionicons5'

import type { MenuOption } from 'naive-ui'
import { NIcon } from 'naive-ui'
import { h, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'

function renderIcon(icon: Component | string) {
  // 如果icon是字符串，视为图片路径并渲染图片
  if (typeof icon === 'string') {
    return () =>
      h(NIcon, null, {
        default: () =>
          h('img', {
            src: icon, // 直接使用传入的字符串作为路径
            style: {
              width: '23px', // 增加图片宽度，默认为16px
              height: '23px', // 增加图片高度，默认为16px
            },
          }),
      })
  }
  // 保留原有的组件渲染逻辑
  return () => h(NIcon, null, { default: () => h(icon) })
}
const { t } = useI18n()
const menuOptions: MenuOption[] = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/',
          },
        },
        { default: () => t('app.menuwaystones') }, //換界石
      ),
    key: 'WayStone',
    icon: renderIcon('/waystone_icon.png'),
  },

  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/tablet',
          },
        },
        { default: () => t('app.menutablet') }, //碑牌
      ),
    key: 'Tablet',
    icon: renderIcon('/tablet_icon.png'),
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/relics',
          },
        },
        { default: () => t('app.menurelics') }, //聖物
      ),
    key: 'Relics',
    icon: renderIcon('/relic_icon.png'),
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/vendor',
          },
        },
        { default: () => t('app.menuvendor') }, //商店
      ),
    key: 'Vendor',
    icon: renderIcon('/vendor_icon.png'),
  },
  // 分隔线
  {
    key: 'divider-1',
    type: 'divider',
    props: {
      style: {
        marginLeft: '32px',
      },
    },
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/home',
          },
        },
        { default: () => '首页测试页' },
      ),
    key: 'Home',
    icon: renderIcon(WorkIcon),
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/test',
          },
        },
        { default: () => '测试页1' },
      ),
    key: 'Test',
    icon: renderIcon(WorkIcon),
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/demo',
          },
        },
        { default: () => '测试页2' },
      ),
    key: 'Demo',
    icon: renderIcon(WorkIcon),
  },
]

const activeKey = ref<string | null>(null)
const collapsed = ref(false)
</script>
