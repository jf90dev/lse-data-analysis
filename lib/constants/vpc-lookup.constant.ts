import {VpcVersion} from "../helpers";

export const VpcLookup = {
    local : {version: VpcVersion.version1, environmentName: 'Core1'},
    coreHubDev : {version: VpcVersion.version2, environmentName: 'Core3'},
    coreProd: {version: VpcVersion.version2, environmentName: 'Core1'},
    icDev: {version: VpcVersion.version1, environmentName: 'ICDev1'},
    icProd: {version: VpcVersion.version1, environmentName: 'ProdGreen1'},
    ajbDev: {version: VpcVersion.version2, environmentName: 'YIDev'},
    ajbProd: {version: VpcVersion.version2, environmentName: 'Prod1'}
}
