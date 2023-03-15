export interface CplObjectInterface {
    id: string;
    annotationText: string;
    issueDate: string;
    issuer: string;
    creator: string;
    contentKind: string;
    assetList: CPlAssetInterface[];
    type: string;
}
export interface CPlAssetInterface {
    id: string;
    annotationText: string;
}
