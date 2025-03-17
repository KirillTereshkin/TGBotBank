import axios from "axios";
import * as cheerio from "cheerio";

import { BankData, Banks } from "../../model";
import { CBR_BANKS_REF, CBR_COIN_INFO } from "../../constants";

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

export const parseBankData = async (
  bankName: Banks,
  url: string,
  postfix: string
): Promise<BankData | null> => {
  try {
    const reportsLinkHtml = await axios.get(`${url}${postfix}`);

    const reportsLinkHtmlData = cheerio.load(reportsLinkHtml.data);
    const foundReport = reportsLinkHtmlData('h3:contains("Форма 101")')
      .next("[data-versions=data-versions]")
      .children("[data-versions-items=2025]")
      .children()
      .last();
    const reportRef = new URL(foundReport.attr("href") || "", CBR_COIN_INFO)
      .href;
    const reportTitle = `Отчет ${foundReport.text().trim()}`;

    const reportHtml = await axios.get(reportRef);

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

    const retrievedData: BankData = {
      bankName,
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

export const parseCbrBanksData = async () => {
  try {
    const cbrArr = Object.entries(CBR_BANKS_REF).map(
      ([bankName, { url, postfix }]) =>
        parseBankData(bankName as Banks, url, postfix)
    );

    const data = await Promise.allSettled(cbrArr);

    const dataProcessed = data.reduce((prev, itm) => {
      if (itm.status === "fulfilled" && itm.value) {
        return [...prev, itm.value];
      }

      return prev;
    }, [] as BankData[]);

    return dataProcessed;
  } catch (error) {
    console.log(error);
  }
};
