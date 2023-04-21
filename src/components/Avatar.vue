<template>
  <img id="avatar" :src="avatarImg" />
</template>

<script setup>
import { defineProps } from 'vue'
defineProps({
  avatarSize: {
    default: '64px',
    type: String
  },
  avatarImg: {
    default: null
  }
})

</script>

<style lang="less" scoped>
#avatar {
  box-sizing: content-box;
  --normal: 1;
  --scale: 1.3;
  --outline: 4px;
  --offset: calc(
    (v-bind(avatarSize) / var(--normal) - v-bind(avatarSize)) / 2 -
      var(--outline)
  );
  transition: 0.5s;
  transform: scale(var(--normal));
  cursor: pointer;
  width: v-bind(avatarSize);
  height: v-bind(avatarSize);
  padding-top: 20px;
  outline: var(--outline) solid #aebcd3;
  outline-offset: var(--offset);
  border-radius: 0 0 999px 999px;
  background: radial-gradient(
      circle closest-side,
      transparent calc(99% - var(--outline)),
      #aebcd3 calc(100% - var(--outline)),
      #aebcd3 99%,
      transparent 100%
    )
    no-repeat top / calc(100% / var(--normal)) calc(100% + 20px);
  mask: linear-gradient(#000 0 0) no-repeat center calc(1px - var(--offset)) ~'/'
      calc(100% / var(--normal) - 11px) 50%,
    radial-gradient(circle closest-side, #000 99%, transparent) no-repeat top ~'/'
      calc(100% / var(--normal)) calc(100% + 20px);
}
#avatar:hover {
  --normal: var(--scale);
}
</style>
