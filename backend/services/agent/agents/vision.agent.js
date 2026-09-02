import { getModel } from "../config/llmModels.js";
import axios from "axios";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";
import { deductCredits } from "../utils/deductCredits.js";
import { checkAgentLimit } from "../config/agentLimit.js";

export const visionAgent = async (state) => {
  try {
    console.log("I am the vision agent");
    await checkAgentLimit(state.userId, "vision");

    const llm = await getModel("image");
    const res = await llm.invoke(`
    You are an elite AI imahe prompt engineer.

    Convert the user request into a highly detailed image generation prompt.

    Requirements:

    - Cinematic lighting
    - Professional composition
    - Ultra realistic
    - High detail
    - Beautiful color palette
    - Sharp focus
    - 8K quality
    - Photorealistic
    - Depth of field
    - Professional photography
    - Stunning visuals

    Return only the image prompt.

    User Request: 

    ${state.prompt}

    `);

    const prompt = res.content.trim();

    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`;

    const imageRes = await axios.get(imageUrl, { responseType: "arraybuffer" });

    await deductCredits(state.userId, "vision");

    const buffer = Buffer.from(imageRes.data);
    const downloadUrl = await uploadToCloudinary(buffer, "image");

    return {
      ...state,
      aiResponse: `# Image Generated Successfully

![Generated Image](${downloadUrl})

[Download Image](${downloadUrl})`,
      //   images: [downloadUrl],
    };
  } catch (error) {
    if (error.status === 429) {
      return {
        ...state,
        aiResponse: error?.data?.message,
      };
    }
    return {
      ...state,
      aiResponse: "Failed to generate image.",
    };
  }
};
