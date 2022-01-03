<script setup lang="ts">
import {
  Layout,
  LayoutSider,
  LayoutHeader,
  LayoutContent,
  LayoutFooter,
} from 'ant-design-vue'

</script>

<template>
  <Layout class="layout">
    <LayoutSider class="layout-sider">
      <slot name="sider"/>
    </LayoutSider>
    <Layout :style="{ marginLeft: '200px' }">
      <LayoutHeader class="layout-header">
        <slot name="header"/>
      </LayoutHeader>
      <LayoutContent class="layout-content">
        <div>
          <slot name="content"/>
        </div>
      </LayoutContent>
      <LayoutFooter :style="{ textAlign: 'center' }">
        <slot name="footer">
          Ant Design ©2018 Created by Ant UED
        </slot>
      </LayoutFooter>
    </Layout>
  </Layout>
</template>

<style lang="less" scoped>
.layout {
  min-height: 100%;

  .layout-sider {
    overflow: auto;
    height: 100vh;
    position: fixed;
    left: 0;
    color: white;
  }

  .layout-header {
    background: #fff;
    padding: 0;
  }

  .layout-content {
    margin: 24px 16px 0;
    overflow: initial;

    > div {
      padding: 24px;
      background: #fff;
      text-align: center;
      min-height: 100%;
    }
  }
}
</style>
