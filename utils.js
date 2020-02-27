const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

const fetchPage = async url => {
  const result = await axios(url).then(resp => {
    return resp;
  });
  return cheerio.load(result);
};

const getData = async url => {
  const $ = await fetchPage(url);
  const html = $.html();
  const targetIdx = html.indexOf("var data =");
  const dataLineHtml = html.slice(targetIdx).split(/\r\n|\r|\n/)[0];
  const dataIdx = dataLineHtml.indexOf("=") + 8;
  const leftHtml = cheerio.load(dataLineHtml.slice(dataIdx).slice(0, -7));
  return { reksa: JSON.parse(cheerio.text(leftHtml("body"))) };
};

const generateFile = async (fileName, url) => {
  const data = await getData(url);
  let file =
    "nama,umur,one day,one month,three months,six months,one year,two year,three year,five year";
  file += "\r\n";
  data.reksa
    .sort((a, b) => b.return.oneyear - a.return.oneyear)
    .map(item => {
      file += item.name;
      file += ",";
      file += item.umur;
      file += ",";
      file += item.return.oneday;
      file += ",";
      file += item.return.onemonth;
      file += ",";
      file += item.return.threemonth;
      file += ",";
      file += item.return.sixmonth;
      file += ",";
      file += item.return.oneyear;
      file += ",";
      file += item.return.twoyear;
      file += ",";
      file += item.return.threeyear;
      file += ",";
      file += item.return.fiveyear;
      file += "\r\n";
    });
  fs.writeFileSync(fileName + ".csv", file);
};

module.exports = generateFile;
