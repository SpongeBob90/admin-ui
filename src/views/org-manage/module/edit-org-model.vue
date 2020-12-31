<template>
  <el-dialog
    :title="('add' === type ? '新增' : '编辑') + '机构'"
    :visible.sync="addVisible"
    :close-on-click-modal="false"
    width="36rem"
    class="appDialog add-source"
    @close="handleCancel"
  >
    <div class="app-content">
      <template>
        <el-form ref="formData" label-width="5rem" :model="formData" :rules="addRule">
          <el-form-item label="机构Code" prop="type">
            <el-input placeholder="请输入机构Code" size="mini" v-model="formData.orgCode"></el-input>
          </el-form-item>
          <el-form-item label="机构名称" prop="name">
            <el-input placeholder="请输入机构名称" size="mini" v-model="formData.fullName"></el-input>
          </el-form-item>
          <el-form-item label="机构简称" prop="name">
            <el-input placeholder="请输入机构简称" size="mini" v-model="formData.shortName"></el-input>
          </el-form-item>
          <el-form-item label="负责人" prop="name">
            <el-input placeholder="请选择负责人" size="mini" v-model="formData.manager"></el-input>
          </el-form-item>
          <el-form-item label="资源数" prop="name">
            <el-input-number placeholder="请输入资源数" size="mini" v-model="formData.resourceCount"></el-input-number>
          </el-form-item>
        </el-form>
      </template>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click="handleAdd">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import { addOrg, getOrgDetail, editOrg } from '../../../api/api'

  export default {
    data() {
      return {
        type: "add",
        addVisible: false,
        formData: {
          orgCode: "",
          fullName: "",
          subSysIds: []
        },
        addRule: {
          orgCode: [
            {required: true, message: '请输入机构Code', trigger: 'change'}
          ]
        }
      }
    },
    methods: {
      handleCancel() {
        this.addVisible = false;
      },
      handleAdd() {
        if ('add' === this.type) {
          addOrg(this.formData).then(res => {
            if (1 === res.code) {
              this.$message.error("新增失败！");
            } else {
              this.$message.success("新增成功！");
              this.addVisible = false;
              this.$emit('refreshTable');
            }
          });
        } else if ('edit' === this.type) {
          editOrg(this.formData).then(res => {
            if (1 === res.code) {
              this.$message.error("编辑失败！");
            } else {
              this.$message.success("编辑成功！");
              this.addVisible = false;
              this.$emit('refreshTable');
            }
          });
        }
      },
      show(id) {
        if (id) {
          this.type = "edit";
          getOrgDetail(id)
            .then(res => {
              this.formData = res;
            });
        } else {
          this.type = "add";
          this.formData = {
            orgCode: "",
            fullName: "",
            subSysIds: []
          };
        }
        this.addVisible = true;
      }
    }
  }
</script>

<style scoped>

</style>
