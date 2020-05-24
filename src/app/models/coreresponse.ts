export class Coreresponse {
    meta: CoreCounter;
    body: CoreInterval;
}

export class CoreInterval {
    load: string;
    pvoutput: string;
    batteryinput: string;
    batteryoutput: string;
    generatoroutput: string;
    excessenergy: string;
    ambienttemp: string;
    pvtemp: string;
    globalsolarsum: string;
    globalsolaravg: string;
    cost: string;
    ppaprice: string;
    voltage: string;
    current: string;
    frequency: string;
    dateandtime: string;
}
export class CoreCounter {
    count: number;
}
export class CoreRequest {
    username: string;
    startdate: string;
    enddate: string;
    sessionID: string;
}