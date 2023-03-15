import { XMLParser } from "fast-xml-parser";
import { CplObjectInterface ,CPlAssetInterface } from "./interfaces/cplObject";
import { formatId } from "./util";
import { INTEROP_CPL_URI,SMTPE_CPL_URI } from "./util";

export default function cplParser(cplXMLContent:string,format: 'raw'| 'formatted' = 'formatted') :CplObjectInterface
{

    let xmlParser = new XMLParser({ ignoreAttributes: false })
     let cplRawObject = xmlParser.parse(cplXMLContent)
     let cplObject:Partial<CplObjectInterface> = {}
     if(format === 'raw')
     {
          return cplRawObject
     }
     if(cplRawObject.CompositionPlaylist)
     {
            let compositionPlayList = cplRawObject.CompositionPlaylist
            cplObject.id = compositionPlayList.id
            cplObject.annotationText = compositionPlayList.AnnotationText
            cplObject.issueDate = compositionPlayList.IssueDate
            cplObject.issuer = compositionPlayList.Issuer
            cplObject.creator = compositionPlayList.creator
            cplObject.contentKind = compositionPlayList.ContentKind
            cplObject.assetList = []
            cplObject = cplObject as CPlAssetInterface

            let reel = compositionPlayList.ReelList.Reel
            if(Array.isArray(reel)){
                reel.forEach(reel=>{
                    let assetList = reel.AssetList
                    for (const  key in assetList )
                    {
                        let asset:Partial<CPlAssetInterface>={}
    
                        if(Array.isArray(assetList[key])){
                            assetList[key].forEach((as:any)=>{
                                    asset = {
                                            id:as.id,
                                            annotationText:as.annotationText
                                    }
                                    if(cplObject.assetList && cplObject.assetList.findIndex((as)=>as.id === asset.id) >= 0)
                                    cplObject.assetList.push(asset as CPlAssetInterface)
                            })
                        }
                        else{
                        if(assetList[key].Id)
                        asset = {
                            id:assetList[key].id,
                            annotationText:assetList[key].annotationText
                        }
                    }
                    }
                    })
            }
            else {
                let assetList = reel.Reel.AssetList
                for (const  key in assetList )
                {
                    let asset:Partial<CPlAssetInterface>={}

                    if(Array.isArray(assetList[key])){
                        assetList[key].forEach((as:any)=>{
                                asset = {
                                        id:as.id,
                                        annotationText:as.annotationText
                                }
                                if(cplObject.assetList && cplObject.assetList.findIndex((as)=>as.id === asset.id) >= 0)
                                cplObject.assetList.push(asset as CPlAssetInterface)
                        })
                    }
                    else{
                    if(assetList[key].Id)
                    asset = {
                        id:assetList[key].id,
                        annotationText:assetList[key].annotationText
                    }
                        if(cplObject.assetList && cplObject.assetList.findIndex((as)=>as.id === asset.id) >= 0)
                            cplObject.assetList.push(asset as CPlAssetInterface)
                }
                }
            }
            
     }
     return cplObject as CplObjectInterface
}