<template>
  <n-config-provider :theme="darkTheme">
    <!-- null darkTheme -->

    <n-space vertical size="large">
      <n-layout>
        <n-layout-header>颐和园路</n-layout-header>
        <n-layout has-sider>
          <n-layout-sider content-style="padding: 24px;"> 海淀桥 </n-layout-sider>
          <n-layout-content content-style="padding: 24px;">
            <Result :display-text="displayText" @reset="handleReset" />
            <!-- 筛选内容部分 -->
            <n-card title="筛选选项" style="margin-top: 16px; border-radius: 8px">
              <!-- 第一组复选框 -->
              <div class="options-group">
                <h3 class="group-title">选项组1</h3>
                <n-checkbox-group v-model:value="selectedOptionsGroup1" class="checkbox-wrapper">
                  <n-space>
                    <n-checkbox
                      v-for="option in optionsGroup1"
                      :key="option.value"
                      :value="option.value"
                      :label="option.label"
                    />
                  </n-space>
                </n-checkbox-group>
              </div>

              <!-- 第二组复选框 -->
              <div class="options-group">
                <h3 class="group-title">选项组2</h3>
                <n-checkbox-group v-model:value="selectedOptionsGroup2" class="checkbox-wrapper">
                  <n-space>
                    <n-checkbox
                      v-for="option in optionsGroup2"
                      :key="option.value"
                      :value="option.value"
                      :label="option.label"
                    />
                  </n-space>
                </n-checkbox-group>
              </div>

              <!-- 单选框组 -->
              <div class="options-group">
                <h3 class="group-title">单选选项</h3>
                <n-radio-group v-model:value="selectedRadioOption" class="checkbox-wrapper">
                  <n-space>
                    <n-radio
                      v-for="option in radioOptions"
                      :key="option.value"
                      :value="option.value"
                      :label="option.label"
                    >
                    </n-radio>
                  </n-space>
                </n-radio-group>
              </div>
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
// 第一组选项配置
const optionsGroup1 = [
  { label: '选项1', value: '1' },
  { label: '选项2', value: '2' },
  { label: '选项3', value: '3' },
]

// 第二组选项配置
const optionsGroup2 = [
  { label: '选项A', value: 'A' },
  { label: '选项B', value: 'B' },
  { label: '选项C', value: 'C' },
]

// 单选框选项配置
const radioOptions = [
  { label: '单选1', value: 'radio1' },
  { label: '单选2', value: 'radio2' },
  { label: '单选3', value: 'radio3' },
]

// 响应式数据
const selectedOptionsGroup1 = ref<string[]>([])
const selectedOptionsGroup2 = ref<string[]>([])
const selectedRadioOption = ref<string>('')
// 重置函数
const handleReset = () => {
  // 重置所有选择项
  selectedOptionsGroup1.value = []
  selectedOptionsGroup2.value = []
  selectedRadioOption.value = ''

  // 可以在这里添加重置后的其他逻辑，如提示信息
}

// 修改displayText计算属性，直接显示value值
const displayText = computed(() => {
  const results: string[] = []

  // 处理第一组复选框 - 直接显示value值
  if (selectedOptionsGroup1.value.length > 0) {
    results.push(`选项组1: ${selectedOptionsGroup1.value.join(', ')}`)
  }

  // 处理第二组复选框 - 直接显示value值
  if (selectedOptionsGroup2.value.length > 0) {
    results.push(`选项组2: ${selectedOptionsGroup2.value.join(', ')}`)
  }

  // 处理单选框 - 直接显示value值
  if (selectedRadioOption.value) {
    results.push(`单选值: ${selectedRadioOption.value}`)
  }

  return results.length > 0 ? results : ''
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

.options-group {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  gap: 16px;
}

.group-title {
  margin: 0;
  font-size: 16px;
  white-space: nowrap;
}

.checkbox-wrapper {
  flex: 1;
}
</style>
