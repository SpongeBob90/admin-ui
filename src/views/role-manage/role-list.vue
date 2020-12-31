<template>
  <div id="role-manage" class="common-root" :style="{minHeight: minHeight + 'px'}">
    <!-- 条件筛选查询 -->
    <div class="select-container">

    </div>
    <!-- 角色列表 -->
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
      this.minHeight = window.innerHeight - 92
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../styles/list";
</style>
