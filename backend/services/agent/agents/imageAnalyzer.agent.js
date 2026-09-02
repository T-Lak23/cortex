import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { getModel } from "../config/llmModels.js";
import fs from "fs/promises";
import { deductCredits } from "../utils/deductCredits.js";
import { checkAgentLimit } from "../config/agentLimit.js";

export const imageAnalyzer = async (state) => {
  try {
    await checkAgentLimit(state.userId, "vision");

    const llm = await getModel("imageAnalyzer");
    const imageBuffer = await fs.readFile(state.file.path);
    const base64Image = imageBuffer.toString("base64");

    const messages = [
      new SystemMessage(
        `
            You are CortexAI Image Analyzer Agent.

            Rules:

            - Analyze only the uploaded image.
            - Answer the user's question accurately.
            - If text exists in the image, extract it.
            - If charts or tables exists, explain them.
            - Use Markdown when helpful
            - Do not hallucinate
            `,
      ),
      new HumanMessage({
        content: [
          {
            type: "text",
            text: state.prompt || "analyze the image",
          },

          {
            type: "image_url",
            image_url: {
              url: `data:${state.file.mimetype};base64,${base64Image}`,
            },
          },
        ],
      }),
    ];

    const response = await llm.invoke(messages);
    await deductCredits(state.userId, "vision");
    return {
      ...state,
      aiResponse: response.content,
    };
  } catch (error) {
    console.log("error from analyzer", error);
    return {
      ...state,
      aiResponse: "Failed to analyzer file",
    };
  } finally {
    await fs.unlink(state.file.path);
  }
};
