import pklParser from '../src/pklParser';
import { dcpType } from '../src/enums';
import { PKLObjectInterface } from '../src/interfaces/pklObject';
import * as fs from 'fs';
import * as path from 'path';

describe('PKL Parser', () => {
  const fixturesPath = path.join(__dirname, 'fixtures');
  
  describe('Interop Format', () => {
    let interopPKLXML: string;
    let expectedInteropResult: PKLObjectInterface;

    beforeAll(() => {
      // Read the XML file
      interopPKLXML = fs.readFileSync(
        path.join(fixturesPath, 'interop', 'pkl.xml'), 
        'utf-8'
      );

      // Expected result for Interop PKL based on actual XML
      expectedInteropResult = {
        type: dcpType.INTEROP,
        id: '4c013ea1-1e13-4ffe-840e-1d086c33e4ce',
        annotationText: 'Hetro_Reels',
        issueDate: '2010-11-02T12:38:02+05:30',
        issuer: 'Qube',
        creator: 'QubeMaster Pro 2.3.2.389',
        assetList: [
          {
            id: 'f08c81d5-1f9e-418c-8bbc-8c29c3965749',
            annotationText: 'Hetro_Reels',
            hash: '9ZRsHrlpQstuUjf+Swe8HN7A+po=',
            size: 5426,
            type: 'text/xml;asdcpKind=CPL',
            isCpl: true
          },
          {
            id: '3dbf20b2-19f1-4668-9c25-3484e2126d74',
            annotationText: 'Hetro_Reels-reel-1-jp2k.mxf',
            hash: '0zwV9NYwrNUFH04JpWKYfdMi2Us=',
            size: 102068174,
            type: 'application/x-smpte-mxf;asdcpKind=Picture'
          },
          {
            id: 'a89b1229-6989-42a7-90b1-acfc6effb757',
            annotationText: 'Hetro_Reels-reel-2-jp2k.mxf',
            hash: 'DkENLJbJuTGubCs6IrZRqopnRb8=',
            size: 11858130,
            type: 'application/x-smpte-mxf;asdcpKind=Picture'
          },
          {
            id: '2d756eb5-d391-4995-8d12-6400515e4c33',
            annotationText: 'Hetro_Reels-reel-3-jp2k.mxf',
            hash: 'nym532GqE51euz/MGdygUF+35xY=',
            size: 102068174,
            type: 'application/x-smpte-mxf;asdcpKind=Picture'
          },
          {
            id: '5f1f8f4a-4e8b-479d-bfa2-947622d58052',
            annotationText: 'Hetro_Reels-reel-4-jp2k.mxf',
            hash: 'idaFG5rDbbNjPk8dHNHJtfZvxbs=',
            size: 11858130,
            type: 'application/x-smpte-mxf;asdcpKind=Picture'
          },
          {
            id: '086b357d-0536-4548-8e06-d2561aba0495',
            annotationText: 'Hetro_Reels-reel-5-jp2k.mxf',
            hash: 'se7BOl+iNcXW7q25QDWffBr+yvY=',
            size: 102068174,
            type: 'application/x-smpte-mxf;asdcpKind=Picture'
          },
          {
            id: '2e2a4974-1ef1-4a75-9ff8-8c4ff8f0372f',
            annotationText: 'Hetro_Reels-reel-6-jp2k.mxf',
            hash: 'f0KDQ5NRu6MkbpLs+ta0MjZwk58=',
            size: 11858130,
            type: 'application/x-smpte-mxf;asdcpKind=Picture'
          }
        ]
      };
    });

    test('should parse Interop PKL XML correctly', () => {
      const result = pklParser(interopPKLXML, 'formatted');
      expect(result).toEqual(expectedInteropResult);
    });

    test('should return raw object when format is raw', () => {
      const result = pklParser(interopPKLXML, 'raw');
      expect(result).toHaveProperty('Id');
      expect(result).toHaveProperty('AssetList');
      expect(result).toHaveProperty('AnnotationText');
    });

    test('should identify Interop format correctly', () => {
      const result = pklParser(interopPKLXML, 'formatted');
      expect(result.type).toBe(dcpType.INTEROP);
    });

    test('should format IDs correctly (remove urn:uuid: prefix)', () => {
      const result = pklParser(interopPKLXML, 'formatted');
      expect(result.id).not.toContain('urn:uuid:');
      result.assetList.forEach((asset: any) => {
        expect(asset.id).not.toContain('urn:uuid:');
      });
    });

    test('should identify CPL assets correctly', () => {
      const result = pklParser(interopPKLXML, 'formatted');
      const cplAsset = result.assetList.find((asset: any) => asset.isCpl);
      expect(cplAsset).toBeDefined();
      expect(cplAsset?.type).toBe('text/xml;asdcpKind=CPL');
    });

    test('should extract all asset information', () => {
      const result = pklParser(interopPKLXML, 'formatted');
      expect(result.assetList).toHaveLength(7);
      
      result.assetList.forEach((asset: any) => {
        expect(asset.id).toBeDefined();
        expect(asset.annotationText).toBeDefined();
        expect(asset.hash).toBeDefined();
        expect(asset.size).toBeDefined();
        expect(asset.type).toBeDefined();
      });
    });
  });

  describe('SMPTE Format', () => {
    let smptePKLXML: string;

    beforeAll(() => {
      // Read the XML file
      smptePKLXML = fs.readFileSync(
        path.join(fixturesPath, 'smpte', 'pkl.xml'), 
        'utf-8'
      );
    });

    test('should parse SMPTE PKL XML correctly', () => {
      const result = pklParser(smptePKLXML, 'formatted');
      expect(result).toBeDefined();
      expect(result.type).toBe(dcpType.SMPTE);
    });

    test('should identify SMPTE format correctly', () => {
      const result = pklParser(smptePKLXML, 'formatted');
      expect(result.type).toBe(dcpType.SMPTE);
    });

    test('should identify CPL assets correctly in SMPTE', () => {
      const result = pklParser(smptePKLXML, 'formatted');
      const cplAsset = result.assetList.find((asset: any) => asset.isCpl);
      expect(cplAsset).toBeDefined();
    });

    test('should have valid asset structure', () => {
      const result = pklParser(smptePKLXML, 'formatted');
      result.assetList.forEach((asset: any) => {
        expect(asset.id).toBeDefined();
        expect(asset.annotationText).toBeDefined();
        expect(asset.hash).toBeDefined();
        expect(asset.size).toBeDefined();
        expect(asset.type).toBeDefined();
      });
    });
  });

  describe('Error Handling', () => {
    test('should handle empty XML string', () => {
      expect(() => pklParser('')).toThrow();
    });

    test('should handle invalid XML', () => {
      expect(() => pklParser('<invalid>xml</invalid>')).toThrow();
    });

    test('should handle missing namespace', () => {
      const xmlWithoutNamespace = `<?xml version="1.0"?>
        <PackingList>
          <Id>urn:uuid:test</Id>
        </PackingList>`;
      
      const result = pklParser(xmlWithoutNamespace, 'formatted');
      expect(result.type).toBe(undefined);
    });
  });

  describe('Edge Cases', () => {
    test('should handle PKL with single asset', () => {
      const singleAssetXML = `<?xml version="1.0" encoding="UTF-8"?>
        <PackingList xmlns="http://www.smpte-ra.org/schemas/429-8/2007/PKL">
          <Id>urn:uuid:test-pkl-id</Id>
          <AnnotationText>Single Asset Test</AnnotationText>
          <IssueDate>2023-01-01T00:00:00+00:00</IssueDate>
          <Issuer>Test</Issuer>
          <Creator>Test</Creator>
          <AssetList>
            <Asset>
              <Id>urn:uuid:test-asset-id</Id>
              <AnnotationText>Test Asset</AnnotationText>
              <Hash>test-hash</Hash>
              <Size>12345</Size>
              <Type>text/xml</Type>
            </Asset>
          </AssetList>
        </PackingList>`;
      
      const result = pklParser(singleAssetXML, 'formatted');
      expect(result.assetList).toHaveLength(1);
    });

    test('should handle PKL with multiple asset types', () => {
      const multiAssetXML = `<?xml version="1.0" encoding="UTF-8"?>
        <PackingList xmlns="http://www.smpte-ra.org/schemas/429-8/2007/PKL">
          <Id>urn:uuid:test-pkl-id</Id>
          <AnnotationText>Multi Asset Test</AnnotationText>
          <IssueDate>2023-01-01T00:00:00+00:00</IssueDate>
          <Issuer>Test</Issuer>
          <Creator>Test</Creator>
          <AssetList>
            <Asset>
              <Id>urn:uuid:test-cpl-id</Id>
              <AnnotationText>Test CPL</AnnotationText>
              <Hash>test-hash-1</Hash>
              <Size>5000</Size>
              <Type>text/xml</Type>
            </Asset>
            <Asset>
              <Id>urn:uuid:test-video-id</Id>
              <AnnotationText>Test Video</AnnotationText>
              <Hash>test-hash-2</Hash>
              <Size>100000000</Size>
              <Type>application/mxf</Type>
            </Asset>
          </AssetList>
        </PackingList>`;
      
      const result = pklParser(multiAssetXML, 'formatted');
      expect(result.assetList).toHaveLength(2);
      
      const videoAsset = result.assetList.find((asset: any) => asset.type === 'application/mxf');
      expect(videoAsset).toBeDefined();
    });
  });
});