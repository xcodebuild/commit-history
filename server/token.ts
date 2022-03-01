import * as process from "process";
import logger from "./logger";
import api from "../common/api";

const savedTokens: string[] = [];
let index = 0;

export const initTokenFromEnv = async () => {
  const envTokenString = process.env.TOKEN;
  if (!envTokenString) {
    logger.error("Token not found");
    process.exit(-1);
  }

  const tokenList = envTokenString.split(",");
  // Call GitHub API to check token usability
  for (const token of tokenList) {
    try {
      await api.getRepoStargazers("bytebase/star-history", token);
      savedTokens.push(token);
    } catch (error) {
      logger.error(`Token ${token} is unusable`, error);
    }
  }

  if (savedTokens.length === 0) {
    logger.error("No usable token");
    process.exit(-1);
  }

  logger.info(`Usable token amount: ${savedTokens.length}`);
};

// Get the next token for requests.
export const getNextToken = () => {
  index = (index + 1) % savedTokens.length;
  return savedTokens[index];
};
