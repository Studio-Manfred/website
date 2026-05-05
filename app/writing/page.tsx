import type { Metadata } from "next";
import { PageNav } from "@/components/PageNav";
import { Footer } from "@/components/Footer";
import { FadeIn } from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Writing — Studio Manfred",
  description: "Thoughts, articles, and insights from the Studio Manfred team.",
};

const articles = [
  {
    title: "Road to Average part 4 — did she make it?",
    date: "12/20/24",
    excerpt:
      "This is the fourth and probably last part in this series, at least for a while. Continue to read if you wanna know why this might be my last part ever or if it is true.",
    href: "https://www.studiomanfred.com/news/road-to-average-part-4-did-she-make-it",
    image:
      "https://images.squarespace-cdn.com/content/v1/64031d3382d84d3e45672488/1734686786513-LGSP1O2RG91FKDO3TYQN/LastpieceCoverPage.png",
  },
  {
    title: "Critical Design — from theory to practice",
    date: "12/6/24",
    excerpt:
      'As I wrote in an earlier article, me and Jens facilitated a workshop during the Stockholm Xperience conference. The theme of the conference was "Design for a better world", so I felt it was a better opportunity for us to do our Critical Design workshop.',
    href: "https://www.studiomanfred.com/news/critical-design-from-theory-to-practice",
    image:
      "https://images.squarespace-cdn.com/content/v1/64031d3382d84d3e45672488/1733488454172-3YTB9DOY1R3UYML2WRI5/criticaldesign.png",
  },
  {
    title: "Critical and Ethical Design From Theory to Practice",
    date: "11/11/24",
    excerpt:
      "Throughout the years we have become more and more dependent on technology, and with great power comes great... you know, responsibility.",
    href: "https://www.studiomanfred.com/news/critical-and-ethical-design-from-theory-to-practice",
    image:
      "https://images.squarespace-cdn.com/content/v1/64031d3382d84d3e45672488/1731342634615-CU8MIRG227HAPUT1V1J2/coverpageCD.png",
  },
  {
    title: "To be a qualitative researcher, or just to be a researcher?",
    date: "9/9/24",
    excerpt:
      "In this post I will cover the topic of Fixed vs Growth mindset, based on Carol S. Dweck's theory about how much your mindset affects your ability to accomplish things. It will also relate back to Mary J. Murphy's book 'Culture of Growth', where she writes about how a Fixed or Growth mindset can affect companies when it comes to risk taking, creativity and innovation.",
    href: "https://www.studiomanfred.com/news/to-be-a-qualitative-researcher-or-just-to-be-a-researcher",
    image:
      "https://images.squarespace-cdn.com/content/v1/64031d3382d84d3e45672488/1725884734786-666L40K923KCAO87N4DH/Research+-+that+is+the+question.png",
  },
  {
    title: "Road to Average part 3 — practice and updates",
    date: "6/20/24",
    excerpt:
      'The CEO of Play, I started an experiment called "Road to Average". In this experiment I will see how long it will take me to reach average status in Counter Strike 2 (CS2) for my skill group based on my current rank. I have no competitive import to the Steam Premier rating.',
    href: "https://www.studiomanfred.com/news/road-to-average-part-3-practice-and-updates",
    image:
      "https://images.squarespace-cdn.com/content/v1/64031d3382d84d3e45672488/1718872544742-V76N9S14GZHXQGU8EGO4/coverimage.png",
  },
];

export default function WritingPage() {
  return (
    <>
      <PageNav variant="blue" />
      <main className="bg-[var(--color-business-blue)] min-h-screen">
        <section style={{ padding: "0 60px" }} className="pt-32 md:pt-44 pb-24 md:pb-40">
          <div>
            {articles.map((article, i) => (
              <FadeIn key={article.title} delay={(i % 3) as 0 | 1 | 2}>
                <div style={{ paddingTop: "28px", paddingBottom: "40px" }}>
                  {/* Row */}
                  <a
                    href={article.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                    style={{ display: "flex", gap: "32px", alignItems: "flex-start", textDecoration: "none" }}
                  >
                    {/* Thumbnail */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={article.image}
                      alt={article.title}
                      style={{
                        flexShrink: 0,
                        width: "325px",
                        height: "325px",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />

                    {/* Text */}
                    <div style={{ flex: 1 }}>
                      <p
                        style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.6)", marginBottom: "14px", fontWeight: 300 }}
                      >
                        {article.date}
                      </p>
                      <h2
                        className="font-light text-white tracking-[var(--letter-spacing-tight)]"
                        style={{ fontSize: "62px", lineHeight: 1.05, marginBottom: "16px" }}
                      >
                        {article.title}
                      </h2>
                      <p
                        className="font-light text-white/75"
                        style={{ fontSize: "24px", lineHeight: 1.4, marginBottom: "20px" }}
                      >
                        {article.excerpt}
                      </p>
                      <span
                        style={{ fontSize: "24px", color: "#efd6d3", textDecoration: "underline", textUnderlineOffset: "3px", fontWeight: 300 }}
                      >
                        Read more
                      </span>
                    </div>
                  </a>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
