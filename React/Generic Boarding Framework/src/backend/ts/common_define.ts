export type ProcessProp = {
    title: string;
    activities: Array<Activity>;
}

export type ProcessInstanceProps = {
    start_date: Date;
    user_name: string;
}

export class Process {
    title: string = "";
    description: string = "";
    activities: Array<Activity> = [];
    author: string = "";
    created_date: Date = new Date();
    constructor(state?: ProcessProp) {
        if (state !== undefined) {
            this.title = state.title;
            this.activities = state.activities;
        }
    }
}

export class ProcessInstance extends Process {
    activities: Array<ActivityInstance> = [];
    start_date: Date = new Date();
    done_date?: Date;
    activeStep: number = 0;
    user_name?: string;
    constructor(props?: ProcessInstanceProps & ProcessProp){
        super(props)
        if(props !== undefined) {
            this.user_name = props.user_name;
            this.start_date = props.start_date;
        }
    }
}

export type ActivityProp = {
    title: string;
    description: string;
    subProcess: Process;
}

export class Activity {
    title: string = "";
    description: string = "";
    automationSettings: Object = {};
    possible_states = ["Done", "Not Possible"];

    constructor(A_state?: ActivityProp) {
        if(A_state !== undefined){
            this.title = A_state.title;
            this.description = A_state.description;
        }
    }
}

export type StatusProp = {
    title: string;
}
export type ActivityInstanceProp = {

}


export class ActivityInstance extends Activity {
    start_date: Date = new Date();
    end_date?: Date;
    state = -1;
}
