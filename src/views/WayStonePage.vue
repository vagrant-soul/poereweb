<template>
  <n-layout-content>
    <Result :display-text="displayText" @reset="handleReset" />
    <!-- 筛选内容部分 -->
    <n-card style="margin-top: 16px; border-radius: 8px">
      <!-- 第一组复选框 -->
      <n-flex class="page-layout" gap="16px">
        <!-- 左侧部分（放置选项组） -->
        <n-flex class="left-section" vertical flex="1">
          <!-- 匹配规则 -->
          <div class="options-group">
            <h3 class="group-title">匹配规则</h3>
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
          <!-- 稀有度 -->
          <div class="options-group">
            <h3 class="group-title">稀有度:</h3>
            <n-checkbox-group v-model:value="WaystoneRarity" class="checkbox-wrapper">
              <n-space>
                <n-checkbox
                  v-for="option in WaystoneRarityGruop"
                  :key="option.value"
                  :value="option.value"
                  :label="option.label"
                />
              </n-space>
            </n-checkbox-group>
          </div>
          <!-- 腐化状态 -->
          <div class="options-group">
            <h3 class="group-title">腐化状态</h3>
            <n-radio-group v-model:value="WaystoneCorrupted" class="checkbox-wrapper">
              <n-space>
                <n-radio
                  v-for="option in CorruptedOptions"
                  :key="option.value"
                  :value="option.value"
                  :label="option.label"
                >
                </n-radio>
              </n-space>
            </n-radio-group>
          </div>
          <!-- 包含 额外词缀 -->
          <div class="options-group">
            <!-- <h3 class="group-title">包含额外词缀</h3> -->
            <!-- 做到这里还没完成 有額  该区域包含任意数量的额外包装-->
            <n-checkbox v-model:checked="AdditionalPacks" value="{{AdditionalOptions.value}}">{{
              AdditionalOptions.label
            }}</n-checkbox>
          </div>
        </n-flex>

        <!-- 右侧部分（可以放置其他内容） -->
        <n-flex class="right-section" vertical flex="1"> 右侧部分（可以放置其他内容） </n-flex>
      </n-flex>
    </n-card>
  </n-layout-content>
</template>
<script setup lang="ts">
import Result from '@/components/ReSult.vue'
import { ref, computed } from 'vue'
// 第一组选项配置
const WaystoneRarityGruop = [
  { label: '普通', value: '中' },
  { label: '魔法', value: '魔' },
  { label: '稀有', value: '稀' },
]
// 腐化状态选项配置
const CorruptedOptions = [
  { label: '未腐化', value: '!已腐' },
  { label: '腐化', value: '已腐' },
]
// 第二组选项配置
const AdditionalOptions = { label: '区域包含任意额外词缀', value: '有額' }

// 单选框选项配置
const radioOptions = [
  { label: '完全匹配', value: 'and' },
  { label: '任意匹配', value: 'or' },
]

// 响应式数据
const WaystoneRarity = ref<string[]>([])
const WaystoneCorrupted = ref<string>('')
const AdditionalPacks = ref(false)
const selectedRadioOption = ref<string>('and')
// 重置函数
const handleReset = () => {
  // 重置所有选择项
  WaystoneRarity.value = []
  WaystoneCorrupted.value = ''
  AdditionalPacks.value = false
  selectedRadioOption.value = 'and'

  // 可以在这里添加重置后的其他逻辑，如提示信息
}

// 修改displayText计算属性，直接显示value值
const displayText = computed(() => {
  const results: string[] = []
  // const selectedMode = selectedRadioOption.value || 'and' // 默认使用and模式
  // 处理地图稀有度 - 按照度: (选项|选项)或度: 选项的格式
  if (WaystoneRarity.value.length > 0) {
    // 优化：当选项数量为3个时也不显示
    if (WaystoneRarity.value.length === 3) {
      // 选项数量为3个时，不添加到结果中（返回空值效果）
    } else if (WaystoneRarity.value.length > 1) {
      // 多个选项时: "度: (n|m|r|u)"
      results.push(`"度: (${WaystoneRarity.value.join('|')})"`)
    } else {
      // 单个选项时: "度: n"
      results.push(`"度: ${WaystoneRarity.value[0]}"`)
    }
  }
  // 处理腐化状态 - 按照已腐: 选项的格式
  if (WaystoneCorrupted.value) {
    results.push(`"${WaystoneCorrupted.value}"`)
  }
  // 处理selectedOptionsGroup2（保持原有逻辑）
  if (AdditionalPacks.value) {
    results.push(`"${AdditionalOptions.value}"`)
  }
  // // 处理单选框显示（可选）
  // if (selectedRadioOption.value) {
  //   results.push(`${selectedRadioOption.value}`)
  // }

  return results.length > 0 ? results.join('\n') : ''
})
</script>
<style scoped>
/* 确保主容器正确分布空间 */
.page-layout {
  /* Naive UI的n-flex已经处理了基本的flex布局，但我们可以添加一些额外样式 */
  width: 100%;
  justify-content: space-between; /* 确保左右部分之间有适当间距 */
}

/* 确保左右部分平分空间并具有相同的最小宽度 */
.left-section,
.right-section {
  flex: 1; /* 这会使两个部分平分布局 */
  min-width: 0; /* 防止内容溢出 */
  /* 为了更好地可视化布局，可以添加临时的边框 */
  /* border: 1px solid #e0e0e0; */
}

/* 确保选项组内的内容正确排列 */
.options-group {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  gap: 16px;
  flex-wrap: wrap; /* 当空间不足时允许内容换行 */
}

.group-title {
  margin: 0;
  font-size: 16px;
  white-space: nowrap;
  min-width: max-content;
}

.checkbox-wrapper {
  flex: 1;
  min-width: 0;
}
</style>
