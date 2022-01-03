<script setup lang="ts">
import Layout from '@/components/layout/index.vue'
import SvgIcon from '@/components/svg-icon/index.vue'

</script>

<template>
  <Layout>
    <template #sider>
      <div class="components">
        <div
          v-for="j in 20"
          :key="j"
          class="component-item"
        >
          <SvgIcon name="component-input"/>
          <span class="component-name">这是什么组件</span>
        </div>
      </div>
    </template>
    <template #content/>
  </Layout>
</template>

<style lang="less">
.components {
  padding: 16px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  .component-item {
    display: inline-block;
    width: 70px;
    height: 70px;
    margin: 4px 0;
    text-align: center;
    color: #b3b9bf;

    .component-name {
      display: block;
      font-size: 12px;
    }
  }
}
</style>
