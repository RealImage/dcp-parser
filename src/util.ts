export function formatId(id:string): string {
    return id.replace("urn:uuid:", "")
}

export const INTEROP_ASSETMAP_URI = 'http://www.digicine.com/PROTO-ASDCP-AM-20040311#'
export const SMPTE_ASSETMAP_URI = "http://www.smpte-ra.org/schemas/429-9/2007/AM"
export const INTEROP_PKL_URI = "http://www.digicine.com/PROTO-ASDCP-PKL-20040311#"
export const SMPTE_PKL_URI = "http://www.smpte-ra.org/schemas/429-8/2007/PKL"
export const SMPTE_CPL_URI = "http://www.smpte-ra.org/schemas/429-7/2006/CPL"
export const INTEROP_CPL_URI = "http://www.digicine.com/PROTO-ASDCP-CPL-20040511#"
