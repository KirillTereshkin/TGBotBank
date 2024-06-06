import axios from "axios";

import * as cheerio from "cheerio";
import { BANK_REF } from "../constants";

export type BankData = {
  reportTitle: string;
  activeElementsArr: number[];
  passiveElementsArr: number[];
  resultActiveAndPassiveCalculaation: number;
};

const retrieveActiveAndPassiveData = (
  element: cheerio.Cheerio<cheerio.Element>,
  api: cheerio.CheerioAPI
) => {
  const arr: number[] = [];

  element.children().each((_, el) => {
    const tagData = api(el).text().trim();
    if (!tagData.length || tagData === "706") {
      return;
    }

    arr.push(Number(tagData.replace(/\s/g, "")));
  });

  return arr;
};

export const parseBankData = async () => {
  try {
    const reportsLinkHtml = await axios.get(`${BANK_REF}?id=400000031`);

    const reportsLinkHtmlData = cheerio.load(reportsLinkHtml.data);
    const foundReport = reportsLinkHtmlData('h3:contains("Форма 101")')
      .next("[data-versions=data-versions]")
      .children("[data-versions-items=2024]")
      .children()
      .last();
    const reportRef = foundReport.attr("href");
    const reportTitle = `Отчет ${foundReport.text().trim()}`;

    const reportHtml = await axios.get(`${BANK_REF}${reportRef}`);

    const reportHtmlData = cheerio.load(reportHtml.data);
    const elements706 = reportHtmlData('td:contains("706")').parent();

    const activeElementsArr = retrieveActiveAndPassiveData(
      elements706.eq(0),
      reportHtmlData
    );

    const passiveElementsArr = retrieveActiveAndPassiveData(
      elements706.eq(1),
      reportHtmlData
    );

    const resultActiveAndPassiveCalculaation =
      passiveElementsArr[1] -
      passiveElementsArr[0] -
      activeElementsArr[1] +
      activeElementsArr[0];

    const retrievedData = {
      reportTitle,
      activeElementsArr,
      passiveElementsArr,
      resultActiveAndPassiveCalculaation,
    };

    return retrievedData;
  } catch (error) {
    console.log(error);
    return null;
  }
};
