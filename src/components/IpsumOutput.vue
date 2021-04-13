<template>
    <div class="output">
        <p v-for="(paragraph, index) in ipsumText" :key="`paragraph-${index}`">
            {{ paragraph }}
        </p>
    </div>

    <button type="button" @click="copyToClipboard">
        <span v-if='copiedToClipboard'>Copied!</span>
        <span v-else>Copy to Clipboard</span>
    </button>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'IpsumOutput',
    data: function(){
        return {
            copiedToClipboard: false
        }
    },
    computed: mapState(['ipsumText']),
    methods:{
        copyToClipboard: function(event){
            navigator.clipboard.writeText(this.ipsumText);
            this.copiedToClipboard = true;
            setTimeout(()=>{
                this.copiedToClipboard = false;
            }, 5000);
        }
    }
}
</script>

<style lang="scss" scoped>

    .output {
        background-color: #fff2ccff;
        color: black;
        padding: 15px;
    }

</style>