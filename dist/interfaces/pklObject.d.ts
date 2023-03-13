export interface PKLObjectInterface {
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
    hash: string;
    size: number;
    type: string;
}
export {};
