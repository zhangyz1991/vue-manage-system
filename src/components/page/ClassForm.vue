<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 班级
                </el-breadcrumb-item>
                <el-breadcrumb-item>增加班级</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="年级">
                        <el-select v-model="form.gradeId" placeholder="请选择">
                            <el-option
                                v-for="item in gradeList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="班级">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="班级人数">
                        <el-input v-model="form.size"></el-input>
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
import { fetchData as fetchGradeList } from '../../api/grade';
import { addData } from '../../api/class';
export default {
    name: 'classform',
    data() {
        return {
            query: {
                currentPage: 1,
                pageSize: 10000
            },
            gradeList: [],
            checkboxCourseList: [],
            form: {
                name: '',
                gradeId: '',
                size: ''
            }
        };
    },
    mounted() {
        this.getData();
    },
    methods: {
        getData() {
            fetchGradeList(this.query).then(res => {
                this.gradeList = res.data.records;
            });
        },
        onSubmit() {
            addData(this.form);
            this.$message.success('提交成功！');
        }
    }
};
</script>