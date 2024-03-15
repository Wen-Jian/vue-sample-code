<template>
    <FormWrapper>
        <component :is="SignUpForm" :isWeb3="isWeb3"></component>

        <div class="lg:max-w-[500px] lg:w-[50vw] mx-auto mt-[50px]">
            <Button color="light" @click="handleSignUpMethodSwitch">Sign Up With {{ isWeb3 ? 'Username' : 'Web3'
                }}</Button>
        </div>
    </FormWrapper>
</template>

<script setup lang="ts">
import { ref } from "vue";
import FormWrapper from "../FormWrapper.vue";
import Button from "../../../components/button/Button.vue";

const isWeb3 = ref<boolean>(false)

const handleSignUpMethodSwitch = () => {
    isWeb3.value = !isWeb3.value
}
</script>

<script lang="ts">
import SignUpForm from "./form/SignUpForm.vue";

export default {
    components: {
        SignUpForm
    }
}
</script>