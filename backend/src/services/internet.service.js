import { tavily } from "@tavily/core";

const tvly = tavily({ apiKey: process.env.TAVILY_API_KEY });
async function internetSearch({query}){
    const response = await tvly.search(query,{depth: "advanced",max_results: 5,});
    return JSON.stringify(response);
}

export default internetSearch;