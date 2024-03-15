<template>
    <div class="w-[15%] relative pt-[15%]">
        <!-- <div class="absolute top-0 left-0 bottom-0 right-0 bg-white rounded-full">
                +
            </div> -->
        <Button :circle="true" color="green" class="absolute top-0 left-0 bottom-0 right-0  h-[unset] text-4xl">+</Button>
    </div>
</template>

<script setup lang="ts">
import Button from "../../components/button/Button.vue";
</script>