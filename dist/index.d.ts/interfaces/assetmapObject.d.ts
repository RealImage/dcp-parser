export interface AssetMapObject {
    type: string;
    id: string;
    annotationText: string;
    assetList: AssetMapAsset[];
    issueDate: string;
    issuer: string;
    creator: string;
}
export interface AssetMapAsset {
    id: string;
    annotationText: string | undefined;
    path: string | string[];
    packingList?: boolean;
}
