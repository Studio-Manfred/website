export type Article = {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  image: string;
  content: string;
};

export const articles: Article[] = [
  {
    slug: "road-to-average-part-4",
    title: "Road to Average part 4 — did she make it?",
    date: "12/20/24",
    author: "Moa Bogren",
    excerpt:
      "This is the fourth and probably last part in this series, at least for a while. Continue to read if you wanna know why this might be my last part ever or if it is true.",
    image:
      "https://images.squarespace-cdn.com/content/v1/64031d3382d84d3e45672488/1734686786513-LGSP1O2RG91FKDO3TYQN/LastpieceCoverPage.png",
    content: "",
  },
  {
    slug: "critical-design-from-theory-to-practice",
    title: "Critical Design — from theory to practice",
    date: "12/6/24",
    author: "Moa Bogren",
    excerpt:
      'As I wrote in an earlier article, me and Jens facilitated a workshop during the Stockholm Xperience conference. The theme of the conference was "Design for a better world", so I felt it was a better opportunity for us to do our Critical Design workshop.',
    image:
      "https://images.squarespace-cdn.com/content/v1/64031d3382d84d3e45672488/1733488454172-3YTB9DOY1R3UYML2WRI5/criticaldesign.png",
    content: "",
  },
  {
    slug: "critical-and-ethical-design-from-theory-to-practice",
    title: "Critical and Ethical Design From Theory to Practice",
    date: "11/11/24",
    author: "Moa Bogren",
    excerpt:
      "Throughout the years we have become more and more dependent on technology, and with great power comes great... you know, responsibility.",
    image:
      "https://images.squarespace-cdn.com/content/v1/64031d3382d84d3e45672488/1731342634615-CU8MIRG227HAPUT1V1J2/coverpageCD.png",
    content: "",
  },
  {
    slug: "to-be-a-qualitative-researcher",
    title: "To be a qualitative researcher, or just to be a researcher?",
    date: "9/9/24",
    author: "Moa Bogren",
    excerpt:
      "In this post I will cover the topic of Fixed vs Growth mindset, based on Carol S. Dweck's theory about how much your mindset affects your ability to accomplish things.",
    image:
      "https://images.squarespace-cdn.com/content/v1/64031d3382d84d3e45672488/1725884734786-666L40K923KCAO87N4DH/Research+-+that+is+the+question.png",
    content: "",
  },
  {
    slug: "road-to-average-part-3",
    title: "Road to Average part 3 — practice and updates",
    date: "6/20/24",
    author: "Moa Bogren",
    excerpt:
      'The CEO of Play, I started an experiment called "Road to Average". In this experiment I will see how long it will take me to reach average status in Counter Strike 2.',
    image:
      "https://images.squarespace-cdn.com/content/v1/64031d3382d84d3e45672488/1718872544742-V76N9S14GZHXQGU8EGO4/coverimage.png",
    content: "",
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
