var axios = require("axios");
const env = require("./config.env");

export async function checkValidity(pageName) {
  const missingFields = [];

  const { data: approData } = await axios.get(
    `https://www.appropedia.org/w/rest.php/semantic/v0/${pageName}`
  );

  const affliations = approData["Affiliations"];
  const pageAuthors = approData["Page authors"];
  const mapResult = approData["Map result"];
  const title = approData["Title"];
  const url = approData["URL"];
  const uses = approData["Uses"].split(", ");
  var primaryType;
  const keywords = approData["Keywords"].split(", "); // not required

  if (!affliations) missingFields.push("Affiliations");
  if (!pageAuthors) missingFields.push("Page author");
  if (!mapResult) missingFields.push("Map result");
  if (!title) missingFields.push("Title");
  if (!url) missingFields.push("URL");

  var optionsConfig = {
    method: "get",
    url: "https://certificationapi.oshwa.org/api/options",
    headers: {
      Authorization: `Bearer ${env.OSHWA}`,
    },
  };

  const {
    data: { primaryTypeOptions },
  } = await axios(optionsConfig);

  if (!uses) {
    missingFields.push("Uses");
  } else {
    for (const use of uses) {
      for (const primaryTypeOption of primaryTypeOptions) {
        if (use.toLowerCase() == primaryTypeOption.toLowerCase()) {
          primaryType = primaryTypeOptions;
        } else {
          missingFields.push("Uses");
        }
      }
    }
  }

  partialOSHWAData = {
    responsiblePartyType: "Organization", //r "Organization"
    responsibleParty: affliations, //r [Affliations]
    bindingParty: pageAuthors, //r [Page authors]
    country: mapResult.substr(0, mapResult.indexOf("~")), //r [Map result]
    projectName: title, //r [Title]
    projectWebsite: url, // [URL]
    primaryType: primaryType, //r [Uses]
    hardwareLicense: "Other", //r "Other"
    softwareLicense: "Other", //r "Other"
    documentationLicense: "Other", //r "Other"
  };

  if (missingFields.length > 0) {
    return missingFields;
  } else {
    return partialOSHWAData;
  }
}

async function submitCertification(partialOSHWAData) {
  // would be good if api didn't use spaces and returned arrays
  // could try and get projectDescription
  var oshwaData = {
    // responsiblePartyType: "Organization", //r "Organization"
    // responsibleParty: affliations, //r [Affliations]
    // bindingParty: pageAuthors, //r [Page authors]
    // country: mapResult.substr(0, mapResult.indexOf("~")), //r [Map result]
    // projectName: title, //r [Title]
    // projectWebsite: url, // [URL]
    // primaryType: primaryType, //r [Uses]
    // hardwareLicense: "CERN", //r "Other"
    // softwareLicense: "Apache", //r "Other"
    // documentationLicense: "CC 0", //r "Other"
    // ask users for the below fields. all explanations are r unless false
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
    noSpecificProduct: "falsmedia e",
    explanationNsp: "Lorem ipsum dolor sit amet.",
    noComponentRestriction: false,
    explanationNor: "Lorem ipsum dolor sit amet.",
    technologyNeutral: false,
    explanationTn: "Lorem ipsum dolor sit amet.",
    // ask users
    certificationMarkTerms: {
      accurateContactInformation: {
        term: "I have provided OSHWA with accurate contact information, recognize that all official communications from OSHWA will be directed to that contact information, and will update that contact information as necessary.",
        agreement: true,
      },
      complianceWithOfficialCertificationGuidelines: {
        term: "I will only use the certification mark in compliance with official certification guidelines.",
        agreement: true,
      },
      oshwaCertificationMark: {
        term: "I acknowledge that all right, title, and interest in the certification mark remains with OSHWA.",
        agreement: true,
      },
      violationsEnforcement: {
        term: "I acknowledge that OSHWA has the right to enforce violations of the use of the mark. This enforcement may involve financial penalties for misuse in bad faith.",
        agreement: true,
      },
      responsibility: {
        term: "I have the ability to bind those responsible for the certified item to this agreement.",
        agreement: true,
      },
    },
    explanationCertificationTerms: "Lorem ipsum dolor sit amet.",
    relationship: "self",
    agreementTerms: true,
    parentName: "J Doe",
  };
  if (keywords) {
    oshwaData.projectKeywords = keywords;
  }

  const merged = { ...oshwaData, ...partialOSHWAData };

  var optionsConfig = {
    method: "post",
    url: "https://certificationapi.oshwa.org/api/projects/",
    headers: {
      Authorization: `Bearer ${env.OSHWA}`,
      "Content-Type": "application/json",
    },
    data: merged,
  };

  // axios(config)
  //   .then(function (response) {
  //     console.log(JSON.stringify(response.data));
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
}

submitCertification("3D_printed_bike_pedal");
