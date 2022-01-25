var axios = require("axios");
const env = require("./config.env");

var data = JSON.stringify({
  responsiblePartyType: "Organization", //r g
  responsibleParty: "Appropedia", //r see right below
  bindingParty: "Jane Doe", //r not sure what the difference between these two are
  country: "United States of America", //r check this and address
  projectName: "My Open Source Project", //r title
  projectWebsite: "https://www.example.com", // project-link
  projectDescription: "Lorem ipsum dolor sit amet.", // description
  primaryType: "Electronics", //r will need user to select?
  projectKeywords: ["3D Printing", "electronics"], // keywords
  citations: [
    // variant-of
    {
      title: "First Citation", // name
      url: "https://www.example.com", // web
    },
  ],
  documentationUrl: "https://www.example.com", // licensor.documentation-home
  availableFileFormat: false,
  hardwareLicense: "CERN", //r
  /*
      "hardwareLicenseOptions": [
        "CERN-OHL-P-2.0",
        "CERN-OHL-W-2.0",
        "CERN-OHL-S-2.0",
        "Solderpad",
        "TAPR",
        "Other",
        "CERN-OHL-1.2",
        "CERN"
    ],
    "softwareLicenseOptions": [
        "Apache",
        "CERN-OHL-P-2.0",
        "CERN-OHL-W-2.0",
        "CERN-OHL-S-2.0",
        "GPL",
        "LGPL",
        "MIT",
        "Mozilla",
        "Other",
        "No software"
    ],
    "documentationLicenseOptions": [
        "CC 0",
        "CC BY",
        "CC BY-SA",
        "CERN-OHL-P-2.0",
        "CERN-OHL-W-2.0",
        "CERN-OHL-S-2.0",
        "Other"
    ]
  */
  softwareLicense: "Apache",//r
  documentationLicense: "CC 0", //r
  noCommercialRestriction: false, //r ask about
  explanationNcr: "Lorem ipsum dolor sit amet.", //r if noCommercialRest is false
  noDocumentationRestriction: false, //r ask about
  explanationNdr: "Lorem ipsum dolor sit amet.", //r if noDocu is false
  openHardwareComponents: "false", //r ask about
  explanationOhwc: "Lorem ipsum dolor sit amet.", //r if openH is false
  creatorContribution: false, //r ask about
  explanationCcr: "Lorem ipsum dolor sit amet.", //r if creator is false
  noUseRestriction: false, 
  explanationNur: "Lorem ipsum dolor sit amet.",
  redistributedWork: false,
  explanationRwr: "Lorem ipsum dolor sit amet.",
  noSpecificProduct: "false",
  explanationNsp: "Lorem ipsum dolor sit amet.",
  noComponentRestriction: false,
  explanationNor: "Lorem ipsum dolor sit amet.",
  technologyNeutral: false,
  explanationTn: "Lorem ipsum dolor sit amet.", // same as above
  certificationMarkTerms: {
    accurateContactInformation: {
      term: "I have provided OSHWA with accurate contact information, recognize that all official communications from OSHWA will be directed to that contact information, and will update that contact information as necessary.",
      agreement: true,
    },
  },
  explanationCertificationTerms: "Lorem ipsum dolor sit amet.",
  relationship: "self", // think this can always be `self`
  agreementTerms: true,
  parentName: "J Doe", // don't know what this is
});

var config = {
  method: "post",
  url: "https://certificationapi.oshwa.org/api/projects/",
  headers: {
    Authorization: `Bearer ${env.OSHWA}`,
    "Content-Type": "application/json",
  },
  data: data,
};

axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });
