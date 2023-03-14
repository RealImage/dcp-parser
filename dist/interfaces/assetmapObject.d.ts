export interface AssetMapObject {
    type: string;
    id: string;
    annotationText: string;
    assetList: Asset[];
    issueDate: string;
    issuer: string;
    creator: string;
}
interface Asset {
    id: string;
    annotationText: string;
    path: string | string[];
}
export {};
