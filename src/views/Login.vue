<template>
    <div class="login">
        <h2>登录系统</h2>
       用户名<input type="text" v-model="username"/></p>
       密码：<input type="text" v-model="password"/></p>
        <p>
            <input type="checkbox" id="save" v-model="save"><label for="save">用户名密码保留一天</label>
            <br><br>
            <button @click="login">登录</button>
            <button @click="reset">重置</button>
        </p>
    </div>
</template>

<script scoped>
    import axios from 'axios'
    export default {
        name: "login",
        data() {
            return {
                username:'',
                password:'',
                save: false
            }
        },
        methods: {
            reset:function () {
                this.username = '';
                this.password = '';
            },
            login:function () {
                var _this = this;
                var user = new URLSearchParams();
                user.append('username', this.username);
                user.append('password', this.password);
                axios.post('http://localhost:8888/user/login', user).then(function(res) {
                    console.log(res);
                    if(res.data === '登录成功') {
                        alert('登录成功');
                        if(_this.save) {
                            _this.$cookies.set('username', _this.username,'1d');
                            _this.$cookies.set('password', _this.password,'1d');
                        }
                        _this.$router.push('/userlist?username=' + _this.username);
                    }else{
                        alert('登录失败');
                        _this.reset();
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>

