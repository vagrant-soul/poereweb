<template>
  <div class="debug-info" v-if="false">
    调试: 数据行数={{ props.data?.length }}, 列数={{ displayColumns?.length }}
  </div>
  <div class="data-table-container">
    <!-- 控制区 -->
    <div class="control-panel" v-if="showControls">
      <!-- 搜索框 -->
      <n-input
        v-model:value="searchQuery"
        :placeholder="searchPlaceholder"
        class="search-input"
        clearable
        v-if="showSearch"
      >
        <template #prefix>
          <n-icon size="18">
            <SearchOutlined />
          </n-icon>
        </template>
      </n-input>

      <!-- 收藏开关 -->
      <n-space v-if="showFavorites">
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
      :columns="displayColumns"
      class="data-table"
      :row-class-name="rowClassName"
      :row-props="rowProps"
      pagination-position="none"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, h } from 'vue'
import { SearchOutlined, StarOutlined, StarFilled } from '@vicons/antd'
import { NInput, NIcon, NSpace, NSwitch, NBadge, NDataTable, type DataTableColumns } from 'naive-ui'

// 修复类型定义 - 使用正确的方式定义行属性类型
interface RowProps {
  style?: Record<string, string | number>
  onClick?: () => void
}

interface RenderRowParams {
  index: number
  data?: BaseTableItem
}

// 基础数据接口 - 优化键类型定义
interface BaseTableItem {
  id: number
  [key: string]: unknown
}

// 使用泛型提高类型安全性
interface Props<T extends BaseTableItem> {
  // 表格数据，从父组件传入
  data: T[]
  // 表格列配置，从父组件传入，可选
  columns?: DataTableColumns<T>
  // 用于标识行的唯一键，默认为'id'
  rowKey?: keyof T
  // 是否显示控制区域（搜索框和收藏开关）
  showControls?: boolean
  // 是否显示搜索框
  showSearch?: boolean
  // 是否显示收藏功能
  showFavorites?: boolean
  // 搜索框占位符
  searchPlaceholder?: string
  // 本地存储的键名，用于保存收藏状态
  favoritesStorageKey?: string
}

interface Emits<T> {
  // 行点击事件
  (e: 'row-click', row: T): void
  // 行选中事件（当选中状态改变时）
  (e: 'row-select', row: T | null): void
  // 收藏状态改变事件
  (e: 'favorite-change', favoriteIds: Set<number>): void
}

// 定义props和emits - 使用具体的泛型参数
const props = withDefaults(defineProps<Props<BaseTableItem>>(), {
  columns: undefined,
  rowKey: 'id',
  showControls: true,
  showSearch: true,
  showFavorites: true,
  searchPlaceholder: '搜索内容...',
  favoritesStorageKey: 'tableFavorites',
})

const emit = defineEmits<Emits<BaseTableItem>>()

// 状态管理 - 带类型注解
const searchQuery = ref<string>('')
const showOnlyFavorites = ref<boolean>(false)
const selectedRowKey = ref<string | number | null>(null)
const favoriteIds = ref<Set<number>>(new Set())

// 初始化：从localStorage加载收藏状态
onMounted(() => {
  if (props.showFavorites && props.favoritesStorageKey) {
    const savedFavorites = localStorage.getItem(props.favoritesStorageKey)
    if (savedFavorites) {
      try {
        const parsed = JSON.parse(savedFavorites) as number[]
        favoriteIds.value = new Set(parsed)
      } catch (e) {
        console.error('Failed to parse favorites from localStorage', e)
        localStorage.removeItem(props.favoritesStorageKey)
      }
    }
  }
})

// 保存收藏状态到localStorage
const saveFavorites = () => {
  if (props.showFavorites && props.favoritesStorageKey) {
    localStorage.setItem(props.favoritesStorageKey, JSON.stringify(Array.from(favoriteIds.value)))
    emit('favorite-change', favoriteIds.value)
  }
}

// 计算属性：过滤后的数据
const filteredData = computed<BaseTableItem[]>(() => {
  // 添加空值检查
  if (!props.data || !Array.isArray(props.data)) {
    return []
  }

  let result = [...props.data]

  // 搜索过滤
  if (props.showSearch && searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter((item) =>
      Object.values(item).some(
        (value) =>
          value !== null &&
          value !== undefined &&
          typeof value === 'string' &&
          value.toLowerCase().includes(query),
      ),
    )
  }

  // 收藏过滤
  if (props.showFavorites && showOnlyFavorites.value) {
    result = result.filter((item) => {
      const rowId = Number(item[props.rowKey])
      return !isNaN(rowId) && favoriteIds.value.has(rowId)
    })
  }

  return result
})

// 计算属性：收藏数量
const favoritesCount = computed<number>(() => {
  return favoriteIds.value.size
})

// 计算属性：显示的列配置
const displayColumns = computed<DataTableColumns<BaseTableItem>>(() => {
  if (props.columns) {
    // 修复类型检查问题
    const hasFavoriteColumn =
      Array.isArray(props.columns) &&
      props.columns.some((col) => 'key' in col && col.key === 'favorite')

    if (props.showFavorites && !hasFavoriteColumn) {
      // 如果需要显示收藏功能但没有收藏列，则添加收藏列
      return [
        {
          title: '收藏',
          key: 'favorite',
          width: 80,
          render(row: BaseTableItem) {
            const rowId = Number(row[props.rowKey])
            const isFavorite = !isNaN(rowId) && favoriteIds.value.has(rowId)
            return h(
              NIcon,
              {
                size: 18,
                class: isFavorite ? 'favorite-icon active' : 'favorite-icon',
                onClick: (e: MouseEvent) => {
                  e.stopPropagation()
                  if (!isNaN(rowId)) {
                    toggleFavorite(rowId)
                  }
                },
              },
              { default: () => h(isFavorite ? StarFilled : StarOutlined) },
            )
          },
        },
        ...props.columns,
      ]
    }
    return props.columns
  }

  // 如果没有提供列配置，使用默认配置
  return [
    {
      title: '收藏',
      key: 'favorite',
      width: 80,
      render(row: BaseTableItem) {
        const rowId = Number(row[props.rowKey])
        const isFavorite = !isNaN(rowId) && favoriteIds.value.has(rowId)
        return h(
          NIcon,
          {
            size: 18,
            class: isFavorite ? 'favorite-icon active' : 'favorite-icon',
            onClick: (e: MouseEvent) => {
              e.stopPropagation()
              if (!isNaN(rowId)) {
                toggleFavorite(rowId)
              }
            },
          },
          { default: () => h(isFavorite ? StarFilled : StarOutlined) },
        )
      },
    },
  ]
})

// 切换收藏状态
const toggleFavorite = (id: number) => {
  if (favoriteIds.value.has(id)) {
    favoriteIds.value.delete(id)
  } else {
    favoriteIds.value.add(id)
  }
  saveFavorites()
}

// 行属性配置 - 修复类型定义
const rowProps = (row: BaseTableItem): RowProps => {
  return {
    style: { cursor: 'pointer' },
    onClick: () => {
      handleRowClick(row)
    },
  }
}

// 处理行点击 - 修复类型错误
const handleRowClick = (row: BaseTableItem) => {
  console.log('ListTableNew内部: 行点击处理函数被调用', row)

  // 点击同一行取消选择，否则选中
  // 修复类型错误：需要将unknown类型转换为string | number
  const rowKeyValue = row[props.rowKey]

  // 进行类型断言和转换，确保类型安全
  let keyValue: string | number
  if (typeof rowKeyValue === 'string' || typeof rowKeyValue === 'number') {
    keyValue = rowKeyValue
  } else {
    // 如果类型不正确，使用字符串转换作为兜底
    keyValue = String(rowKeyValue)
  }

  // 现在可以安全地进行比较和赋值
  selectedRowKey.value = selectedRowKey.value === keyValue ? null : keyValue

  // 发送行点击事件
  emit('row-click', row)

  // 发送行选中事件
  emit('row-select', selectedRowKey.value === keyValue ? row : null)
}

// 使用自定义的RenderRowParams接口替代不存在的DataTableRenderRowParams
const rowClassName = ({ index, data }: RenderRowParams): string => {
  const classes: string[] = []
  // 斑马线条纹
  if (index % 2 === 1) {
    classes.push('zebra-row')
  }
  // 选中行高亮 - 增强空值检查
  if (data && selectedRowKey.value !== null) {
    const rowKeyValue = data[props.rowKey]
    // 安全比较行键值
    if (String(selectedRowKey.value) === String(rowKeyValue)) {
      classes.push('selected-row')
    }
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
.debug-info {
  background-color: #fff3cd;
  border: 1px solid #ffeaa7;
  padding: 8px;
  margin-bottom: 10px;
  border-radius: 4px;
  font-size: 12px;
}
</style>
