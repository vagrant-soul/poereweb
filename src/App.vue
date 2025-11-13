<template>
  <n-config-provider :theme="darkTheme">
    //null darkTheme

    <n-space vertical size="large">
      <n-layout>
        <n-layout-header>颐和园路</n-layout-header>
        <n-layout has-sider>
          <n-layout-sider content-style="padding: 24px;"> 海淀桥 </n-layout-sider>
          <n-layout-content content-style="padding: 24px;">
            <Result />
            <!-- 筛选内容部分 -->
            <n-card title="筛选选项" style="margin-top: 16px; border-radius: 8px">
              <n-checkbox-group v-model:value="selectedOptions">
                <!-- 垂直布局 -->
                <n-space vertical>
                  <n-checkbox value="option1">选项一</n-checkbox>
                  <n-checkbox value="option2">选项二</n-checkbox>
                  <n-checkbox value="option3">选项三</n-checkbox>
                </n-space>

                <!-- 或水平布局 -->
                <!--
    <n-space>
      <n-checkbox value="option1">选项一</n-checkbox>
      <n-checkbox value="option2">选项二</n-checkbox>
      <n-checkbox value="option3">选项三</n-checkbox>
    </n-space>
    -->
              </n-checkbox-group>
            </n-card>
          </n-layout-content>
        </n-layout>
        <n-layout-footer>成府路</n-layout-footer>
      </n-layout>
    </n-space>
  </n-config-provider>
</template>

<script setup lang="ts">
import Result from '@/components/ReSult.vue'
import { ref } from 'vue'
import { darkTheme } from 'naive-ui' // 临时引用暗色主题
// 存储选中的选项
const selectedOptions = ref<string[]>([])
</script>
<style scoped>
.n-layout-header,
.n-layout-footer {
  background: rgba(128, 128, 128, 0.2);
  padding: 24px;
}

.n-layout-sider {
  background: rgba(128, 128, 128, 0.3);
}
</style>
