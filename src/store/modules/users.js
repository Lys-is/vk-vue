const state = () => ({
    users: [],
    friends: []
})

const mutations = {
    addUser: (state, user) => {
        if(!state.users.find(u => u.id === user.id))
            state.users.push(user);
    },
    addFriend: (state, obj) => {
        const { friend, id } = obj
        let getFriend = state.friends.find(f => f.id === friend.id);
        if(getFriend) {
            getFriend.with.push(id);
        } else {
            state.friends.push(friend);
        }
    },
    clearFriends: (state) => {
        state.friends = [];
    },
    setFreindsCount: (state, {id, count}) => {
        let getFriend = state.friends.find(f => f.id === id);
        if(getFriend) {
            getFriend.friendsCount = count;
        }
    }
}
const getters = {
    getUsers: state => state.users,
    getAllfriends: state => {
        return state.friends.sort((a, b) => a.first_name.localeCompare(b.first_name) || a.last_name.localeCompare(b.last_name));
    },
    getUsersByFreind: state => friend => {
        let users = state.users.filter(user => friend.with.includes(user.id));
        return users
    },
    getFriendById: state => id => {
        let friend = state.friends.find(f => f.id == id);
        return friend
    },
    getUsersCount: state => state.users.length,
}
export default {
    namespaced: true,
    getters,
    state,
    mutations
}