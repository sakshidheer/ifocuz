import Dexie from 'dexie';

const db = new Dexie('myDb');
db.version(1).stores({
    todolist: `id,task, finishTime,priority,label,status,project`,
    projects :`id,name,theme`
});
db.open();
//status - 0 (todo), 1(in-progress), 2(done)
export default db;