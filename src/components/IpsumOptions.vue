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
            <input type="checkbox" id='checkOutputExcludeIpsum' v-model="outputExcludeIpsum" />
            <p>Nein Ipsum, Just the Yiddish.</p>
        </div>
        <div class='row'>
            <input type="checkbox" id='checkOutputStartWithOy' v-model="outputStartWithOy" />
            <p>Start with "Oy Gevalt"</p>
        </div>
    </div>

    <button type="button" @click="fetchIpsum">
        <span v-if="isLoading">Loading</span>
        <span v-else>Generate</span>
    </button>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'IpsumOptions',

    methods: {
        validateNumParagraphs: function(number){
            this.errorMessage = "";
            this.showError = false;
    
            if(number > 5){
                this.errorMessage = 'Maximum number of paragraphs is 5';
                this.showError = true
                return false;
            }
            else if(number < 1 || number == ''){
                this.errorMessage = 'Minimum number of paragraphs is 1';
                this.showError = true
                return false;
            }
            return true;
        },

        ...mapActions(['fetchIpsum'])
    },

    data(){
        return {
            errorMessage : "",
            showError    : false
        }
    },

    computed: {
        ipsumLength: {
            get(){
                return this.$store.state.ipsumLength;
            },
            set(value){
                this.$store.commit('setIpsumLength', value);
            }
        },
        ipsumNumParagraphs: {
            get(){
                return this.$store.state.ipsumNumParagraphs;
            },
            set(value){
                if(this.validateNumParagraphs(value)){
                    this.$store.commit('setIpsumNumParagraphs', value);
                }
                else{
                    value = value > 5? 5:1;
                    this.$store.commit('setIpsumNumParagraphs', value);
                }
            }
        },
        outputExcludeIpsum: {
            get(){
                return this.$store.state.outputExcludeIpsum;
            },
            set(value){
                this.$store.commit('setOutputExcludeIpsum', value);
            }
        },
        outputStartWithOy: {
            get(){
                return this.$store.state.outputStartWithOy;
            },
            set(value){
                this.$store.commit('setOutputStartWithOy', value);
            }
        },
        ...mapState(['isLoading'])
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
