<template>
  <n-space vertical size="large">
    <n-layout>
      <n-layout-header>
        <BaseTop />
      </n-layout-header>
      <n-layout has-sider>
        <BaseSider />
        <n-layout-content content-style="padding: 24px;"> <router-view /> </n-layout-content>
      </n-layout>
      <n-layout-footer>页脚</n-layout-footer>
    </n-layout>
  </n-space>
</template>

<script setup lang="ts">
import BaseSider from './BaseSider.vue'
import BaseTop from './BaseTop.vue'
</script>
<style scoped></style>
