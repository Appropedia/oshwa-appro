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

  if (missingFields.length > 0) {
    return missingFields;
  } else {
    const parsedApproData = {
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
    return parsedApproData;
  }
}

// Don't think i need this?
async function submitCertification(formData) {
  /*
  formData = {
    "noCommercialRestriction": false,
    "noDocumentationRestriction": false,
    "openHardwareComponents": false,
    "noSpecificProduct": false,
    "explanationNcr": "45",
    "explanationNdr": "586",
    "explanationOhwc": "585",
    "creatorContribution": false,
    "explanationCcr": "hjk",
    "noUseRestriction": false,
    "explanationNur": "hj",
    "redistributedWork": false,
    "explanationRwr": "jk",
    "explanationNsp": "hj",
    "noComponentRestriction": false,
    "explanationNor": "jkk",
    "technologyNeutral": true
  }
  */

  // would be good if api didn't use spaces and returned arrays
  // could try and get projectDescription
  var oshwaData = {
    certificationMarkTerms: {
      accurateContactInformation: {
        agreement: true,
      },
      complianceWithOfficialCertificationGuidelines: {

        agreement: true,
      },
      oshwaCertificationMark: {
        agreement: true,
      },
      violationsEnforcement: {
        agreement: true,
      },
      responsibility: {
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

  const merged = { ...oshwaData, ...formData };

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
