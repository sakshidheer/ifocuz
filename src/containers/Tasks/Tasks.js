import { useState } from 'react';
import TaskForm from '../../components/Task/TaskForm/TaskForm';
import TaskList from '../../components/Task/TaskList/TaskList';
import classes from './Tasks.module.css'
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';

const Task = (props) => {
    let location = useLocation();
    let intialProjectValue = '';
    let disableProject = false;
    if (location && location.state && location.state.id) {
        intialProjectValue = location.state.id;
        disableProject = true;
    }
    const defaultTask = {
        editMode: false,
        task: '',
        finishTime: new Date(),
        label: props.labels[0].value,
        priority: Object.entries(props.priorities)[0][0],
        project: intialProjectValue
    }
    let [task, setTask] = useState(defaultTask);
    const onTaskEdit = (props) => {
        setTask({
            editMode: true,
            task: props.task,
            finishTime: props.finishTime,
            label: props.label,
            priority: props.priority,
            project: props.project,
            id: props.id
        });
    }

    const resetForm = () => {
        setTask(defaultTask);
    }

    return <div className={classes.container}>
        <TaskForm 
        {...task} 
        resetForm={resetForm}
        labels={props.labels} 
        priorities={props.priorities}
        disableProject={disableProject}/>
        <TaskList onTaskEdit={onTaskEdit} />
    </div>
}

const mapStateToProps = state => {
    return {
        priorities: state.priorities,
        labels: state.labels
    }
}
export default connect(mapStateToProps)(Task);