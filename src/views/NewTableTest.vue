<template>
  <div class="table-container">
    <!-- 搜索和筛选控件区域 -->
    <div class="filter-controls">
      <!-- 输入搜索组件 -->
      <n-input
        v-model:value="searchQuery"
        placeholder="搜索地址..."
        class="search-input"
        clearable
        @input="handleSearch"
      />

      <!-- 收藏筛选开关组件 -->
      <div class="favorite-filter">
        <span>只显示收藏</span>
        <n-switch v-model:value="showOnlyFavorites" @update:value="handleFavoriteFilter" />
      </div>
    </div>

    <!-- 表格组件 -->
    <n-data-table
      :columns="columns"
      :data="filteredData"
      :row-key="(row) => row.key"
      :checked-row-keys="checkedRowKeys"
      @update:checked-row-keys="handleCheckedRowKeysChange"
      :row-props="rowProps"
      class="compact-table"
      size="small"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, h, onMounted, computed } from 'vue'
import type { DataTableColumns } from 'naive-ui'
import { StarOutlined, StarFilled } from '@vicons/antd'
import { NInput, NSwitch } from 'naive-ui'

// 数据类型定义
interface RowData {
  key: number
  name: string
  age: number
  address: string
}

// 常量定义
const STORAGE_KEYS = {
  FAVORITES: 'table-favorite-states',
  SELECTED: 'table-selected-keys',
}

// 响应式数据
const checkedRowKeys = ref<number[]>([])
const favoriteRowKeys = ref<number[]>([])
const searchQuery = ref<string>('')
const showOnlyFavorites = ref<boolean>(false)

// 原始表格数据
const originalData = ref<RowData[]>([
  { key: 0, name: '', age: 32, address: 'New York No. 1 Lake Park' },
  { key: 1, name: '', age: 42, address: 'London No. 1 Lake Park' },
  { key: 2, name: '', age: 32, address: 'Sidney No. 1 Lake Park' },
])

// 计算属性：过滤后的数据
const filteredData = computed(() => {
  let result = [...originalData.value]

  // 1. 应用收藏筛选
  if (showOnlyFavorites.value) {
    result = result.filter((row) => favoriteRowKeys.value.includes(row.key))
  }

  // 2. 应用搜索过滤
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase().trim()
    result = result.filter((row) => row.address.toLowerCase().includes(query))
  }

  return result
})

// 本地存储工具函数
function useLocalStorage<T>(key: string, defaultValue: T) {
  const load = (): T => {
    try {
      const stored = localStorage.getItem(key)
      return stored ? JSON.parse(stored) : defaultValue
    } catch (error) {
      console.error(`从本地存储加载 ${key} 失败:`, error)
      return defaultValue
    }
  }

  const save = (value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error(`保存 ${key} 到本地存储失败:`, error)
    }
  }

  return { load, save }
}

// 初始化收藏状态和选中状态
const { load: loadFavorites, save: saveFavorites } = useLocalStorage<number[]>(
  STORAGE_KEYS.FAVORITES,
  [],
)
const { load: loadSelected, save: saveSelected } = useLocalStorage<number[]>(
  STORAGE_KEYS.SELECTED,
  [],
)

// 计算属性：判断行是否被收藏
const isRowFavorite = computed(() => (key: number) => favoriteRowKeys.value.includes(key))

// 切换行收藏状态
function toggleFavoriteState(row: RowData): void {
  const index = favoriteRowKeys.value.indexOf(row.key)
  if (index > -1) {
    // 取消收藏
    favoriteRowKeys.value = favoriteRowKeys.value.filter((k) => k !== row.key)
    console.log('取消收藏行:', row)
  } else {
    // 添加收藏
    favoriteRowKeys.value = [...favoriteRowKeys.value, row.key]
    console.log('收藏行:', row)
  }
  saveFavorites(favoriteRowKeys.value)
}

// 切换行选中状态
function toggleRowSelection(row: RowData): void {
  const index = checkedRowKeys.value.indexOf(row.key)
  if (index > -1) {
    // 取消选中
    checkedRowKeys.value = checkedRowKeys.value.filter((k) => k !== row.key)
    console.log('取消选中行:', row)
  } else {
    // 添加选中
    checkedRowKeys.value = [...checkedRowKeys.value, row.key]
    console.log('选中行:', row)
  }
  saveSelected(checkedRowKeys.value)
}

// 处理选中状态变化
function handleCheckedRowKeysChange(keys: number[]): void {
  checkedRowKeys.value = keys
  saveSelected(keys)
}

// 处理搜索输入
function handleSearch(): void {
  console.log('搜索查询:', searchQuery.value)
  // 搜索逻辑已在计算属性中实现
}

// 处理收藏筛选切换
function handleFavoriteFilter(): void {
  console.log('收藏筛选状态:', showOnlyFavorites.value)
  // 筛选逻辑已在计算属性中实现
}

// 行属性配置
const rowProps = (row: RowData) => ({
  onClick: (event: MouseEvent) => {
    // 判断点击目标是否为收藏图标
    const isFavoriteIcon = (event.target as Element).closest('.favorite-icon')
    if (!isFavoriteIcon) {
      toggleRowSelection(row)
    }
  },
  // 设置行的自定义样式，控制高度
  style: {
    height: '32px',
    minHeight: '32px',
  },
})

// 表格列配置
const columns = computed<DataTableColumns<RowData>>(() => [
  {
    title: 'Name',
    key: 'name',
    width: 80,
    render(row) {
      const isFavorite = isRowFavorite.value(row.key)
      return h('div', { class: 'name-cell' }, [
        h(isFavorite ? StarFilled : StarOutlined, {
          class: 'favorite-icon',
          style: {
            marginRight: '6px',
            fontSize: '14px',
            color: isFavorite ? '#1890ff' : '#d9d9d9',
            cursor: 'pointer',
          },
          onClick: (e: MouseEvent) => {
            e.stopPropagation()
            toggleFavoriteState(row)
          },
        }),
        row.name,
      ])
    },
  },
  {
    title: 'Address',
    key: 'address',
  },
])

// 组件挂载时初始化数据
onMounted(() => {
  favoriteRowKeys.value = loadFavorites()
  checkedRowKeys.value = loadSelected()
  console.log('初始化完成 - 收藏状态:', favoriteRowKeys.value)
  console.log('初始化完成 - 选中状态:', checkedRowKeys.value)
})
</script>

<style scoped>
.table-container {
  width: 100%;
  padding: 16px;
  box-sizing: border-box;
}

/* 筛选控件容器样式 */
.filter-controls {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
  padding: 12px;
  background-color: #fafafa;
  border-radius: 6px;
  border: 1px solid #e8e8e8;
}

/* 搜索输入框样式 */
.search-input {
  width: 300px;
}

/* 收藏筛选开关样式 */
.favorite-filter {
  display: flex;
  align-items: center;
  gap: 8px;
}

.favorite-filter span {
  font-size: 14px;
  color: #333;
  white-space: nowrap;
}

.compact-table {
  width: 100%;
}

/* 自定义表格单元格样式，减小内边距 */
:deep(.n-data-table-td) {
  padding: 6px 12px !important;
  height: 32px;
  box-sizing: border-box;
}

/* 自定义表头单元格样式 */
:deep(.n-data-table-th) {
  padding: 8px 12px !important;
  height: 36px;
  box-sizing: border-box;
}

/* 自定义选中行的样式 */
:deep(.n-data-table-row--selected) {
  background-color: #e6f7ff !important;
  transition: background-color 0.2s;
  height: 32px !important;
}

/* 自定义行悬停样式 */
:deep(.n-data-table-row:hover:not(.n-data-table-row--selected)) {
  background-color: #f5f5f5 !important;
  transition: background-color 0.2s;
  height: 32px !important;
}

/* 名称单元格样式 */
.name-cell {
  display: flex;
  align-items: center;
  min-height: 20px;
  height: 100%;
}

/* 收藏图标样式 */
.favorite-icon {
  transition: all 0.2s ease;
}

.favorite-icon:hover {
  transform: scale(1.05);
  opacity: 0.8;
}
</style>
