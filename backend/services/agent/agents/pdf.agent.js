import { checkAgentLimit } from "../config/agentLimit.js";
import { getModel } from "../config/llmModels.js";
import { deductCredits } from "../utils/deductCredits.js";
import { generatePdf } from "../utils/generatPdf.js";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";

export const pdfAgent = async (state) => {
  try {
    await checkAgentLimit(state.userId, "pdf");

    const llm = await getModel("pdf");
    const prompt = `
    You are an expert document writer.

    Return ONLY valid JSON.

    Do NOT return markdown.

    Do NOT return explanations.

    Structure:

    {
    
    "title":"",
    "subtitle":"",
    "sections":[
        {
        "heading":"",
        "points":[]
        }
    ]
    }

    Generate 4-8 sections.

    Each section should have 3-6 concise bullet points.

    Topic:

    ${state.prompt}

    `;

    const res = await llm.invoke(prompt);
    const data = JSON.parse(res.content);
    await deductCredits(state.userId, "pdf");

    const pdfBuffer = await generatePdf(data);

    console.log("PDF size:", pdfBuffer.length);
    console.log("PDF header:", pdfBuffer.subarray(0, 5).toString());

    const downloadUrl = await uploadToCloudinary(
      pdfBuffer,
      "image",
      `cortexai-${Date.now()}`,
    );

    return {
      ...state,
      aiResponse: `# PDF Generated

**${data.title}**

[Download PDF](${downloadUrl})`,
    };
  } catch (error) {
    console.log(error);

    return {
      ...state,
      aiResponse: "Failed to generate PDF...",
    };
  }
};
