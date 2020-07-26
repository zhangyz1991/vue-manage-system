<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 成绩
                </el-breadcrumb-item>
                <el-breadcrumb-item>录入成绩</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <span style="margin-right: 10px;">选择测试</span>
            <el-select v-model="examId" placeholder="请选择" @change="val=>showTranscripts(val)">
                <el-option
                    v-for="item in examList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                ></el-option>
            </el-select>
            <el-button type="text" @click="generateTranscripts()">生成成绩单</el-button>
            <el-form ref="form" :model="form" label-width="80px">
                <el-table
                    v-if="form.scoreList && form.scoreList.length > 0"
                    :data="form.scoreList"
                    border
                    class="table"
                    header-cell-class-name="table-header"
                    style="margin:0px; padding:0px;"
                >
                    <el-table-column prop="userName" label="用户姓名"></el-table-column>
                    <el-table-column
                        v-for="(item, index) in examCourseList"
                        :key="index"
                        :label="item.name"
                    >
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.scoreDetailList[index].score"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="测试总分" width="100px">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.totalScore"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="班级排名" width="100px">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.classRanking"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="年级排名" width="100px">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.gradeRanking"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="180" align="center">
                        <template slot-scope="scope">
                            <el-button
                                type="text"
                                icon="el-icon-edit"
                                @click="onSubmit(scope.$index, scope.row)"
                            >录入</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form>
        </div>
        <div class="pagination">
            <el-pagination
                background
                layout="total, prev, pager, next"
                :current-page="query.currentPage"
                :page-size="query.pageSize"
                :total="pageTotal"
                @current-change="handlePageChange"
            ></el-pagination>
        </div>
    </div>
</template>

<script>
import { fetchData as fetchExamList } from '../../api/exam';
import { fetchExamCourseListData as fetchExamCourseList } from '../../api/course';
import { updateData, prepareData, fetchData } from '../../api/score';
export default {
    name: 'scoreform',
    data() {
        return {
            query: {
                currentPage: 1,
                pageSize: 10,
                examId: ''
            },
            pageTotal: 0,
            examList: [],
            examCourseList: [],
            examId: '',
            form: {
                scoreList: [
                    /* {
                        id: '',
                        examId: '',
                        userId: '',
                        userName: '',
                        totalScore: '',
                        classRanking: '',
                        gradeRanking: '',
                        scoreDetailList: [
                            {
                                scoreId: '',
                                courseId: '',
                                courseCode: '',
                                courseNmae: '',
                                score: ''
                            }
                        ]
                    } */
                ]
            }
        };
    },
    mounted() {
        this.getData();
    },
    methods: {
        getData() {
            var query = {
                currentPage: 1,
                pageSize: 10000
            };
            fetchExamList(query).then(res => {
                this.examList = res.data.records;
            });
        },
        onSubmit(index, row) {
            updateData(row);
            this.$message.success('提交成功！');
        },
        generateTranscripts() {
            if (!this.examId) {
                return;
            }
            prepareData(this.examId).then(res => {
                if(res.code == 0) {
                    this.getTranscripts(this.examId);
                }
            });
        },
        showTranscripts(examId) {
            fetchExamCourseList(examId).then(res => {
                this.examCourseList = res.data;
            });
            this.getTranscripts(examId);
        },
        getTranscripts(examId) {
            this.query.examId = examId;
            fetchData(this.query).then(res => {
                if(!res.data) {
                    this.form.scoreList = [];
                    this.pageTotal = 0;
                    this.query.currentPage = 1;
                } else {
                    this.form.scoreList = res.data.records;
                    this.pageTotal = res.data.pages;
                }
            });
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'currentPage', val);
            this.getTranscripts(this.examId);
        }
    }
};
</script>