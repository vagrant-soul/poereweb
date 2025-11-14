<template>
  <div class="data-table-container">
    <!-- 控制区 -->
    <div class="control-panel">
      <!-- 搜索框 -->
      <n-input v-model:value="searchQuery" placeholder="搜索内容..." class="search-input" clearable>
        <template #prefix>
          <n-icon size="18">
            <SearchOutlined />
          </n-icon>
        </template>
      </n-input>

      <!-- 收藏开关 -->
      <n-space>
        <n-switch
          v-model:value="showOnlyFavorites"
          :label="showOnlyFavorites ? '只看收藏' : '全部内容'"
        />
        <n-badge :value="favoritesCount" dot>
          <n-icon size="20">
            <StarOutlined />
          </n-icon>
        </n-badge>
      </n-space>
    </div>

    <!-- 表格内容区 -->
    <n-data-table
      :data="filteredData"
      :columns="columns"
      class="data-table"
      :row-class-name="rowClassName"
      @row-click="handleRowClick"
      pagination-position="none"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, h } from 'vue'
import { SearchOutlined, StarOutlined, StarFilled } from '@vicons/antd'
import { NInput, NIcon, NSpace, NSwitch, NBadge, NDataTable, type DataTableColumns } from 'naive-ui'

// 定义表格数据项的接口
interface TableItem {
  id: number
  name: string
  description: string
  value: number | string
  [key: string]: string | number // 允许其他属性
}

// 导入本地JSON数据（假设数据文件在src/data目录下）
import tableData from '../data/tableData.json'

// 类型断言，确保导入的数据符合接口定义
const rawData = tableData as TableItem[]

// 状态管理 - 带类型注解
const searchQuery = ref<string>('')
const showOnlyFavorites = ref<boolean>(false)
const selectedRowKey = ref<number | null>(null)
const favoriteIds = ref<Set<number>>(new Set())

// 初始化：从localStorage加载收藏状态
onMounted(() => {
  const savedFavorites = localStorage.getItem('tableFavorites')
  if (savedFavorites) {
    try {
      const parsed = JSON.parse(savedFavorites) as number[]
      favoriteIds.value = new Set(parsed)
    } catch (e) {
      console.error('Failed to parse favorites from localStorage', e)
      localStorage.removeItem('tableFavorites')
    }
  }
})

// 保存收藏状态到localStorage
const saveFavorites = () => {
  localStorage.setItem('tableFavorites', JSON.stringify(Array.from(favoriteIds.value)))
}

// 计算属性：过滤后的数据
const filteredData = computed<TableItem[]>(() => {
  return rawData.filter((item) => {
    // 搜索过滤
    const matchesSearch = searchQuery.value
      ? Object.values(item).some(
          (value) =>
            value && value.toString().toLowerCase().includes(searchQuery.value.toLowerCase()),
        )
      : true

    // 收藏过滤
    const matchesFavorite = showOnlyFavorites.value ? favoriteIds.value.has(item.id) : true

    return matchesSearch && matchesFavorite
  })
})

// 计算属性：收藏数量
const favoritesCount = computed<number>(() => {
  return favoriteIds.value.size
})

// 表格列配置
const columns: DataTableColumns<TableItem> = [
  {
    title: '收藏',
    key: 'favorite',
    width: 80,
    render(row: TableItem) {
      const isFavorite = favoriteIds.value.has(row.id)
      return h(
        NIcon,
        {
          size: 18,
          class: isFavorite ? 'favorite-icon active' : 'favorite-icon',
          onClick: (e: MouseEvent) => {
            e.stopPropagation()
            toggleFavorite(row.id)
          },
        },
        { default: () => h(isFavorite ? StarFilled : StarOutlined) },
      )
    },
  },
  {
    title: 'ID',
    key: 'id',
    width: 80,
  },
  {
    title: '名称',
    key: 'name',
  },
  {
    title: '描述',
    key: 'description',
  },
  {
    title: '数值',
    key: 'value',
  },
]

// 切换收藏状态
const toggleFavorite = (id: number) => {
  if (favoriteIds.value.has(id)) {
    favoriteIds.value.delete(id)
  } else {
    favoriteIds.value.add(id)
  }
  saveFavorites()
}

// 处理行点击
const handleRowClick = (row: TableItem) => {
  // 点击同一行取消选择，否则选中
  selectedRowKey.value = selectedRowKey.value === row.id ? null : row.id

  // 这里可以处理获取到的值，例如输出到控制台或传递给父组件
  if (selectedRowKey.value === row.id) {
    console.log('选中行的值:', row)
    // 可以通过emit将值传递给父组件
    // emit('row-selected', row)
  }
}

// 行样式类名
const rowClassName = (row: { index: number; data?: TableItem }) => {
  const classes: string[] = []
  // 斑马线条纹
  if (row.index % 2 === 1) {
    classes.push('zebra-row')
  }
  // 选中行高亮 - 添加空值检查
  if (row.data && selectedRowKey.value === row.data.id) {
    classes.push('selected-row')
  }
  return classes.join(' ')
}
</script>

<style scoped>
.data-table-container {
  max-width: 1200px;
  margin: 20px auto;
  padding: 0 20px;
}

.control-panel {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding: 16px;
  background: #f5f7fa;
  border-radius: 8px;
}

.search-input {
  width: 300px;
}

.data-table {
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

/* 斑马线条纹样式 */
.zebra-row {
  background-color: #fafafa !important;
}

/* 选中行样式 */
.selected-row {
  background-color: #e6f7ff !important;
}

/* 收藏图标样式 */
.favorite-icon {
  cursor: pointer;
  color: #ccc;
  transition: color 0.2s;
}

.favorite-icon.active {
  color: #faad14;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .control-panel {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }

  .search-input {
    width: 100%;
  }
}
</style>
