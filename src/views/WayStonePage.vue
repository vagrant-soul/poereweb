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
            <h3 class="group-title">稀 有 度:</h3>
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
            <h3 class="group-title">额外怪物</h3>
            <n-checkbox v-model:checked="AdditionalPacks" value="{{AdditionalOptions.value}}">{{
              AdditionalOptions.label
            }}</n-checkbox>
          </div>
        </n-flex>

        <!-- 右侧部分（可以放置其他内容） -->
        <n-flex class="right-section" vertical flex="1">
          <!-- 六词缀地图 -->
          <div class="options-group">
            <!-- <h3 class="group-title">六词缀地图</h3> -->
            <n-checkbox v-model:checked="SixModMaps" value="{{SixModMapOptions.value}}">{{
              SixModMapOptions.label
            }}</n-checkbox>
          </div>
          <!-- 地图等级 -->
          <div class="options-group">
            <h3 class="group-title">換界石階級</h3>
            <n-flex gap="8px" align="center">
              <n-switch v-model:value="TierDisabled" />
              <n-input-number
                v-model:value="TierMinValue"
                button-placement="both"
                :min="1"
                :max="16"
                style="width: 80px"
                :disabled="!TierDisabled"
              />
              <n-input-number
                v-model:value="TierMaxValue"
                button-placement="both"
                :min="1"
                :max="16"
                style="width: 80px"
                :disabled="!TierDisabled"
              />
            </n-flex>
          </div>
        </n-flex>
      </n-flex>
    </n-card>
  </n-layout-content>
</template>
<script setup lang="ts">
import Result from '@/components/ReSult.vue'
import { ref, computed } from 'vue'
// 正则选项配置
const radioOptions = [
  { label: '完全匹配', value: 'and' },
  { label: '任意匹配', value: 'or' },
]
// 地图稀有度
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
// 额外怪物
const AdditionalOptions = { label: '区域包含任意<额外怪物>', value: '有額' }
// 右侧部分
// 六词缀地图
const SixModMapOptions = { label: '六词缀地图', value: '數: 0' }
// 換界石階級
const TierDisabled = ref(false)
const TierMinValue = ref(1)
const TierMaxValue = ref(16)
// 响应式数据
const selectedRadioOption = ref<string>('and')
const WaystoneRarity = ref<string[]>([])
const WaystoneCorrupted = ref<string>('')
const AdditionalPacks = ref(false)

const SixModMaps = ref(false)
// 重置函数
const handleReset = () => {
  // 重置所有选择项
  WaystoneRarity.value = []
  WaystoneCorrupted.value = ''
  AdditionalPacks.value = false
  selectedRadioOption.value = 'and'

  SixModMaps.value = false
  TierMinValue.value = 1
  TierMaxValue.value = 16
  TierDisabled.value = false

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
  // 处理腐化状态
  if (WaystoneCorrupted.value) {
    results.push(`"${WaystoneCorrupted.value}"`)
  }
  // 处理额外怪物
  if (AdditionalPacks.value) {
    results.push(`"${AdditionalOptions.value}"`)
  }
  // 处理六词缀地图
  if (SixModMaps.value) {
    results.push(`"${SixModMapOptions.value}"`)
  }

  // 处理換界石階級 - 生成正则表达式
  if (TierDisabled.value && TierMinValue.value !== null && TierMaxValue.value !== null) {
    const min = Number(TierMinValue.value)
    const max = Number(TierMaxValue.value)

    // 使用优化后的正则表达式生成逻辑
    if (!(min <= 1 && max === 16) && min <= max) {
      // 当最大值和最小值相等时，直接输出当前值
      if (min === max) {
        results.push(`"級: ${min}"`)
      } else {
        const regexParts: string[] = []

        // 处理1-9范围
        if (min <= 9 && max >= 1) {
          const start = Math.max(min, 1)
          const end = Math.min(max, 9)
          if (start <= end) {
            regexParts.push(`[${start}-${end}](?!\\d)`)
          }
        }

        // 处理10-16范围
        if (min <= 16 && max >= 10) {
          const start = Math.max(min, 10) - 10
          const end = Math.min(max, 16) - 10
          if (start <= end) {
            regexParts.push(`1[${start}-${end}]`)
          }
        }

        if (regexParts.length > 0) {
          const regex = `(?:${regexParts.join('|')})`
          results.push(`"級: ${regex}"`)
        }
      }
    }
  }
  // 最后的输出
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
