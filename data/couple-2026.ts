import { Question } from "@/types/questionnaire";
export const cities = ["北京","上海","杭州","南京","苏州","成都","重庆","广州","深圳","厦门","青岛","西安","长沙","武汉"];
export const wordOptions = ["温柔","勇敢","有趣","认真","可爱","嘴硬","稳定","浪漫","敏感","自由","可靠","热情","慢热","固执","细心","独立"];
export const perspectiveOptions = ["在忙","想自己待一会儿","有点不开心","不知道怎么回复","单纯没看到","我一般不会多想"];
export const coupleQuestions: Question[] = [
  { id:"cities", type:"city_map", creatorPrompt:"今年，我们一起去过哪些地方？", partnerPrompt:"今年，我们一起去过哪些地方？", helper:"选中去过的城市，让地图亮起来。", options:cities },
  { id:"drink", type:"drink_builder", creatorPrompt:"你觉得 TA 最喜欢喝什么？", partnerPrompt:"你自己最喜欢喝什么？", helper:"先选饮品，再选温度。", options:["奶茶","咖啡","果茶","柠檬水"] },
  { id:"words", type:"three_words", creatorPrompt:"用三个词形容 TA。", partnerPrompt:"用三个词形容今年的自己。", helper:"刚好三个，凭第一直觉选。", options:wordOptions },
  { id:"perspective", type:"perspective_choice", creatorPrompt:"当 TA 很久没有回复消息时，你觉得通常是什么原因？", partnerPrompt:"当你很久没有回复消息时，通常是什么原因？", helper:"没有正确答案，只是看看彼此读到了什么。", options:perspectiveOptions }
];
