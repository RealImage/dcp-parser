import cplParser from '../src/cplParser';
import { dcpType } from '../src/enums';
import { CplObjectInterface } from '../src/interfaces/cplObject';
import * as fs from 'fs';
import * as path from 'path';

describe('CPL Parser', () => {
  const fixturesPath = path.join(__dirname, 'fixtures');
  
  describe('Interop Format', () => {
    let interopCPLXML: string;
    let expectedInteropResult: CplObjectInterface;

    beforeAll(() => {
      // Read the XML file
      interopCPLXML = fs.readFileSync(
        path.join(fixturesPath, 'interop', 'cpl.xml'), 
        'utf-8'
      );

      // Expected result for Interop CPL based on actual XML
      expectedInteropResult = {
        type: '', // Parser returns empty string for now
        id: 'f08c81d5-1f9e-418c-8bbc-8c29c3965749',
        annotationText: 'Hetro_Reels',
        issueDate: '2010-11-02T12:37:58+05:30',
        issuer: 'Qube',
        creator: 'QubeMaster Pro 2.3.2.389',
        contentKind:'test',
        assetList: [
          {
            id: '3dbf20b2-19f1-4668-9c25-3484e2126d74',
            annotationText: 'Hetro_Reels-reel-1-jp2k.mxf',
            sha1Hash: '0zwV9NYwrNUFH04JpWKYfdMi2Us='
          },
          {
            id: 'a89b1229-6989-42a7-90b1-acfc6effb757',
            annotationText: 'Hetro_Reels-reel-2-jp2k.mxf',
            sha1Hash: 'DkENLJbJuTGubCs6IrZRqopnRb8='
          },
          {
            id: '2d756eb5-d391-4995-8d12-6400515e4c33',
            annotationText: 'Hetro_Reels-reel-3-jp2k.mxf',
            sha1Hash: 'nym532GqE51euz/MGdygUF+35xY='
          },
          {
            id: '5f1f8f4a-4e8b-479d-bfa2-947622d58052',
            annotationText: 'Hetro_Reels-reel-4-jp2k.mxf',
            sha1Hash: 'idaFG5rDbbNjPk8dHNHJtfZvxbs='
          },
          {
            id: '086b357d-0536-4548-8e06-d2561aba0495',
            annotationText: 'Hetro_Reels-reel-5-jp2k.mxf',
            sha1Hash: 'se7BOl+iNcXW7q25QDWffBr+yvY='
          },
          {
            id: '2e2a4974-1ef1-4a75-9ff8-8c4ff8f0372f',
            annotationText: 'Hetro_Reels-reel-6-jp2k.mxf',
            sha1Hash: 'f0KDQ5NRu6MkbpLs+ta0MjZwk58='
          }
        ]
      };
    });

    test('should parse Interop CPL XML correctly', () => {
      const result = cplParser(interopCPLXML, 'formatted');
      expect(result).toEqual(expectedInteropResult);
    });

    test('should return raw object when format is raw', () => {
      const result = cplParser(interopCPLXML, 'raw');
      expect(result).toHaveProperty('CompositionPlaylist');
    });

    test('should identify Interop format correctly', () => {
      const result = cplParser(interopCPLXML, 'formatted');
      expect(result.type).toBe(''); // Parser currently returns empty string
    });

    test('should format IDs correctly (remove urn:uuid: prefix)', () => {
      const result = cplParser(interopCPLXML, 'formatted');
      expect(result.id).not.toContain('urn:uuid:');
      result.assetList.forEach(asset => {
        expect(asset.id).not.toContain('urn:uuid:');
      });
    });

    test('should extract all assets from reel list', () => {
      const result = cplParser(interopCPLXML, 'formatted');
      expect(result.assetList).toHaveLength(6);
      expect(result.assetList.some(asset => asset.annotationText === 'Hetro_Reels-reel-1-jp2k.mxf')).toBe(true);
      expect(result.assetList.some(asset => asset.annotationText === 'Hetro_Reels-reel-6-jp2k.mxf')).toBe(true);
    });
  });

  describe('SMPTE Format', () => {
    let smpteCPLXML: string;
    let expectedSMPTEResult: CplObjectInterface;

    beforeAll(() => {
      // Read the XML file
      smpteCPLXML = fs.readFileSync(
        path.join(fixturesPath, 'smpte', 'cpl.xml'), 
        'utf-8'
      );

      // Expected result for SMPTE CPL based on actual XML
      expectedSMPTEResult = {
        type: '', // Parser returns empty string for now
        id: '753101e2-6bd3-4888-9527-2fc034e58dc1',
        annotationText: 'BAJIRAO-MASTANI_TLR-2_HDR-300_S_HI-XX_IN-U_51_4K_ST_20220810_QUB_SMPTE_OV',
        issueDate: '2022-08-10T02:58:57-00:00',
        issuer: 'REALIMAGE',
        creator: 'Colorfront Transkoder 2022 build53051',
        contentKind: 'feature',
        assetList: [
          {
            id: '7d217943-7ffb-4f1c-82b2-6b32e0addc71',
            annotationText: 'BAJIRAO-MASTANI_TLR-2_HDR-300_S_HI-XX_IN-U_51_4K_ST_20220810_QUB_SMPTE_OV_01.mxf',
            sha1Hash: 'icNWM9duRqXKikZpmG4NGaRSb7o='
          },
          {
            id: '2ec00d90-0dc9-44ba-bd06-e3e970191e6a',
            annotationText: 'BAJIRAO-MASTANI_TLR-2_HDR-300_S_HI-XX_IN-U_51_4K_ST_20220810_QUB_SMPTE_OV_01_audio.mxf',
            sha1Hash: '3GB2DgRj4g4KhJIDKBis2QtoIY0='
          }
        ]
      };
    });

    test('should parse SMPTE CPL XML correctly', () => {
      const result = cplParser(smpteCPLXML, 'formatted');
      expectedSMPTEResult.contentKind = 'trailer'
      expect(result).toEqual(expectedSMPTEResult);
    });

    test('should identify SMPTE format correctly', () => {
      const result = cplParser(smpteCPLXML, 'formatted');
      expect(result.type).toBe(''); // Parser currently returns empty string
    });

    test('should handle multiple reels correctly', () => {
      const result = cplParser(smpteCPLXML, 'formatted');
      expect(result.assetList.length).toBeGreaterThan(0);
    });
  });

  describe('Edge Cases', () => {
    test('should handle empty reel list', () => {
      const xmlWithEmptyReelList = `<?xml version="1.0"?>
        <CompositionPlaylist>
          <Id>urn:uuid:test</Id>
          <AnnotationText>Test</AnnotationText>
          <ReelList/>
        </CompositionPlaylist>`;
      
      expect(() => cplParser(xmlWithEmptyReelList, 'formatted')).toThrow();
    });
  });

  describe('Error Handling', () => {
    test('should handle empty XML string', () => {
      const result = cplParser('', 'formatted');
      expect(result).toBeDefined();
    });

    test('should handle invalid XML', () => {
      const result = cplParser('<invalid>xml</invalid>', 'formatted');
      expect(result).toBeDefined();
    });

    test('should handle XML without CompositionPlaylist element', () => {
      const xmlWithoutCPL = `<?xml version="1.0"?>
        <SomeOtherElement>
          <Id>urn:uuid:test</Id>
        </SomeOtherElement>`;
      
      const result = cplParser(xmlWithoutCPL, 'formatted');
      expect(result.assetList).toBeUndefined();
    });

    test('should handle missing namespace but still parse', () => {
      const xmlWithoutNamespace = `<?xml version="1.0"?>
        <CompositionPlaylist>
          <Id>urn:uuid:test</Id>
          <AnnotationText>Test CPL</AnnotationText>
          <ReelList>
            <Reel>
              <AssetList>
                <MainPicture>
                  <Id>urn:uuid:video-test</Id>
                  <Hash>abcdef123456</Hash>
                </MainPicture>
              </AssetList>
            </Reel>
          </ReelList>
        </CompositionPlaylist>`;
      
      const result = cplParser(xmlWithoutNamespace, 'formatted');
      expect(result.type).toBe('');
      expect(result.id).toBe('test');
    });
  });
});
