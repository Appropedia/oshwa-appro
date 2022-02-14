var axios = require("axios");
const env = require("./config.env");
const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.get("/checkValidity/:pageName", async (req, res) => {
  const missingFields = [];

  const { data: approData } = await axios.get(
    `https://www.appropedia.org/w/rest.php/semantic/v0/${req.params.pageName}`
  );
  if (approData) {
    const affliations = approData["Affiliations"];
    const pageAuthors = approData["Page authors"];
    const mapResult = approData["Map result"];
    const title = approData["Title"];
    const url = approData["URL"];
    const uses = approData["Uses"]?.split(", ");
    var primaryType;
    const keywords = approData["Keywords"]?.split(", "); // not required

    console.log(approData["Affiliations"]);
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
          }
        }
      }
      if (!primaryType) {
        missingFields.push("Uses");
      }
    }

    if (missingFields.length > 0) {
      return res.send(missingFields);
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
      return res.send(parsedApproData);
    }
  } else {
    return res.send("No response from Appropedia.");
  }
});

app.post("/submitCertification", async (req, res) => {
  console.log(req.body);
  var config = {
    method: "post",
    url: "https://certificationapi.oshwa.org/api/projects/",
    headers: {
      Authorization: `Bearer ${env.OSHWA}`,
      "Content-Type": "application/json",
    },
    data: JSON.stringify(req.body),
  };

  axios(config)
    .then(function (response) {
      res.send(JSON.stringify(response.data));
    })
    .catch(function (error) {
      res.send(error);
    });
});
