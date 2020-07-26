<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 年级
                </el-breadcrumb-item>
                <el-breadcrumb-item>添加年级</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="年级Code">
                        <el-input v-model="form.code"></el-input>
                    </el-form-item>
                    <el-form-item label="学年">
                        <el-input v-model="form.year"></el-input>
                    </el-form-item>
                    <el-form-item label="年级">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="起止年月">
                        <el-col :span="11">
                            <el-date-picker
                                type="date"
                                placeholder="起始年月"
                                v-model="form.startDate"
                                value-format="yyyy-MM-dd"
                                style="width: 100%;"
                            ></el-date-picker>
                        </el-col>
                        <el-col class="line" :span="2">-</el-col>
                        <el-col :span="11">
                            <el-date-picker
                                type="date"
                                placeholder="期终年月"
                                v-model="form.endDate"
                                value-format="yyyy-MM-dd"
                                style="width: 100%;"
                            ></el-date-picker>
                        </el-col>
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
import { addData } from '../../api/grade';
export default {
    name: 'gradeform',
    data() {
        return {
            form: {
                code: '',
                year: '',
                name: '',
                startDate: '',
                endDate: ''
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