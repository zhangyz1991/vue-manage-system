<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 科目
                </el-breadcrumb-item>
                <el-breadcrumb-item>增加科目</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="科目编码">
                        <el-input v-model="form.code"></el-input>
                    </el-form-item>
                    <el-form-item label="科目名称">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">表单提交</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import { addData } from '../../api/course';
export default {
    name: 'baseform',
    data() {
        return {
            form: {
                code: '',
                name: ''
            }
        };
    },
    methods: {
        onSubmit() {
            addData(this.form);
            this.$message.success('提交成功！');
        }
    }
};
</script>