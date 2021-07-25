import database from '../database';
import { useLiveQuery } from "dexie-react-hooks";
let ProjectLists = () =>{
    return useLiveQuery(() => {
        return database.projects.toArray();
    });
}

export {ProjectLists as ProjectLists};