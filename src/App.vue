<template>
  <n-config-provider :theme="themeStore.theme" :locale="localeStore.naiveLocale">
    <main>
      <RouterView />
    </main>
  </n-config-provider>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/stores/themeStore'
import { useLocaleStore } from '@/stores/localeStore'

const themeStore = useThemeStore()
const localeStore = useLocaleStore()
</script>
