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
  <Layout class="b-layout">
    <LayoutSider class="b-layout-sider">
      <slot name="sider"/>
    </LayoutSider>
    <Layout :style="{ marginLeft: '200px' }">
      <LayoutHeader class="b-layout-header">
        <slot name="header"/>
      </LayoutHeader>
      <LayoutContent class="b-layout-content">
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

<style lang="less">
.b-layout {
  min-height: 100% !important;

  .layout-sider {
    overflow: auto;
    height: 100vh;
    position: fixed;
    left: 0;
    color: white;
  }

  .b-layout-header {
    background: #fff;
    padding: 0;
  }

  .b-layout-content {
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
