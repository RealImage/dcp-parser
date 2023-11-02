import { formatId, INTEROP_PKL_URI, SMPTE_PKL_URI } from './util';
import { XMLParser } from 'fast-xml-parser';
import { PKLObjectInterface } from './interfaces/pklObject';
import { dcpType } from './enums';
export default function pklParser(
	pklXML: string,
	format: 'raw' | 'formatted' = 'formatted'
): PKLObjectInterface | any {
	let xmlParser = new XMLParser({ ignoreAttributes: false });
	let pklRawObject = xmlParser.parse(pklXML).PackingList;
	if (format === 'raw') {
		return pklRawObject;
	}
	let pklObject: Partial<PKLObjectInterface> = {};
	if (pklRawObject['@_xmlns'] == INTEROP_PKL_URI) {
		pklObject.type = dcpType.INTEROP;
		xmlParser = new XMLParser();
		pklRawObject = xmlParser.parse(pklXML).PackingList;
		pklObject.id = formatId(pklRawObject.Id);
		pklObject.annotationText = pklRawObject.AnnotationText;
		pklObject.issueDate = pklRawObject.IssueDate;
		pklObject.issuer = pklRawObject.Issuer;
		pklObject.creator = pklRawObject.Creator;
		if (Array.isArray(pklRawObject.AssetList.Asset)) {
			pklObject.assetList = pklRawObject.AssetList.Asset.map((asset: any) => {
				return {
					id: formatId(asset.Id),
					annotationText: asset.AnnotationText,
					hash: asset.Hash,
					size: asset.Size,
					type: asset.Type,
				};
			});
		} else {
			let asset = pklRawObject.AssetList.Asset;
			pklObject.assetList = [];
			pklObject.assetList.push({
				id: formatId(asset.Id),
				annotationText: asset.AnnotationText,
				hash: asset.Hash,
				size: asset.Size,
				type: asset.Type,
				isCpl: asset.Type == 'text/xml;asdcpKind=CPL',
			});
		}
	} else if (pklRawObject['@_xmlns'] == SMPTE_PKL_URI) {
		pklObject.type = dcpType.SMPTE;
		xmlParser = new XMLParser();
		pklRawObject = xmlParser.parse(pklXML).PackingList;
		pklObject.id = formatId(pklRawObject.Id);
		pklObject.annotationText = pklRawObject.AnnotationText;
		pklObject.issueDate = pklRawObject.IssueDate;
		pklObject.issuer = pklRawObject.Issuer;
		pklObject.creator = pklRawObject.Creator;
		if (Array.isArray(pklRawObject.AssetList.Asset)) {
			pklObject.assetList = pklRawObject.AssetList.Asset.map((asset: any) => {
				return {
					id: formatId(asset.Id),
					annotationText: asset.AnnotationText,
					hash: asset.Hash,
					size: asset.Size,
					type: asset.Type,
				};
			});
		} else {
			let asset = pklRawObject.AssetList.Asset;
			pklObject.assetList = [];
			pklObject.assetList.push({
				id: formatId(asset.Id),
				annotationText: asset.AnnotationText,
				hash: asset.Hash,
				size: asset.Size,
				type: asset.Type,
				isCpl: asset.Type == 'text/xml',
			});
		}
	}

	return pklObject as PKLObjectInterface;
}
