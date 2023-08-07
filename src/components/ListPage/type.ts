export interface FormElements extends HTMLFormControlsCollection {
    name: HTMLInputElement;
    date: HTMLInputElement;
    file: HTMLInputElement;
    writer: HTMLInputElement;
    about: HTMLInputElement;
}



export interface FileFormElement extends HTMLFormElement {
    readonly elements: FormElements;
}



export interface Book {
    userId: string;
    name: string;
    file: any;
    DOP: Date
    about: string
    writer: string
}


