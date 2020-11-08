<template>
    <div>
        <h3>欢迎您：{{currentUser}}</h3>
        <table cellspacing="0" cellpadding="0" border="1">
            <thead>
            <tr>
                <th v-for="(item,index) in list[0]">{{index}}</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,index) in showList" :key="index" :class="{'red':currentUser == item.username}">
                <td>{{item.id}}</td>
                <td>{{item.name}}</td>
                <td>{{item.username}}</td>
                <td>{{item.password}}</td>
                <td>{{item.createTime}}</td>
                <td>{{item.updateTime}}</td>
                <td><button @click="doDelete(index)" :disabled="currentUser == item.username">删除</button></td>
            </tr>
            </tbody>
        </table>
        <!--<Page :total="this.list.length" />-->
        <Page :total="this.list.length" show-sizer show-elevator :page-size-opts="[2,4,8]"
              :page-size="pagesize" @on-change="pageChange" @on-page-size-change="pagesizeChange" />
    </div>

</template>

<script scoped>
    import axios from 'axios'
    import Page from "view-design/src/components/page/page";
    export default {
        components: {Page},
        beforeRouteEnter(to, from , next) {
            next((vm) => {
                if((!vm.$cookies.isKey('username')) && (!vm.$route.query.username)) {
                    vm.$router.push('/login');
                }
            });
        },
        name: "userlist",
        data() {
            return {
                list:[],
                showList:[],
                current:1,
                pagesize:2
            }
        },
        methods: {
            getUserList() {
                axios.get("http://localhost:8888/user/QueryAllUser").then((res)=>{
                    this.list = res.data;
                    // console.log(this.list.length);
                    this.getShowList();
                })
            },
            doDelete(index) {
                var _this = this;
                if(confirm('你确认要删除吗?')) {
                    var id = this.list[index].id;
                    var username = this.list[index].username;
                    axios.get("http://localhost:8888/user/deleteById",{params:{id:id}}).then((res)=>{
                        if(res.data == '删除成功') {
                            // console.log(res);
                            alert('删除成功');
                            _this.list.splice(index, 1);
                        }
                    })
                }
            },
            getShowList() {
                var start =  (this.current - 1) * this.pagesize;
                var end = this.current * this.pagesize;
                this.showList = this.list.slice(start, end);
            },
            pageChange(val) {
                this.current = val;
                this.getShowList();
            },
            pagesizeChange(val) {
                this.pagesize = val;
                this.getShowList();
            }
        },
        mounted(){
            this.getUserList();
        },
        computed:{
            currentUser(){
                var cur = '';
                if(this.$route.query.username != undefined) {
                    cur = this.$route.query.username;
                }else{
                    // console.log("qqqqq");
                    cur = this.$cookies.get('username');
                    console.log(cur);
                }
                return cur;
            }
        }
    }
</script>

<style scoped>
    .red{
        color: red;
    }
    >>>.ivu-page-item-active{background: #a350a3; border: none;}
    >>>.ivu-page-item-active a{color: #fff;}
    >>>.ivu-page-item-active:hover{background: #fff; border:1px solid #a350a3;}
    >>>.ivu-page-item-active:hover a{color: #a350a3;}
</style>