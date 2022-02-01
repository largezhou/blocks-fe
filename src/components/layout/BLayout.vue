<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BLayout',
})
</script>

<template>
  <a-layout class="b-layout">
    <a-layout-sider class="b-layout-sider">
      <slot name="sider"/>
    </a-layout-sider>
    <a-layout :style="{ marginLeft: '200px' }">
      <a-layout-header class="b-layout-header">
        <slot name="header"/>
      </a-layout-header>
      <a-layout-content class="b-layout-content">
        <div class="b-layout-content-inner">
          <slot name="content"/>
        </div>
      </a-layout-content>
      <a-layout-footer :style="{ textAlign: 'center' }">
        <slot name="footer">
          Ant Design ©2018 Created by Ant UED
        </slot>
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<style lang="less">
.b-layout {
  min-height: 100% !important;

  .b-layout-sider {
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
  }

  .b-layout-content-inner {
    padding: 24px;
    background: #fff;
    min-height: 100%;
  }
}
</style>
