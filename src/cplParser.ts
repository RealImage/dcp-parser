import { XMLParser } from "fast-xml-parser";
import { CplObjectInterface ,CPlAssetInterface } from "./interfaces/cplObject";
import { formatId } from "./util";
import { INTEROP_CPL_URI,SMTPE_CPL_URI } from "./util";

export default function cplParser(cplXMLContent:string,format: 'raw'| 'formatted' = 'formatted') :CplObjectInterface
{

    let xmlParser = new XMLParser()
     let cplRawObject = xmlParser.parse(cplXMLContent)
     let cplObject:Partial<CplObjectInterface> = {}
     if(format === 'raw')
     {
          return cplRawObject
     }
     if(cplRawObject.CompositionPlaylist)
     {
            let compositionPlayList = cplRawObject.CompositionPlaylist
            cplObject.id = formatId(compositionPlayList.Id)
            cplObject.annotationText = compositionPlayList.AnnotationText
            cplObject.issueDate = compositionPlayList.IssueDate
            cplObject.issuer = compositionPlayList.Issuer
            cplObject.creator = compositionPlayList.Creator
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
                                            id:formatId(as.Id),
                                            annotationText:as.AnnotationText,
                                            sha1Hash:as.Hash,
                                    }
                                    if(cplObject.assetList && cplObject.assetList.findIndex((as)=>as.id === asset.id) >= 0)
                                    cplObject.assetList.push(asset as CPlAssetInterface)
                            })
                        }
                        else{
                        if(assetList[key].Id)
                        asset = {
                            id:formatId(assetList[key].Id),
                            annotationText:assetList[key].AnnotationText,
                            sha1Hash:assetList[key].Hash,
                        }
                        if(cplObject.assetList && cplObject.assetList.findIndex((as)=>as.id === asset.id) < 0)
                                    cplObject.assetList.push(asset as CPlAssetInterface)
                    }
                    }
                    })
            }
            else {
                let assetList = reel.AssetList
                for (const  key in assetList )
                {
                    let asset:Partial<CPlAssetInterface>={}
                    if(Array.isArray(assetList[key])){
                        assetList[key].forEach((as:any)=>{
                                asset = {
                                        id:formatId(as.Id),
                                        annotationText:as.AnnotationText,
                                        sha1Hash:as.Hash,
                                }
                                if(cplObject.assetList && cplObject.assetList.findIndex((as)=>as.id === asset.id) < 0)
                                cplObject.assetList.push(asset as CPlAssetInterface)
                        })
                    }
                    else{
                    if(assetList[key].Id)
                    {
                    asset = {
                        id:formatId(assetList[key].Id),
                        annotationText:assetList[key].AnnotationText,
                        sha1Hash:assetList[key].Hash,
                    }
                        if(cplObject.assetList && cplObject.assetList.findIndex((as)=>as.id === asset.id) < 0)
                            cplObject.assetList.push(asset as CPlAssetInterface)
                }
                }
                }
            }
            
     }
      xmlParser = new XMLParser({ignoreAttributes:false})
      cplRawObject = xmlParser.parse(cplXMLContent)
     if(cplRawObject["@_xmlns"] == INTEROP_CPL_URI)
     {
        cplObject.type = 'INTEROP'
     }
     else if(cplRawObject["@_xmlns"] == SMTPE_CPL_URI) {
        cplObject.type = 'SMTPE'
     }
     else {
        cplObject.type = ""
     }
     return cplObject as CplObjectInterface
}