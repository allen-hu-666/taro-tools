import { RecursiveTemplate } from '@tarojs/shared';
export default class Template extends RecursiveTemplate {
    supportXS: boolean;
    Adapter: {
        if: string;
        else: string;
        elseif: string;
        for: string;
        forItem: string;
        forIndex: string;
        key: string;
        xs: string;
        type: string;
    };
    buildXsTemplate(): string;
    replacePropName(name: string, value: string, componentName: string): string;
    buildContainerTemplate(level: number, restart?: boolean): any;
    buildPlainTextTemplate(level: number): string;
    buildXSTmplName(): string;
}
