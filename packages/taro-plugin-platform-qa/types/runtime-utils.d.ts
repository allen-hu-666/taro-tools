import initNativeApi from './apis';
import components from './components';
export { initNativeApi, components };
export * from './apis-list';
export declare const hostConfig: {
    initNativeApi: typeof initNativeApi;
    prepareUpdateData(data: any): void;
};
