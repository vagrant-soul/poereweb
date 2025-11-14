<template>
  <div class="test-page">
    <h1>测试页面</h1>
    <div>表格交互日志：</div>
    <div class="logs" v-if="logs.length > 0">
      <div v-for="(log, index) in logs" :key="index" class="log-item">{{ log }}</div>
    </div>
    <ListTableNew
      :data="tableData"
      :columns="customColumns"
      row-key="id"
      @row-click="handleRowClick"
      @row-select="handleRowSelect"
      @favorite-change="handleFavoriteChange"
    />
  </div>
</template>

<script setup lang="ts">
import ListTableNew from '@/components/ListTableNew.vue'
import { ref } from 'vue'

interface CustomTableItem {
  id: number
  name: string
  description: string
  value: number
}

const tableData = ref<CustomTableItem[]>([
  { id: 1, name: '项目1', description: '描述1', value: 100 },
  { id: 2, name: '项目2', description: '描述2', value: 200 },
  // 更多数据...
])

const customColumns = [
  { title: 'ID', key: 'id', width: 80 },
  { title: '名称', key: 'name' },
  { title: '描述', key: 'description' },
  { title: '数值', key: 'value' },
  // 可以添加自定义列...
]

// 添加日志数组，用于显示交互信息在页面上
const logs = ref<string[]>([])

// 添加日志的辅助函数
const addLog = (message: string) => {
  logs.value.push(`[${new Date().toLocaleTimeString()}] ${message}`)
  // 限制日志数量，避免页面变得过大
  if (logs.value.length > 20) {
    logs.value.shift()
  }
}

const handleRowClick = (row: CustomTableItem) => {
  // 添加详细日志，包括行的所有信息
  const logMessage = `行被点击: ID=${row.id}, 名称=${row.name}, 数值=${row.value}`
  console.log(logMessage)
  console.log('完整行数据:', row)
  addLog(logMessage)
}

const handleRowSelect = (row: CustomTableItem | null) => {
  if (row) {
    const logMessage = `行被选中: ID=${row.id}, 名称=${row.name}`
    console.log(logMessage)
    addLog(logMessage)
  } else {
    const logMessage = '行被取消选中'
    console.log(logMessage)
    addLog(logMessage)
  }
}

const handleFavoriteChange = (favoriteIds: Set<number>) => {
  const logMessage = `收藏ID变化: ${Array.from(favoriteIds).join(', ')}`
  console.log(logMessage)
  addLog(logMessage)
}

// 组件挂载时添加初始化日志，验证组件正常工作
console.log('TestPage组件已挂载，表格数据:', tableData.value)
addLog('TestPage组件已初始化')
</script>

<style scoped>
.test-page {
  padding: 20px;
}

.logs {
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px;
  max-height: 200px;
  overflow-y: auto;
  margin-bottom: 20px;
}

.log-item {
  font-family: monospace;
  font-size: 12px;
  margin: 4px 0;
  padding: 2px;
  background-color: #fff;
  border-radius: 2px;
}
</style>
