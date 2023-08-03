export interface FormElements extends HTMLFormControlsCollection {
    name: HTMLInputElement;
    date: HTMLInputElement;
    file: HTMLInputElement;
}



export interface FileFormElement extends HTMLFormElement {
    readonly elements: FormElements;
}
