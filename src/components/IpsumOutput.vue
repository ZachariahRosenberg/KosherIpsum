<template>
    <div class="output">
        <p v-for="(paragraph, index) in ipsumText" :key="`paragraph-${index}`">
            {{ paragraph }}
        </p>
    </div>

    <button type="button">
        <span>Copy to Clipboard</span>
    </button>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'IpsumOutput',

    computed: mapState(['ipsumText'])
}
</script>

<style lang="scss" scoped>

    .output {
        background-color: #fff2ccff;
        color: black;
        padding: 15px;
    }

</style>