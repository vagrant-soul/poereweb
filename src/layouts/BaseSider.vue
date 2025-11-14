<template>
  <n-layout-sider
    bordered
    collapse-mode="width"
    :collapsed-width="64"
    :width="240"
    :collapsed="collapsed"
    show-trigger
    @collapse="collapsed = true"
    @expand="collapsed = false"
  >
    <n-menu
      v-model:value="activeKey"
      :collapsed="collapsed"
      :collapsed-width="64"
      :collapsed-icon-size="22"
      :options="menuOptions"
    />
  </n-layout-sider>
</template>

<script setup lang="ts">
import type { Component } from 'vue'
import { LogOutOutline as HomeIcon, LaptopOutline as WorkIcon } from '@vicons/ionicons5'
import type { MenuOption } from 'naive-ui'
import { NIcon } from 'naive-ui'
import { h, ref } from 'vue'
import { RouterLink } from 'vue-router'
function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

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
        { default: () => '首页' },
      ),
    key: 'go-to-home',
    icon: renderIcon(HomeIcon),
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
            path: '/test',
          },
        },
        { default: () => '测试页' },
      ),
    key: 'go-to-work',
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
    key: 'go-to-demo',
    icon: renderIcon(WorkIcon),
  },
]

const activeKey = ref<string | null>(null)
const collapsed = ref(false)
</script>
