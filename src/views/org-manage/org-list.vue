<template>
  <div id="org-manage" class="common-root" :style="{minHeight: minHeight + 'px'}">
    <!-- 条件筛选查询 -->
    <div class="select-container">
      <el-col :span="20">
        机构名称：
        <el-input class="search" v-model="keyWords" placeholder="请输入机构名称" size="mini"></el-input>
        <i class="icon-search iconfont" @click="getOrgList"></i>
      </el-col>
      <el-col :span="4" class="fr">
        <el-button type="primary" size="mini" style="border:none" icon="el-icon-plus" @click="handleAdd">新增机构</el-button>
      </el-col>
    </div>
    <!-- 机构列表 -->
    <div class="table-container">
      <template>
        <el-table ref="table" @selection-change="handleSelectionChange" :data="tableData">
          <el-table-column type="selection" width="55"></el-table-column>
          <!--<el-table-column prop="name" label="机构名称">
            <template slot-scope="scope">
              <el-tooltip :content="scope.row.name" placement="top" effect="dark">
                <span>{{scope.row.name && scope.row.name.length > 10 ? scope.row.name.substr(0,9)+"..." : scope.row.name}}</span>
              </el-tooltip>
            </template>
          </el-table-column>-->
          <el-table-column prop="orgCode" label="机构Code">
            <template slot-scope="scope">
              <span>{{scope.row.orgCode}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="fullName" label="名称">
            <template slot-scope="scope">
              <span>{{scope.row.fullName}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="shortName" label="简称">
            <template slot-scope="scope">
              <span>{{scope.row.shortName}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="manager" label="负责人">
            <template slot-scope="scope">
              <span>{{scope.row.manager}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="resourceCount" label="资源计数">
            <template slot-scope="scope">
              <span>{{scope.row.resourceCount}}</span>
            </template>
          </el-table-column>
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

    <edit-org-model ref="EditOrgModel" @refreshTable="getOrgList"></edit-org-model>
  </div>
</template>

<script>
  import { getOrgList, deleteOrg } from '../../api/api'
  import EditOrgModel from './module/edit-org-model'

  export default {
    components: {
      EditOrgModel
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
      };
    },
    methods: {
      handleDelete(id) {
        deleteOrg(id)
          .then(res => {
            if (1 === res.code) {
              this.$message.error("删除失败！");
            } else {
              this.getOrgList();
              this.$message.success("删除成功！");
            }
          })
      },
      handleEdit(id) {
        this.$refs.EditOrgModel.show(id);
      },
      handleAdd() {
        this.$refs.EditOrgModel.show();
      },
      getOrgList() {
        getOrgList({
          keyWords: this.keyWords,
          pageSize: this.page.pageSize,
          pageIndex: this.page.pageIndex
        }).then(res => {
          this.tableData = res.list;
          this.page.total = res.total;
        })
      },
      handleSelectionChange() {

      },
      handleSizeChange(val) {
        this.page.pageSize = val;
        this.getOrgList();
      },
      handleCurrentChange(val) {
        this.page.pageIndex = val;
        this.getOrgList();
      }
    },
    created(){
      this.minHeight = window.innerHeight - 95;
    },
    mounted() {
      this.getOrgList();
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../styles/org-manage/index.scss";
</style>
