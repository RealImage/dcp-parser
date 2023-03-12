export function formatId(id:string): string {
    return id.replace("urn:uuid:", "")
}

export const INTEROP_ASSETMAP_URI = 'http://www.digicine.com/PROTO-ASDCP-AM-20040311#'
export const SMTPE_ASSETMAP_URI = "http://www.smpte-ra.org/schemas/429-9/2007/AM"
export const INTEROP_PKL_URI = "http://www.digicine.com/PROTO-ASDCP-PKL-20040311#"
export const SMTPE_PKL_URI = "http://www.smpte-ra.org/schemas/429-8/2007/PKL"