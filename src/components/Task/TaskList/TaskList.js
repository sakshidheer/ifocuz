import React from 'react';
import TaskItem from './TaskItem/TaskItem';
import { connect } from 'react-redux';
import { useLiveQuery } from 'dexie-react-hooks';
import database from '../../../database';

const compare = (a, b) => {
    const upperA = a.priority.toUpperCase();
    const upperB = b.priority.toUpperCase();

    let comparison = 0;
    if (upperA > upperB) {
        comparison = 1;
    } else if (upperA < upperB) {
        comparison = -1;
    }
    return comparison;
}
const TaskList = props => {
    let firstSecondDate = new Date(new Date().setHours(0, 0, 0)),
        lastSecondDate = new Date(new Date().setHours(23, 59, 59));
    let todolist = useLiveQuery(
        () => {
            let query = database.todolist, list;
            if (props.today) {
                list = query.where('finishTime').between(firstSecondDate, lastSecondDate, true).toArray();
            } else {
                list = query.toArray();
            }


            return list;
        });
    if (props.hideDone) {
        todolist = todolist.filter(todo => todo.status !== 2);
    }

    // If default values are returned, queries are still loading:
    if (!todolist) return null;
    let tasks = todolist.sort(compare).map(task => {
        return <TaskItem
            {...task}
            key={task.id}
            color={props.priorities[task.priority]}
            onStatusIconClick={() => onStatusIconClickHandler(task)} />
    });
    return <div>
        {tasks}
    </div>
};

const onStatusIconClickHandler = (task) => {
    if (task.status !== 2)
        database.todolist.update(task.id, { status: task.status + 1 });
}

const mapStateToProps = state => {
    return {
        tasks: state.tasks,
        priorities: state.priorities,
        completedTask: state.completedTask
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onTaskComplete: (id) => dispatch({ type: 'COMPLETE_TASK', id: id })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TaskList);