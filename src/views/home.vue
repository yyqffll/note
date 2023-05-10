<template>
  <div id="home">
    <header class="navbar">
      <b class="navbar__title">学习笔记</b>
      <Switch
        class="navbar__switch"
        v-model="theme"
        :class="{'navbar__switch': true, 'navbar__switch__taiyang': !theme, 'navbar__switch__yueliang': theme}"
        @on-change="changeTheme"
      >
        <template #close>
          <Icon type="taiyang" />
        </template>
        <template #open>
          <Icon type="yueliang" />
        </template>
      </Switch>
    </header>
  </div>
</template>

<script setup name="home">
import Icon from '@/components/Icon/index.vue'
import { ref } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const theme = ref(store.state.theme === 'dark' ? true : false)
const changeTheme = () => {
  store.commit('setTheme', theme.value ? 'dark' : 'light')
}

</script>

<style lang="less" scoped>
#home {
  background: var(--theme);
  height: 100%;
  .navbar {
    position: fixed;
    width: 100%;
    height: 60px;
    min-height: 60px;
    box-shadow: 0 1px 2px 0 var(--navbar-box-shadow);
    padding: 8px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .navbar__title {
      font-size: @font-size-18;
      color: var(--theme-color);
    }
    .navbar__switch {
      background: #4d4d4d;
      /deep/.ivu-switch-inner {
        svg {
          flex-shrink: 0;
        }
      }
    }
    .navbar__switch__taiyang {
      /deep/.ivu-switch-inner {
        right: 4px;
      }
    }
    .navbar__switch__yueliang {
      /deep/.ivu-switch-inner {
        left: 4px;
      }
    }
  }
}
</style>
