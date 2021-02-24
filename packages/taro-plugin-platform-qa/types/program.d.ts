import { TaroPlatformBase } from '@tarojs/service';
import Template from './template';
export default class Qa extends TaroPlatformBase {
    platform: string;
    globalObject: string;
    runtimePath: string;
    fileType: {
        templ: string;
        style: string;
        config: string;
        script: string;
        xs: string;
    };
    template: Template;
}
