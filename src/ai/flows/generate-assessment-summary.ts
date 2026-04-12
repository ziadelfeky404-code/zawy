'use server';
/**
 * @fileOverview This file implements a Genkit flow for generating a concise summary
 * of a child's assessment activity data, highlighting strengths and areas for development.
 *
 * - generateAssessmentSummary - A function that handles the generation of the assessment summary.
 * - GenerateAssessmentSummaryInput - The input type for the generateAssessmentSummary function.
 * - GenerateAssessmentSummaryOutput - The return type for the generateAssessmentSummary function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateAssessmentSummaryInputSchema = z.object({
  childProfile: z
    .string()
    .describe(
      'A brief profile of the child undergoing assessment, including age and any relevant background.'
    ),
  activityDescription: z
    .string()
    .describe(
      'A description of the interactive assessment activities performed by the child.'
    ),
  performanceObservations: z
    .string()
    .describe(
      'Detailed observations of the child\'s performance during the activities, including specific examples of responses, successes, and difficulties.'
    ),
});
export type GenerateAssessmentSummaryInput = z.infer<
  typeof GenerateAssessmentSummaryInputSchema
>;

const GenerateAssessmentSummaryOutputSchema = z.object({
  summary: z
    .string()
    .describe(
      'A concise overall summary of the child\'s performance during the assessment.'
    ),
  strengths: z
    .array(z.string())
    .describe('A list of key strengths identified in the child\'s performance.'),
  areasForDevelopment: z
    .array(z.string())
    .describe(
      'A list of key areas where the child could improve or needs further support.'
    ),
  recommendations: z
    .string()
    .describe(
      'General recommendations for further educational planning or intervention based on the assessment.'
    ),
});
export type GenerateAssessmentSummaryOutput = z.infer<
  typeof GenerateAssessmentSummaryOutputSchema
>;

export async function generateAssessmentSummary(
  input: GenerateAssessmentSummaryInput
): Promise<GenerateAssessmentSummaryOutput> {
  return generateAssessmentSummaryFlow(input);
}

const assessmentSummaryPrompt = ai.definePrompt({
  name: 'assessmentSummaryPrompt',
  input: { schema: GenerateAssessmentSummaryInputSchema },
  output: { schema: GenerateAssessmentSummaryOutputSchema },
  prompt: `أنت مساعد ذكاء اصطناعي متخصص في مساعدة الأخصائيين على تلخيص بيانات أنشطة تقييم الأطفال.

المتخصص يحتاج إلى ملخص موجز يسلط الضوء على نقاط قوة الطفل ومجالات تطوره لإعداد التقارير الأولية وتصميم الخطط التعليمية.
لا تقم بالتشخيص بشكل مستقل؛ ركز فقط على تلخيص الملاحظات المقدمة.

ملف تعريف الطفل: {{{childProfile}}}
وصف النشاط: {{{activityDescription}}}
ملاحظات الأداء: {{{performanceObservations}}}`,
});

const generateAssessmentSummaryFlow = ai.defineFlow(
  {
    name: 'generateAssessmentSummaryFlow',
    inputSchema: GenerateAssessmentSummaryInputSchema,
    outputSchema: GenerateAssessmentSummaryOutputSchema,
  },
  async (input) => {
    const { output } = await assessmentSummaryPrompt(input);
    return output!;
  }
);
