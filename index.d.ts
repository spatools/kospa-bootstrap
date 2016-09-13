import * as composer from "@kospa/base/composer";
export declare type InitializeHandler = () => PromiseLike<any> | any;
export declare type InitializeModule = {
    init: InitializeHandler;
};
export interface StartOptions extends composer.CompositionOptions {
    container?: string | Node;
}
export declare function start(options: StartOptions, ...handlersOrModules: (string | InitializeModule | InitializeHandler | PromiseLike<any>)[]): Promise<Node>;
