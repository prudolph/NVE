interface INamedObject {
    name: string;
    val: object;
}
interface IAFrameSceneProps {
    sceneHtml: string;
    imageTargets?: string[];
    components?: INamedObject[];
    primitives?: INamedObject[];
}
declare function AFrameScene({ sceneHtml, imageTargets, components, primitives }: IAFrameSceneProps): any;
declare const DISABLE_IMAGE_TARGETS: any[];
export { AFrameScene, DISABLE_IMAGE_TARGETS };