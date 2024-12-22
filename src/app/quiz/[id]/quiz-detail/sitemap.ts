// import {
//   getQuizListPublicApi,
//   getQuizQuestionAnswer,
// } from "@/api/quiz/quiz.rest";
// import type { MetadataRoute } from "next";

// export async function generateSitemaps() {
//   // Fetch the total number of products and calculate the number of sitemaps needed
//   return [{ id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }];
// }

// export default async function sitemap({
//   id,
// }: {
//   id: string;
// }): Promise<MetadataRoute.Sitemap> {
//   const data = await getQuizQuestionAnswer(id)
    
//   return ({
//     url: `https://www.ontaplade.com/quiz/${id}/`,
//     lastModified: quiz.updated_at,
//   });
// }
