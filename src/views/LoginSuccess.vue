<template>
    <div class="loginSuccess">
        <h1>恭喜你成功登录</h1>
        <p>欢迎您：{{this.$route.query.username}}</p>
        <p>您的密码是：{{this.$route.query.password}}</p>
    </div>
</template>

<script scoped>
    export default {
        name: "loginSuccess",
        data() {
            return {
            }
        },
        methods: {}
    }
</script>

<style scoped>
    .loginSuccess {
        font-size: larger;
        color: darkred;
    }

</style>