import http from "http";
import Koa from "koa";
import Router from "koa-router";
import { JSDOM } from "jsdom";
import logger from "./logger";
import XYChart from "../packages/xy-chart";
import { convertStarDataToChartData, getReposStarData } from "../common/chart";
import cache from "./cache";
import {
  getChartWidthWithSize,
  replaceSVGContentFilterWithCamelcase,
} from "./utils";
import { getNextToken, initTokenFromEnv } from "./token";
import { ChartMode } from "../types/chart";
import { CHART_SIZES, CHART_TYPES, MAX_REQUEST_AMOUNT } from "./const";

const startServer = async () => {
  await initTokenFromEnv();

  const app = new Koa();
  const router = new Router();

  // Example request link:
  // /svg?repos=bytebase/star-history&type=Date
  router.get("/svg", async (ctx) => {
    const repos = `${ctx.query["repos"]}`.split(",");
    let type = `${ctx.query["type"]}` as ChartMode;
    let size = `${ctx.query["size"]}`;

    if (!CHART_TYPES.includes(type)) {
      type = "Date";
    }

    if (!CHART_SIZES.includes(size)) {
      size = "laptop";
    }

    if (repos.length === 0) {
      ctx.throw(400, `${http.STATUS_CODES[400]}: Repo name required`);
      return;
    }

    const reposStarData = [];
    const nodataRepos = [];

    for (const repo of repos) {
      const cacheData = cache.get(repo);

      if (cacheData) {
        reposStarData.push({
          repo,
          starRecords: cacheData.starRecords,
        });
      } else {
        nodataRepos.push(repo);
      }
    }

    if (nodataRepos.length > 0) {
      const token = getNextToken();

      try {
        const data = await getReposStarData(
          nodataRepos,
          token,
          MAX_REQUEST_AMOUNT
        );

        for (const d of data) {
          cache.set(d.repo, {
            starRecords: d.starRecords,
            starAmount: d.starRecords[d.starRecords.length - 1].count,
          });
          reposStarData.push(d);
        }
      } catch (error: any) {
        const status = error.status || 400;
        const message =
          error.message || "Some unexpected error happened, try again later";

        if (status === 404) {
          // do nth, repo from user not found.
        } else {
          logger.error("Failed to request data", error);
        }

        ctx.status = status;
        ctx.message = `${http.STATUS_CODES[status]}: ${message}`;
        return;
      }
    }

    const dom = new JSDOM(`<!DOCTYPE html><body></body>`);
    const body = dom.window.document.querySelector("body");
    const svg = dom.window.document.createElement(
      "svg"
    ) as unknown as SVGSVGElement;

    if (!dom || !body || !svg) {
      ctx.throw(
        500,
        `${http.STATUS_CODES[500]}: Failed to mock dom with JSDOM`
      );
      return;
    }

    body.append(svg);
    svg.setAttribute("width", `${getChartWidthWithSize(size)}`);
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");

    try {
      XYChart(
        svg,
        {
          title: "Commit history",
          xLabel: type === "Date" ? "Date" : "Timeline",
          yLabel: "GitHub Stars",
          data: convertStarDataToChartData(reposStarData, type),
          showDots: false,
        },
        {
          xTickLabelType: type === "Date" ? "Date" : "Number",
        }
      );
    } catch (error) {
      ctx.throw(
        500,
        `${http.STATUS_CODES[500]}: Failed to generate chart, ${error}`
      );
      return;
    }

    const svgContent = replaceSVGContentFilterWithCamelcase(svg.outerHTML);

    const now = new Date().toLocaleDateString("en-US");
    ctx.type = "image/svg+xml;charset=utf-8";
    ctx.set("cache-control", "no-cache");
    ctx.set("date", `${now}`);
    ctx.set("expires", `${now}`);
    ctx.body = svgContent;
  });

  app.on("error", (err) => {
    logger.error("server error: ", err);
  });

  app.use(router.routes()).use(router.allowedMethods());

  app.listen(8080, () => {
    logger.info(`server running on port ${8080}`);
  });
};

startServer();
