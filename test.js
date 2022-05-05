var axios = require("axios");
const express = require("express");
var cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;
const bodyParser = require("body-parser");

const pageNames = [];
async function getProjectPages(cmcontinue) {
  if (cmcontinue) {
    return await axios.get(
      `https://www.appropedia.org/w/api.php?action=query&list=categorymembers&cmtitle=Category%3AProjects&format=json&cmlimit=500&cmcontinue=${cmcontinue}`
    );
  } else {
    return await axios.get(
      `https://www.appropedia.org/w/api.php?action=query&list=categorymembers&cmtitle=Category%3AProjects&format=json&cmlimit=500`
    );
  }
}

async function getProjectTitlesWrapper(cmcontinue) {
  console.log("🔍 Getting project titles...");
  return new Promise(async function getProjectTitles(
    resolve,
    reject,
    cmcontinue
  ) {
    const { data: resp } = await getProjectPages(cmcontinue);
    for (page of resp.query.categorymembers) {
      pageNames.push(page);
    }
    if (resp.continue) {
      getProjectTitles(resolve, reject, resp.continue.cmcontinue);
    } else {
      resolve();
    }
  });
}

async function getValidity(pageName) {
  console.log(pageName);
  const { data: resp } = await axios.get(
    `https://oshwa-appro-jackpeplinski.vercel.app/checkValidity/${pageName}`
  );

  if (Array.isArray(resp)) {
    return { validStatus: false, numberMissing: resp.length };
  } else {
    return { validStatus: true };
  }
}

async function start() {
  console.log("🏃🏽 Starting run...");
  await getProjectTitlesWrapper();
  for (page of pageNames) {
    console.log(page);
    var validCount = 0,
      invalidCount = 0,
      numberMissing = 0;
    const validity = await getValidity(page.title);
    if (validity.validStatus) {
      validCount++;
    } else {
      invalidCount++;
      numberMissing += numberMissing;
    }
  }
  console.log("Invalid count", invalidCount);
  console.log("Valid count", validCount);
  console.log("Number missing", numberMissing / invalidCount);
}

start();
