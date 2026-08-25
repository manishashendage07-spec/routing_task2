

export interface Iproduct {
    pname: string;
    pid: string;
    pstatus: 'In-Progress' | 'Dispatched' | 'Delivered';
    canReturn: 0 | 1;
    pimg: string;
}

export interface Iresproduct<T>{
    msg:string;
    data:T
}