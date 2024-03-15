<template>
    <div class="mt-[10px]">
        <Button @click="handleSignUp" color="green">Sign Up</Button>
    </div>
</template>

<script setup lang="ts">
import Button from "../../components/button/Button.vue";
const handleSignUp = () => {
    window.open('https://demo-chat.auth.ap-northeast-1.amazoncognito.com/signup?client_id=o6gu611lpduttu70gmdc3dvpn&response_type=code&scope=email+openid+phone&redirect_uri=https%3A%2F%2Fplayground-bafp.onrender.com%2Fchat%2Flogin', '_blank');
}
</script>