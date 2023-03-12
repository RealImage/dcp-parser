import { formatId, INTEROP_PKL_URI, SMTPE_PKL_URI } from "./util"
import { XMLParser } from 'fast-xml-parser'
import { PKLObjectInterface } from "./interfaces/pklObject"
export default function pklParser (pklXML:string)  {
     let xmlParser = new XMLParser({ ignoreAttributes: false })
     let pklRawObject = xmlParser.parse(pklXML).PackingList
     let pklObject: Partial<PKLObjectInterface> = {}
        if (pklRawObject["@_xmlns"] == INTEROP_PKL_URI) {
            pklObject.type = "INTEROP"
            pklObject.id = formatId(pklRawObject.Id)
            pklObject.annotationText = pklRawObject.AnnotationText
            pklObject.issueDate = pklRawObject.IssueDate
            pklObject.issuer = pklRawObject.Issuer
            pklObject.creator = pklRawObject.Creator
            pklObject.assetList = pklRawObject.AssetList.Asset.map((asset:any)=> {
                return {
                    id: formatId(asset.Id),
                    annotationText: asset.AnnotationText,
                    hash: asset.Hash,
                    size: asset.Size,
                    type: asset.Type


                }
            })

        }
        else if (pklRawObject["@_xmlns"] == SMTPE_PKL_URI) {

            pklObject.type = "SMTPE"
            pklObject.id = formatId(pklRawObject.Id)
            pklObject.annotationText = pklRawObject.AnnotationText
            pklObject.issueDate = pklRawObject.IssueDate
            pklObject.issuer = pklRawObject.Issuer
            pklObject.creator = pklRawObject.Creator
            pklObject.assetList = pklRawObject.AssetList.Asset.map((asset:any) => {
                return {
                    id: formatId(asset.Id),
                    annotationText: asset.AnnotationText,
                    hash: asset.Hash,
                    size: asset.Size,
                    type: asset.Type


                }

            })
        }
}