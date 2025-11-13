<template>
  <n-card style="border-radius: 8px" content-style="padding: 0;">
    <n-flex class="result-container" justify="space-between" align="stretch">
      <!-- 左侧文字内容组件 -->
      <n-thing class="content-area">
        <template #avatar>
          <n-image
            preview-disabled
            width="50"
            src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
          />
        </template>
        <template #header>
          <n-flex align="center">
            <span>
              这里会有很多的内容到下面里会有很多的内容到下面这里会有很多这里会有很多的内容到下面这里会有很多的内容到下面这里会有很多的内容到下面这里会有很多的内容到下面这里会有很多的内容到下面
            </span>
          </n-flex>
        </template>
        <template #description>
          <n-flex justify="flex-end" align="center">
            <div :style="{ color: 'red', paddingRight: '10px' }">字符长度:20/150</div>
          </n-flex>
        </template>
      </n-thing>
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
          <n-button type="error" style="min-width: 100px">
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
</script>

<style scoped>
/* 主容器样式 */
.result-container {
  width: 100%;
  padding: 16px;
  gap: 16px;
  box-sizing: border-box;
}
.content-area {
  flex: 1;
  min-height: 60px;
  padding: 16px;
  border: 1px solid var(--n-border-color); /* 浅色模式默认回退颜色 */
  /* border-color: var(--n-border-color); CSS变量会覆盖回退颜色 */
  /* border-radius: 6px; 适当的圆角 */
}

/* 右侧按钮容器 */
.buttons-container {
  width: auto; /* 修改为auto，允许容器根据内容调整宽度 */
  min-width: 200px; /* 设置最小宽度以容纳两个按钮 */
}

.bottom-buttons {
  gap: 8px; /* 在容器上设置间距，而不是在按钮上 */
}
/* 响应式调整 */
@media (max-width: 768px) {
  .result-container {
    flex-direction: column;
  }

  .buttons-container {
    width: 100%;
  }
}
</style>
