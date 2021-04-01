<template>
    <div class='options'>
        <div class='row'>
            <input type="number" id="quantity" name="quantity" min="1" max="5" />
            <p>Paragraphs</p>
        </div>
        <div class='row'>
            <input type="radio" id="radioLong" />
            <p>Long</p>
            <input type="radio" id="radioMedium" />
            <p>Medium</p>
            <input type="radio" id="radioShort" />
            <p>Short</p>
        </div>
        <div class='row'>
            <input type="checkbox" id='checkOne' />
            <p>This is option "one"</p>
        </div>
        <div class='row'>
            <input type="checkbox" id='checkTwo' />
            <p>This is option "two"</p>
        </div>
    </div>

    <button type="button" @click="setOutputText">
        <span>Generate</span>
    </button>
</template>

<script>
export default {
    name: 'IpsumOptions',
    methods: {
        setOutputText: function(){
            this.$emit('set-output-text', this.ipsumText);
        }
    },
    data(){
        return {
            ipsumText: ""
        }
    }
}
</script>

<style lang="scss" scoped>

    .options {
        margin: auto;
        width: 50%;
    }

    .row {
        display: flex;
        align-items: baseline;

        > * {
            margin: 5px
        }
    }

</style>
