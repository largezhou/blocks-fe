<script setup lang="ts">
import BLayout from '@/components/layout/BLayout.vue'
import BSvgIcon from '@/components/svg-icon/BSvgIcon.vue'
</script>

<template>
  <BLayout>
    <template #sider>
      <div class="b-components">
        <div
          v-for="j in 20"
          :key="j"
          class="b-component-item"
        >
          <BSvgIcon name="component-input"/>
          <span class="b-component-name">这是什么组件</span>
        </div>
      </div>
    </template>
    <template #content/>
  </BLayout>
</template>

<style lang="less">
.b-components {
  padding: 16px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  .b-component-item {
    display: inline-block;
    width: 70px;
    height: 70px;
    margin: 4px 0;
    text-align: center;
    color: #b3b9bf;

    &:hover {
      color: #fff;
    }

    svg {
      font-size: 25px;
    }

    .b-component-name {
      display: block;
    }
  }
}
</style>
