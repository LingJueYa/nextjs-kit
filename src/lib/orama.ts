// import { create, insert, search, type AnyOrama } from "@orama/orama";
// import { persist, restore } from "@orama/plugin-data-persistence";
// import { db } from "@/server/db";
// import { getEmbeddings } from "@/lib/embeddings";

// /**
//  * Orama搜索引擎管理类
//  */
// export class OramaManager {
//     private orama: AnyOrama;
//     private accountId: string;

//     /**
//      * @param accountId 账户ID
//      */
//     constructor(accountId: string) {
//         this.accountId = accountId;
//     }

//     /**
//      * 初始化Orama搜索引擎
//      * 如果存在二进制索引则恢复，否则创建新索引
//      */
//     async initialize(): Promise<void> {
//         const account = await db.account.findUnique({
//             where: { id: this.accountId },
//             select: { binaryIndex: true }
//         });

//         if (!account) throw new Error('账户未找到');

//         if (account.binaryIndex) {
//             this.orama = await restore('json', account.binaryIndex as any);
//         } else {
//             this.orama = await create({
//                 schema: {
//                     title: "string",
//                     body: "string",
//                     rawBody: "string",
//                     from: 'string',
//                     to: 'string[]',
//                     sentAt: 'string',
//                     embeddings: 'vector[1536]',
//                     threadId: 'string'
//                 },
//             });
//             await this.saveIndex();
//         }
//     }

//     /**
//      * 插入文档到索引
//      * @param document 要插入的文档
//      */
//     async insert(document: any): Promise<void> {
//         await insert(this.orama, document);
//         await this.saveIndex();
//     }

//     /**
//      * 执行向量搜索
//      * @param prompt 搜索提示
//      * @param numResults 返回结果数量
//      */
//     async vectorSearch({ prompt, numResults = 10 }: { prompt: string, numResults?: number }) {
//         const embeddings = await getEmbeddings(prompt);
//         return await search(this.orama, {
//             mode: 'hybrid',
//             term: prompt,
//             vector: {
//                 value: embeddings,
//                 property: 'embeddings'
//             },
//             similarity: 0.80,
//             limit: numResults,
//             // hybridWeights: {
//             //     text: 0.8,
//             //     vector: 0.2,
//             // }
//         });
//     }

//     /**
//      * 执行文本搜索
//      * @param term 搜索词
//      */
//     async search({ term }: { term: string }) {
//         return await search(this.orama, { term });
//     }

//     /**
//      * 保存索引到数据库
//      */
//     private async saveIndex(): Promise<void> {
//         const index = await persist(this.orama, 'json');
//         await db.account.update({
//             where: { id: this.accountId },
//             data: { binaryIndex: index as Buffer }
//         });
//     }
// }

// // 使用示例
// async function main() {
//     try {
//         const oramaManager = new OramaManager('67358');
//         await oramaManager.initialize();

//         // 搜索示例
//         const searchResults = await oramaManager.search({ term: "cascading" });
//         console.log(searchResults.hits.map((hit) => hit.document));
//     } catch (error) {
//         console.error("Orama操作出错:", error);
//     }
// }

// // main().catch(console.error);
