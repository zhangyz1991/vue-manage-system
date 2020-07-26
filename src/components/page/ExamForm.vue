<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 测试
                </el-breadcrumb-item>
                <el-breadcrumb-item>举行测试</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="测试">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
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
                    <el-form-item label="测试日期">
                        <el-col :span="11">
                            <el-date-picker
                                type="date"
                                placeholder="选择日期"
                                v-model="form.date"
                                value-format="yyyy-MM-dd"
                                style="width: 100%;"
                            ></el-date-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="测试科目">
                        <el-checkbox-group v-model="checkboxCourseList">
                            <el-checkbox
                                v-for="item in courseList"
                                :key="item.id"
                                :label="item.id"
                                @change="checked =>addOrRemoveExamCourseInfo(checked, item)"
                            >{{item.name}}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <div v-for="item in form.examCourseList" :key="item.courseId">
                        <el-form-item v-if="item.courseId !== ''" :label="item.courseName+'分制'">
                            <el-input v-model="item.pointScale"></el-input>
                        </el-form-item>
                    </div>
                    <el-form-item label="测试总分">
                        <el-input v-model="form.fullMarks"></el-input>
                    </el-form-item>
                    <el-form-item label="班级人数">
                        <el-input v-model="form.classSize"></el-input>
                    </el-form-item>
                    <el-form-item label="年级人数">
                        <el-input v-model="form.gradeSize"></el-input>
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
import { fetchData as fetchCourseList } from '../../api/course';
import { addData } from '../../api/exam';
export default {
    name: 'examform',
    data() {
        return {
            query: {
                currentPage: 1,
                pageSize: 10000
            },
            gradeList: [],
            courseList: [],
            checkboxCourseList: [],
            form: {
                name: '',
                gradeId: '',
                date: '',
                examCourseList: [
                    {
                        courseId: '',
                        courseName: '',
                        pointScale: ''
                    }
                ],
                fullMarks: '',
                classSize: '',
                gradeSize: ''
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
            fetchCourseList(this.query).then(res => {
                this.courseList = res.data.records;
            });
        },
        onSubmit() {
            addData(this.form);
            this.$message.success('提交成功！');
        },
        addOrRemoveExamCourseInfo(checked, item) {
            if (checked) {
                this.addExamCourseInfo(item.id, item.name);
            } else {
                this.revemoExamCourseInfo(item.id);
            }
        },
        addExamCourseInfo(courseId, courseName) {
            if(this.form.examCourseList.length ==1 && this.form.examCourseList[0].courseId == ''){
                this.form.examCourseList.pop();
            }
            this.form.examCourseList.push({
                courseId: courseId,
                courseName: courseName
            });
        },
        revemoExamCourseInfo(courseId) {
            var index = this.form.examCourseList.findIndex(item => item.courseId == courseId);
            if(index != -1) {
                this.form.examCourseList.splice(index, 1);
            }
        }
    }
};
</script>