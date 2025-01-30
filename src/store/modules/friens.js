const state = () => ({
    friends: []
})

const mutations = {
    addFriends: (state, obj) => {
        state.friends.push(obj);
    }
}
const getters = {
    getAllFriends: state => state.friends,
    fetchFriendById: state => id => {
        return state.friends.find(friend => friend.id === id);
    }
}
export default {
    namespaced: true,
    getters,
    state,
    mutations
}