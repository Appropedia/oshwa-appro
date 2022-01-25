var axios = require("axios");
const env = require("./config.env");

var data = JSON.stringify({
  responsiblePartyType: "Individual",
  responsibleParty: "Company Name",
  bindingParty: "Jane Doe",
  country: "United States of America",
  streetAddress1: "255 Pouros Circle",
  streetAddress2: "Suite 123",
  city: "Raleigh",
  state: "NC",
  postalCode: "27616",
  privateContact: "jane@example.com",
  publicContact: "jane.doe@example.com",
  projectName: "My Open Source Project",
  projectWebsite: "https://www.example.com",
  projectVersion: "1.0",
  previousVersions: ["US000000"],
  projectDescription: "Lorem ipsum dolor sit amet.",
  primaryType: "Electronics",
  additionalType: ["3D Printing"],
  projectKeywords: ["3D Printing", "electronics"],
  citations: [
    {
      title: "First Citation",
      url: "https://www.example.com",
    },
  ],
  documentationUrl: "https://www.example.com",
  availableFileFormat: false,
  hardwareLicense: "CERN",
  softwareLicense: "Apache",
  documentationLicense: "CC 0",
  noCommercialRestriction: false,
  explanationNcr: "Lorem ipsum dolor sit amet.",
  noDocumentationRestriction: false,
  explanationNdr: "Lorem ipsum dolor sit amet.",
  openHardwareComponents: "false",
  explanationOhwc: "Lorem ipsum dolor sit amet.",
  creatorContribution: false,
  explanationCcr: "Lorem ipsum dolor sit amet.",
  noUseRestriction: false,
  explanationNur: "Lorem ipsum dolor sit amet.",
  redistributedWork: false,
  explanationRwr: "Lorem ipsum dolor sit amet.",
  noSpecificProduct: "false",
  explanationNsp: "Lorem ipsum dolor sit amet.",
  noComponentRestriction: false,
  explanationNor: "Lorem ipsum dolor sit amet.",
  technologyNeutral: false,
  explanationTn: "Lorem ipsum dolor sit amet.",
  certificationMarkTerms: {
    accurateContactInformation: {
      term: "I have provided OSHWA with accurate contact information, recognize that all official communications from OSHWA will be directed to that contact information, and will update that contact information as necessary.",
      agreement: true,
    },
  },
  explanationCertificationTerms: "Lorem ipsum dolor sit amet.",
  relationship: "self",
  agreementTerms: true,
  parentName: "J Doe",
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
