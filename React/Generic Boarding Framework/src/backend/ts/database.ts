import {
  Process,
  ProcessInstance,
  Activity,
  ActivityInstance
} from "./common_define";
const DB_NAME = "test_db";
const DB_VERSION = 2;
export enum DB_OBJ_STORES {
  process_instances = "process_instances",
  process_templates = "process_templates",
  activity_templates = "activity_templates"
}

export function init_database() {
  let indexedDB = window.indexedDB;
  let open = indexedDB.open(DB_NAME, DB_VERSION);

  open.onupgradeneeded = function() {
    let db = open.result;
    for (let store in DB_OBJ_STORES) {
      if (!db.objectStoreNames.contains(store)) {
        db.createObjectStore(store, { autoIncrement: true });
      }
    }
  };
}

function connect_2_object_store(obj_s_name: DB_OBJ_STORES, callback: Function) {
  let indexedDB = window.indexedDB;
  let open = indexedDB.open(DB_NAME, DB_VERSION);

  open.onupgradeneeded = function() {
    init_database();
  };

  open.onsuccess = function() {
    let db = open.result;
    if (!db.objectStoreNames.contains(obj_s_name)) {
      db.createObjectStore(obj_s_name);
    }
    let tx = db.transaction(obj_s_name, "readwrite");
    let store = tx.objectStore(obj_s_name);

    callback(store);
  };
}

export function save_process_template(p: Process) {
  connect_2_object_store(
    DB_OBJ_STORES.process_templates,
    (store: IDBObjectStore) => {
      store.put(p, p.title);
    }
  );
}

export async function does_process_exist(
  process_title: string
): Promise<Boolean> {
  return new Promise((resolve, reject) => {
    connect_2_object_store(
      DB_OBJ_STORES.process_templates,
      (store: IDBObjectStore) => {
        let request = store.get(process_title);
        request.onsuccess = function() {
          if (request.result) {
            resolve(true);
          } else {
            resolve(false);
          }
        };
      }
    );
  });
}

export function delete_process_template(p: Process) {
  connect_2_object_store(
    DB_OBJ_STORES.process_templates,
    (store: IDBObjectStore) => {
      store.delete(p.title);
    }
  );
}

export function save_activity_template(a: Activity) {
  connect_2_object_store(
    DB_OBJ_STORES.activity_templates,
    (store: IDBObjectStore) => {
      store.put(a, a.title);
    }
  );
}

export async function does_activity_exist(
  activity_title: string
): Promise<Boolean> {
  return new Promise((resolve, reject) => {
    connect_2_object_store(
      DB_OBJ_STORES.activity_templates,
      (store: IDBObjectStore) => {
        let request = store.get(activity_title);
        request.onsuccess = function() {
          if (request.result) {
            resolve(true);
          } else {
            resolve(false);
          }
        };
      }
    );
  });
}

export function delete_activity_template(a: Activity) {
  connect_2_object_store(
    DB_OBJ_STORES.activity_templates,
    (store: IDBObjectStore) => {
      store.delete(a.title);
    }
  );
}

export function delete_process_instance(p: ProcessInstance) {
  connect_2_object_store(
    DB_OBJ_STORES.process_instances,
    (store: IDBObjectStore) => {
      store.delete(new Array<any>(p.title, p.user_name));
    }
  );
}

export function create_process_instance(
  process_template: Process,
  user_name: string
) {
  connect_2_object_store(
    DB_OBJ_STORES.process_instances,
    (store: IDBObjectStore) => {
      //TODO is there a better way of doing this? than using as (can cause problems with undefined props)
      let new_process_instance = {
        ...new ProcessInstance(),
        ...process_template
      };
      for (let activ in new_process_instance.activities) {
        new_process_instance.activities[activ] = {
          ...new ActivityInstance(),
          ...new_process_instance.activities[activ]
        };
      }
      new_process_instance.user_name = user_name;
      new_process_instance.start_date = new Date();
      new_process_instance.activeStep = 0;
      store.put(new_process_instance, [
        new_process_instance.title,
        new_process_instance.user_name
      ]);
    }
  );
}

export async function get_process_templates(): Promise<Array<Process>> {
  return new Promise((resolve, reject) => {
    connect_2_object_store(
      DB_OBJ_STORES.process_templates,
      (store: IDBObjectStore) => {
        let request = store.getAll();
        request.onsuccess = function() {
          resolve(request.result);
        };
      }
    );
  });
}

export async function get_process_instance(
  title: string,
  user_name: string
): Promise<ProcessInstance> {
  return new Promise((resolve, reject) => {
    connect_2_object_store(
      DB_OBJ_STORES.process_instances,
      (store: IDBObjectStore) => {
        let request = store.get(IDBKeyRange.only([title, user_name]));
        request.onsuccess = function() {
          resolve(request.result);
        };
      }
    );
  });
}

export async function get_activity_templates(): Promise<Array<Activity>> {
  return new Promise((resolve, reject) => {
    connect_2_object_store(
      DB_OBJ_STORES.activity_templates,
      (store: IDBObjectStore) => {
        let request = store.getAll();
        request.onsuccess = function() {
          resolve(request.result);
        };
      }
    );
  });
}

export async function process_instance_update_step(
  process: ProcessInstance,
  step: number
) {
  connect_2_object_store(
    DB_OBJ_STORES.process_instances,
    (store: IDBObjectStore) => {
      if (process.user_name !== undefined) {
        process.activeStep = step;
        let key = [process.title, process.user_name];
        store.put(process, key);
      } else {
        console.error("user_name was undefined");
      }
    }
  );
}

export async function process_instance_update_activity_state(
  process: ProcessInstance,
  activity: ActivityInstance,
  new_state: number
) {
  connect_2_object_store(
    DB_OBJ_STORES.process_instances,
    (store: IDBObjectStore) => {
      if (process.user_name !== undefined) {
        let activityIndex = process.activities.indexOf(activity);
        if (activityIndex >= 0) {
          process.activities[activityIndex].state = new_state;
          let key = [process.title, process.user_name];
          store.put(process, key);
        }
      } else {
        console.error("user_name was undefined");
      }
    }
  );
}

export async function process_instance_reset_date(
  process: ProcessInstance
) {
  connect_2_object_store(
    DB_OBJ_STORES.process_instances,
    (store: IDBObjectStore) => {
      if (process.user_name !== undefined) {
        process.done_date = undefined;
        for (let activity of process.activities) {
          activity.end_date = undefined;
        }
        let key = [process.title, process.user_name];
        store.put(process, key);
      } else {
        console.error("user_name was undefined");
      }
    }
  );
}

export async function get_process_instances(): Promise<Array<ProcessInstance>> {
  return new Promise((resolve, reject) => {
    connect_2_object_store(
      DB_OBJ_STORES.process_instances,
      (store: IDBObjectStore) => {
        let request = store.getAll();
        request.onsuccess = function() {
          resolve(request.result);
        };
      }
    );
  });
}
