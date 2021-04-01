<template>
    <div class='options'>
        <div v-if="showError">
            {{ errorMessage }}
        </div>
        <div class='row'>
            <input 
                type="number" 
                id="quantity" 
                name="quantity" 
                min="1" 
                max="5" 
                v-model="ipsumNumParagraphs"
                @change="validateNumParagraphs"
            />
            <p>Paragraphs</p>
        </div>
        <div class='row'>
            <input  
                type="radio" 
                id="radioLong" 
                value = 'l'
                v-model = 'ipsumLength'
            />
            <p>Long</p>
            <input  
                type="radio" 
                id="radioMedium" 
                value = 'm'
                v-model = 'ipsumLength'
            />
            <p>Medium</p>
            <input  
                type="radio" 
                id="radioShort" 
                value = 's'
                v-model = 'ipsumLength'
            />
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
        },

        setIpsumLength: function(length){
            if(length in ['s', 'm', 'l']){
                this.ipsumLength = length;
            }
        },

        validateNumParagraphs: function(){
            this.errorMessage = "";
            this.showError = false;

            if(this.ipsumNumParagraphs > 5){
                this.ipsumNumParagraphs = 5;
                this.errorMessage = 'Maximum number of paragraphs is 5';
                this.showError = true
            }
            else if(this.ipsumNumParagraphs < 1){
                this.ipsumNumParagraphs = 1;
                this.errorMessage = 'Minimum number of paragraphs is 1';
                this.showError = true
            }
        }
    },
    data(){
        return {
            ipsumText         : "",
            ipsumLength       : "s",
            ipsumNumParagraphs: 3,
            ipsumOptionOne    : false,
            ipsumOptionTwo    : false,
            errorMessage      : "",
            showError         : false
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
