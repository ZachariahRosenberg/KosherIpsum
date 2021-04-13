import { createStore } from 'vuex';
import { fetchIpsum } from '../api/fetchIpsum';

export default createStore({
    state: {
        isLoading          : false,
        ipsumText          : [""],
        showIpsumText      : false,
        ipsumLength        : "s",
        ipsumNumParagraphs : 3,
        outputExcludeIpsum : false,
        outputStartWithOy  : false,
    },
    mutations: {
        setIsLoading: (state, isLoading) => state.isLoading = isLoading,
        setIpsumText: (state, ipsumText) => state.ipsumText = ipsumText,
        setShowIpsumText: (state, showIpsumText) => state.showIpsumText = showIpsumText,
        setIpsumLength: (state, ipsumLength) => state.ipsumLength = ipsumLength,
        setIpsumNumParagraphs: (state, ipsumNumParagraphs) => state.ipsumNumParagraphs = ipsumNumParagraphs,
        setOutputExcludeIpsum: (state, outputExcludeIpsum) => state.outputExcludeIpsum = outputExcludeIpsum,
        setOutputStartWithOy: (state, outputStartWithOy) => state.outputStartWithOy = outputStartWithOy,

        resetIpsumText: (state) => {
            state.ipsumText = [""];
            state.showIpsumText = false;
            state.isLoading = false;
        }
    },
    actions: {
        async fetchIpsum({ commit, state }){
            // Any more commits and we should group into a mutation
            commit('resetIpsumText');
            commit('setIsLoading', true);

            let ipsumParagraphs = await fetchIpsum(
                state.ipsumNumParagraphs, 
                state.ipsumLength, 
                state.excludeIpsum, 
                state.startWithOy
            );

            commit('setIpsumText', ipsumParagraphs);
            commit('setShowIpsumText', true);
            commit('setIsLoading', false);
        }
    },
    modules: {
    }
})
