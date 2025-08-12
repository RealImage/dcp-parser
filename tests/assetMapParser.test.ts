import { assetMapParser } from '../src/assetMapParser';
import { dcpType } from '../src/enums';
import { AssetMapObject } from '../src/interfaces/assetmapObject';
import * as fs from 'fs';
import * as path from 'path';

describe('AssetMap Parser', () => {
  const fixturesPath = path.join(__dirname, 'fixtures');
  
  describe('Interop Format', () => {
    let interopAssetMapXML: string;
    let expectedInteropResult: AssetMapObject;

    beforeAll(() => {
      // Read the XML file
      interopAssetMapXML = fs.readFileSync(
        path.join(fixturesPath, 'interop', 'assetmap.xml'), 
        'utf-8'
      );

      // Expected result for Interop AssetMap based on actual XML
      expectedInteropResult = {
        type: dcpType.INTEROP,
        id: 'a1e83db0-1897-4c1f-b52b-1103958540d4',
        annotationText: 'Assets of Hetro_Reels',
        issueDate: '2010-11-02T12:38:03+05:30',
        issuer: 'Qube',
        creator: 'QubeMaster Pro 2.3.2.389',
        assetList: [
          {
            id: 'f08c81d5-1f9e-418c-8bbc-8c29c3965749',
            annotationText: 'Hetro_Reels',
            path: 'Hetro_Reels_TST_S_EN-XX_2K_ST_20101102_FAC_OV.cpl.xml'
          },
          {
            id: '3dbf20b2-19f1-4668-9c25-3484e2126d74',
            annotationText: 'Hetro_Reels-reel-1-jp2k.mxf',
            path: 'Hetro_Reels-reel-1-jp2k.mxf'
          },
          {
            id: 'a89b1229-6989-42a7-90b1-acfc6effb757',
            annotationText: 'Hetro_Reels-reel-2-jp2k.mxf',
            path: 'Hetro_Reels-reel-2-jp2k.mxf'
          },
          {
            id: '2d756eb5-d391-4995-8d12-6400515e4c33',
            annotationText: 'Hetro_Reels-reel-3-jp2k.mxf',
            path: 'Hetro_Reels-reel-3-jp2k.mxf'
          },
          {
            id: '5f1f8f4a-4e8b-479d-bfa2-947622d58052',
            annotationText: 'Hetro_Reels-reel-4-jp2k.mxf',
            path: 'Hetro_Reels-reel-4-jp2k.mxf'
          },
          {
            id: '086b357d-0536-4548-8e06-d2561aba0495',
            annotationText: 'Hetro_Reels-reel-5-jp2k.mxf',
            path: 'Hetro_Reels-reel-5-jp2k.mxf'
          },
          {
            id: '2e2a4974-1ef1-4a75-9ff8-8c4ff8f0372f',
            annotationText: 'Hetro_Reels-reel-6-jp2k.mxf',
            path: 'Hetro_Reels-reel-6-jp2k.mxf'
          },
          {
            id: '4c013ea1-1e13-4ffe-840e-1d086c33e4ce',
            annotationText: 'Hetro_Reels',
            path: 'Hetro_Reels.pkl.xml',
            packingList: true
          }
        ]
      };
    });

    test('should parse Interop AssetMap XML correctly', () => {
      const result = assetMapParser(interopAssetMapXML, 'formatted');
      expect(result).toEqual(expectedInteropResult);
    });

    test('should return raw object when format is raw', () => {
      const result = assetMapParser(interopAssetMapXML, 'raw');
      expect(result).toHaveProperty('Id');
      expect(result).toHaveProperty('AssetList');
      expect(result).toHaveProperty('AnnotationText');
    });

    test('should identify Interop format correctly', () => {
      const result = assetMapParser(interopAssetMapXML, 'formatted');
      expect(result.type).toBe(dcpType.INTEROP);
    });

    test('should format IDs correctly (remove urn:uuid: prefix)', () => {
      const result = assetMapParser(interopAssetMapXML, 'formatted');
      expect(result.id).not.toContain('urn:uuid:');
      result.assetList.forEach(asset => {
        expect(asset.id).not.toContain('urn:uuid:');
      });
    });
  });

  describe('SMPTE Format', () => {
    let smpteAssetMapXML: string;
    let expectedSMPTEResult: AssetMapObject;

    beforeAll(() => {
      // Read the XML file
      smpteAssetMapXML = fs.readFileSync(
        path.join(fixturesPath, 'smpte', 'assetmap.xml'), 
        'utf-8'
      );

      // Expected result for SMPTE AssetMap based on actual XML
      expectedSMPTEResult = {
        type: dcpType.SMPTE,
        id: 'bd42727f-7227-4059-9f3f-bde0af687893',
        annotationText: 'BAJIRAO-MASTANI_TLR-2_HDR-300_S_HI-XX_IN-U_51_4K_ST_20220810_QUB_SMPTE_OV',
        issueDate: '2022-08-10T02:58:57-00:00',
        issuer: 'REALIMAGE',
        creator: 'Colorfront Transkoder 2022 build53051',
        assetList: [
          {
            id: 'b9e65192-a7c5-48ef-8dd9-1a3336590750',
            annotationText: undefined,
            path: 'PKL_b9e65192-a7c5-48ef-8dd9-1a3336590750.xml',
            packingList: true
          },
          {
            id: '753101e2-6bd3-4888-9527-2fc034e58dc1',
            annotationText: undefined,
            path: 'CPL_BAJIRAO-MASTANI_TLR-2_HDR-300_S_HI-XX_IN-U_51_4K_ST_20220810_QUB_SMPTE_OV.xml'
          },
          {
            id: '7d217943-7ffb-4f1c-82b2-6b32e0addc71',
            annotationText: undefined,
            path: 'BAJIRAO-MASTANI_TLR-2_HDR-300_S_HI-XX_IN-U_51_4K_ST_20220810_QUB_SMPTE_OV_01.mxf'
          },
          {
            id: '2ec00d90-0dc9-44ba-bd06-e3e970191e6a',
            annotationText: undefined,
            path: 'BAJIRAO-MASTANI_TLR-2_HDR-300_S_HI-XX_IN-U_51_4K_ST_20220810_QUB_SMPTE_OV_01_audio.mxf'
          }
        ]
      };
    });

    test('should parse SMPTE AssetMap XML correctly', () => {
      const result = assetMapParser(smpteAssetMapXML, 'formatted');
      expect(result).toEqual(expectedSMPTEResult);
    });

    test('should identify SMPTE format correctly', () => {
      const result = assetMapParser(smpteAssetMapXML, 'formatted');
      expect(result.type).toBe(dcpType.SMPTE);
    });

    test('should handle PackingList flag correctly in SMPTE', () => {
      const result = assetMapParser(smpteAssetMapXML, 'formatted');
      const pklAsset = result.assetList.find(asset => asset.packingList);
      expect(pklAsset).toBeDefined();
      expect(pklAsset?.packingList).toBe(true);
    });
  });

  describe('Error Handling', () => {
    test('should handle empty XML string', () => {
      expect(() => assetMapParser('')).toThrow();
    });

    test('should handle invalid XML', () => {
      expect(() => assetMapParser('<invalid>xml</invalid>')).toThrow();
    });

    test('should handle missing namespace', () => {
      const xmlWithoutNamespace = `<?xml version="1.0"?>
        <AssetMap>
          <Id>urn:uuid:test</Id>
        </AssetMap>`;
      
      const result = assetMapParser(xmlWithoutNamespace, 'formatted');
      expect(result.type).toBeUndefined();
    });
  });
});
