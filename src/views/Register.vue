<template>
    <div class="register">
        <h2>注册系统</h2>
        <p><label>用户名：</label><input type="text" v-model="username"/>
            <span v-show="showErr1" class="error">用户名已存在</span></p>
        <p><button @click="check">检查用户名是否存在</button>
        </p>
        密码：<input type="text" v-model="pass"/>
            <span v-show="showErr2" class="error">用户密码需要为6-16位字符</span></p>
        再输入一次密码：<input type="text" v-model="passagain"/>
            <span v-show="showErr3" class="error">两次密码输入不一致</span></p>
        <button @click="doRegister">注册</button>
        <button @click="reset">重置</button>
    </div>
</template>

<script scoped>
    import axios from 'axios'
    export default {
        name: "register",
        data() {
            return {
                username: '',
                pass: '',
                passagain: '',
                showErr1: false,
                showErr2: false,
                showErr3: false
            }
        },
        methods: {
            reset:function () {
                this.username = '';
                this.pass = '';
                this.passagain = '';
            },
            doRegister() {
                if(!this.showErr1 && !this.showErr2 && !this.showErr3) {
                    var _this = this;
                    var user = new URLSearchParams();
                    user.append('username', this.username);
                    user.append('name', this.username);
                    user.append('password', this.pass);
                    axios.post('http://localhost:8888/user/register', user).then(function(res) {
                        if(res.data) {
                            alert('注册成功');
                            _this.$router.push('/login');
                        }
                    })
                }
            },
            check:function () {
                var _this = this;
                if(this.username != "") {
                    axios.get('http://localhost:8888/user/QueryAllUserByExample',{params:{username:this.username}}).then(function (res) {
                        console.log(res);
                        if(res.data.length) {
                            _this.showErr1 = true;
                        }else{
                            _this.showErr1 = false;
                        }
                    })
                }
            }
        },
        watch: {
            pass() {
                var reg = /^\w{6,16}$/;
                if(!reg.test(this.pass)) {
                    this.showErr2 = true;
                }else{
                    this.showErr2 = false;
                }
            },
            passagain() {
                if(this.pass === this.passagain) {
                    this.showErr3 = false;
                }else{
                    this.showErr3 = true;
                }
            }
        }
    }
</script>

<style scoped>

</style>