
import { GoogleGenAI } from "@google/genai";
import { EmployeeProfile } from "../types";

// Always initialize with the direct process.env.API_KEY within the object.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getPerformanceInsights(profile: EmployeeProfile): Promise<string> {
  try {
    const prompt = `
      As an HR AI Assistant, analyze this employee performance data and provide a concise, motivational 2-sentence summary.
      Employee: ${profile.name}
      Role: ${profile.role}
      Tasks Completed: ${profile.tasks.filter(t => t.status === 'completed').length}
      Pending Tasks: ${profile.tasks.filter(t => t.status === 'pending').length}
      Leaves Taken: ${profile.leavesTaken}/${profile.totalLeaves}
      Wellness (Sleep Score): ${profile.averageSleepScore}%
      Recent Attendance: ${profile.attendance.map(a => a.status).join(', ')}
      
      Provide insights on productivity and work-life balance.
    `;

    // Use ai.models.generateContent with the appropriate model name.
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    // Access the text property directly on the response object.
    return response.text || "Keep up the great work! Your consistency in task completion is driving team success.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Analyzing your performance... you are showing strong progress this quarter!";
  }
}
