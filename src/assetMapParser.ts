import { XMLParser } from 'fast-xml-parser';
import { AssetMapObject } from './interfaces/assetmapObject';
import { formatId, INTEROP_ASSETMAP_URI, SMPTE_ASSETMAP_URI } from './util';
import { dcpType } from './enums';

export function assetMapParser(
	assetMapXMLString: string,
	format: 'raw' | 'formatted' = 'formatted'
): AssetMapObject  {
	let xmlParser = new XMLParser({ ignoreAttributes: false });
	let assetRawObject = xmlParser.parse(assetMapXMLString).AssetMap;
	let assetObject: Partial<AssetMapObject> = {};
	if (format === 'raw') {
		return assetRawObject;
	}
	if (assetRawObject['@_xmlns'] == INTEROP_ASSETMAP_URI) {
		assetObject.type = dcpType.INTEROP;
		xmlParser = new XMLParser();
		assetRawObject = xmlParser.parse(assetMapXMLString).AssetMap;
		assetObject.id = formatId(assetRawObject.Id);
		assetObject.annotationText = assetRawObject.AnnotationText;
		assetObject.issueDate = assetRawObject.IssueDate;
		assetObject.issuer = assetRawObject.Issuer;
		assetObject.creator = assetRawObject.Creator;
		assetObject.assetList = assetRawObject.AssetList.Asset.map((asset: any) => {
			const pathName =  Array.isArray(asset.ChunkList)
			? asset.ChunkList.map((chunk: any) => chunk.Chunk.Path)
			: [asset.ChunkList.Chunk.Path];
			return {
				id: formatId(asset.Id),
				annotationText: asset.AnnotationText,
				path: Array.isArray(asset.ChunkList)
				? asset.ChunkList.map((chunk: any) => chunk.Chunk.Path)
				: asset.ChunkList.Chunk.Path,
				...(asset.hasOwnProperty("PackingList") ||pathName.some((fileName: string)=> fileName.includes(".pkl.xml"))? { packingList: true } : {}),
				};
		});
	} else if (assetRawObject['@_xmlns'] == SMPTE_ASSETMAP_URI) {
		assetObject.type = dcpType.SMPTE;
		xmlParser = new XMLParser();
		assetRawObject = xmlParser.parse(assetMapXMLString).AssetMap;
		assetObject.id = formatId(assetRawObject.Id);
		assetObject.annotationText = assetRawObject.AnnotationText;
		assetObject.issueDate = assetRawObject.IssueDate;
		assetObject.issuer = assetRawObject.Issuer;
		assetObject.creator = assetRawObject.Creator;
		assetObject.assetList = assetRawObject.AssetList.Asset.map((asset: any) => {
			const pathName =  Array.isArray(asset.ChunkList)
			? asset.ChunkList.map((chunk: any) => chunk.Chunk.Path)
			: [asset.ChunkList.Chunk.Path];
			return {
				id: formatId(asset.Id),
				annotationText: asset.AnnotationText,
				path: Array.isArray(asset.ChunkList)
				? asset.ChunkList.map((chunk: any) => chunk.Chunk.Path)
				: asset.ChunkList.Chunk.Path,
				...(asset.PackingList == true || pathName.some((fileName: string)=> fileName.includes(".pkl.xml")) ? { packingList: true } : {}),
			};
		});
	}
	return assetObject as AssetMapObject;
}
