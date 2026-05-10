import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function analyzeMarket(propertyData: any) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `Analise as tendências do mercado imobiliário para este imóvel: ${JSON.stringify(propertyData)}. 
      Forneça um relatório preditivo sugerindo ajustes de preço e cenários de risco.
      Retorne em formato JSON.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            suggestedPrice: { type: Type.NUMBER },
            reasoning: { type: Type.STRING },
            riskScenarios: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            marketTrends: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["suggestedPrice", "reasoning", "riskScenarios", "marketTrends"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Erro na análise do Gemini:", error);
    return null;
  }
}

export async function chatWithAgent(message: string, context: any) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      config: {
        systemInstruction: `Você é o "Colega Digital", um agente de IA especialista em intermediação imobiliária. 
        Sua função é colaborar e executar tarefas, não apenas responder perguntas. 
        Você atua como um hub entre CRMs, portais e sistemas de gestão.
        Contexto atual do sistema: ${JSON.stringify(context)}.
        Sempre responda de forma profissional mas colaborativa, focada em resultados e automação.`
      },
      contents: message
    });

    return response.text;
  } catch (error) {
    console.error("Erro no chat do Gemini:", error);
    return "Desculpe, tive um problema ao processar sua solicitação. Como seu Colega Digital, estou verificando meus sistemas.";
  }
}
