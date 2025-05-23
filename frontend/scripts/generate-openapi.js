import * as fs from "fs";
import path from "path";
import * as process from "process";
import * as sta from "swagger-typescript-api";

const apiUrl = process.env.API_URL;
const PATH_TO_OUTPUT_DIR = "./src/lib/api";

const TEMP_FILE = "./temp.json";

const API_JSON_URL = `${apiUrl}/api-docs-json`;

/** @type {sta.GenerateApiParams} */
const baseConfig = {
  output: path.resolve(process.cwd(), PATH_TO_OUTPUT_DIR),

  input: path.resolve(process.cwd(), TEMP_FILE),
  extractEnums: true,
  unwrapResponseData: true,
};

/**
 * Fetch json file from api
 * @param {String} url api url
 * @param {String} filename output file name
 * @param {sta.GenerateApiParams?} additionalConfig output file name
 *  */
const generateApi = async (url, filename, additionalConfig) => {
  const response = await fetch(url, {}).then((res) => res.json());

  fs.writeFileSync(TEMP_FILE, JSON.stringify(response));

  sta.generateApi({
    name: filename,
    ...baseConfig,
    ...additionalConfig,
  });

  fs.unlinkSync(TEMP_FILE);
};

// specify services here
generateApi(API_JSON_URL, "api-client.ts");
