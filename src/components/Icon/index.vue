<template>
  <svg class="icon" aria-hidden="true">
    <use :xlink:href="`#icon-${type}`" />
  </svg>
</template>

<script setup name="Icon">
import './iconfont'
import { defineProps } from 'vue'
defineProps({
  type: {
    default: '',
    type: String
  },
  size: {
    default: '18px',
    type: String
  }
})
</script>

<style type="text/css">
.icon {
  width: v-bind(size);
  height: v-bind(size);
  fill: currentColor;
  overflow: hidden;
}
</style>
