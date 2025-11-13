<template>
  <n-card style="border-radius: 8px" size="small">
    <n-flex class="result-container" justify="space-between" align="stretch">
      <!-- 左侧文字内容组件 -->
      <div class="content-area">
        <n-flex align="start">
          <n-image
            preview-disabled
            width="50"
            src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
            class="image-avatar"
          />
          <div style="flex: 1">
            <div class="header-text">
              {{ displayText }}
            </div>
            <n-flex justify="flex-end" align="center">
              <div class="char-count">字符长度:20/150</div>
            </n-flex>
          </div>
        </n-flex>
      </div>
      <!-- 右侧按钮组 -->
      <n-flex
        class="buttons-container"
        vertical
        gap="12px"
        style="min-height: 60px; justify-content: center"
      >
        <!-- 上方较大的查询按钮 -->
        <n-button type="primary" block size="large">
          <template #icon>
            <n-icon>
              <Search />
            </n-icon>
          </template>
          POE 正则生成
        </n-button>

        <!-- 下方两个并排的按钮 -->
        <n-flex class="bottom-buttons">
          <n-button type="error" style="min-width: 100px" @click="handleReset">
            <template #icon>
              <n-icon>
                <Reload />
              </n-icon>
            </template>
            重置
          </n-button>
          <n-tooltip placement="bottom" trigger="hover">
            <template #trigger>
              <n-button type="warning" style="min-width: 100px" disabled>
                <template #icon>
                  <n-icon>
                    <Star />
                  </n-icon>
                </template>
                收藏
              </n-button>
            </template>
            <span>功能待开发</span>
          </n-tooltip>
        </n-flex>
      </n-flex>
    </n-flex>
  </n-card>
</template>

<script setup lang="ts">
import { Reload, Search, Star } from '@vicons/ionicons5'
// 只接收显示文本，不包含业务逻辑
const { displayText } = defineProps<{
  displayText: string[] | string
}>()
// 定义事件
const emit = defineEmits<{
  reset: []
}>()
// 处理重置按钮点击
const handleReset = () => {
  // 发出重置事件
  emit('reset')
}
</script>

<style scoped>
.result-container {
  width: 100%;
  gap: 16px;
  box-sizing: border-box;
}

.content-area {
  flex: 1;
  min-height: 80px; /* 增加最小高度 */
  padding: 12px;
  border: 1px solid var(--n-border-color);
  border-radius: 6px; /* 添加圆角 */
}

.header-text {
  word-break: break-word; /* 处理长文本换行 */
  margin-bottom: 8px;
}
.image-avatar {
  margin-right: 1px;
}

.char-count {
  color: red;
  padding-right: 10px;
}
/* 优化按钮容器样式 */
.buttons-container {
  width: auto;
  min-width: 200px; /* 稍微增加最小宽度 */
}
/* 增加动画效果 */
.content-area,
.buttons-container button {
  transition: all 0.3s ease;
}

.content-area:hover {
  border-color: var(--n-primary-color);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}
/* 响应式设计优化 */
@media (max-width: 768px) {
  .result-container {
    flex-direction: column;
  }

  .content-area {
    margin-bottom: 16px;
  }
}
/* 平板设备 */
@media (max-width: 992px) {
  .buttons-container {
    min-width: 200px;
  }

  .bottom-buttons button {
    min-width: 90px;
  }
}

/* 移动设备横屏 */
@media (max-width: 640px) {
  .result-container {
    flex-direction: column;
    gap: 12px;
  }

  .buttons-container {
    min-width: 100%;
  }
}
</style>
