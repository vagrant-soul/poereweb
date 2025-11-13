<template>
  <n-config-provider :theme="darkTheme">
    //null darkTheme

    <n-space vertical size="large">
      <n-layout>
        <n-layout-header>颐和园路</n-layout-header>
        <n-layout has-sider>
          <n-layout-sider content-style="padding: 24px;"> 海淀桥 </n-layout-sider>
          <n-layout-content content-style="padding: 24px;">
            <Result :display-text="displayText" />
            <!-- 筛选内容部分 -->
            <n-card title="筛选选项" style="margin-top: 16px; border-radius: 8px">
              <n-checkbox-group v-model:value="selectedOptions">
                <!-- 垂直布局 -->
                <n-space>
                  <n-checkbox value="option1">选项一</n-checkbox>
                  <n-checkbox value="option2">选项二</n-checkbox>
                  <n-checkbox value="option3">选项三</n-checkbox>
                </n-space>
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
import { ref, computed } from 'vue'
import { darkTheme } from 'naive-ui' // 临时引用暗色主题
// 存储选中的选项
const selectedOptions = ref<string[]>([])
// 在父组件中进行所有计算

const checkboxOptions = [
  { value: 'option1', label: '选项一' },
  { value: 'option2', label: '选项二' },
  { value: 'option3', label: '选项三' },
]

// 然后在计算属性中直接使用
const displayText = computed(() => {
  if (selectedOptions.value.length > 0) {
    const displayTexts = selectedOptions.value.map(
      (val) => checkboxOptions.find((opt) => opt.value === val)?.label || val,
    )
    return `已选择: ${displayTexts.join(', ')}`
  }
  return ''
})
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
