<template>
  <div id="user-manage" class="common-root" :style="{minHeight: minHeight + 'px'}">
    <!-- 条件筛选查询 -->
    <div class="select-container">

    </div>
    <!-- 用户列表 -->
    <div class="table-container">

    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        minHeight: null
      }
    },
    created() {
      this.minHeight = window.innerHeight - 92;
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../styles/list";
</style>
