import database from '../database';
import { useLiveQuery } from "dexie-react-hooks";
let ProjectLists = () => {
    return useLiveQuery(() => {
        return database.projects.toArray();
    });
}


let getProjectIdByName = (id) => {
    const project = database.projects
        .where('name')
        .equals(id)
        .first();
    return project;
}
export { ProjectLists, getProjectIdByName };