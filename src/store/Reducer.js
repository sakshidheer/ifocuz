const initailState = {
    labels: [{
        displayName: 'Office',
        value: 'office'
    },
    {
        displayName: 'Personal',
        value: 'personal'
    }],
    priorities: {
        P1: "#ef5858",
        P2: "#f19b9b",
        P3: '#e0c666',
        P4: '#b1e252',
        P5: '#16bb13'
    },
    tasks: [],
    completedTask: []
};

const reducer = (state = initailState, action) => {
    switch (action.type) {
        case "ADD_TASK":
            return {
                ...state,
                tasks: [
                    ...state.tasks,
                    action.task
                ]
            }
        case "COMPLETE_TASK":
            return {
                ...state,
                completedTask: [...state.completedTask, action.id]
            }
        default:
            return state;

    }
}

export default reducer;