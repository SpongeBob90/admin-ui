nom<template>
  <div id="subsys-manage" class="common-root" :style="{minHeight: minHeight + 'px'}">
    <!-- 条件筛选查询 -->
    <div class="select-container">
      <el-col :span="20">
        子系统名称：
        <el-input class="search" v-model="keyWords" placeholder="请输入子系统名称" size="mini"></el-input>
        <i class="icon-search iconfont" @click="getSubSysList"></i>
      </el-col>
      <el-col :span="4" class="fr">
        <el-button type="primary" size="mini" style="border:none" icon="el-icon-plus" @click="handleAdd">新增子系统</el-button>
      </el-col>
    </div>
    <!-- 子系统列表 -->
    <div class="table-container">
      <template>
        <el-table ref="table" @selection-change="handleSelectionChange" :data="tableData">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <span class="spanBtn">
                <el-tooltip class="item" effect="dark" content="编辑" placement="top">
                  <em class="el-icon-edit" @click="handleEdit(scope.row.orgId)"></em>
                </el-tooltip>
              </span>
              <span class="spanBtn">
                <el-tooltip class="item" effect="dark" content="删除" placement="top">
                  <em class="el-icon-delete" @click="handleDelete(scope.row.orgId)"></em>
                </el-tooltip>
              </span>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <div class="paging fr">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.pageIndex"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="page.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total"
          v-if="page.total"
        ></el-pagination>
      </div>
    </div>

    <edit-subsys-model ref="EditSubSysModel" @refreshTable="getSubSysList"></edit-subsys-model>
  </div>
</template>

<script>
  import EditSubSysModel from './module/edit-subsys-model'

  export default {
    components: {
      EditSubSysModel
    },
    data() {
      return {
        minHeight: null,
        keyWords: "",
        tableData: [],
        page: {
          pageIndex: 1,
          pageSize: 10,
          total: 0
        }
      }
    },
    methods: {
      getSubSysList() {

      },
      handleAdd() {

      },
      handleEdit() {

      },
      handleDelete() {

      },
      handleSelectionChange() {

      },
      handleSizeChange() {

      },
      handleCurrentChange() {

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
