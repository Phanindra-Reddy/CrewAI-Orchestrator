import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import ReactMarkdown from "react-markdown";

const CursorSVG = () => (
  <svg
    viewBox="8 4 8 16"
    xmlns="http://www.w3.org/2000/svg"
    className="cursor inline-block ml-1"
  >
    <rect x="10" y="6" width="4" height="12" fill="#fff" />
  </svg>
);

const output = {
  researcher: {
    status: "done",
    output: {
      raw: '### Research Brief on Agentic AI\n\n#### 1. Definition of Agentic AI\n- **Agentic AI** refers to artificial intelligence systems that possess a degree of autonomy and decision-making capability, allowing them to operate independently in complex environments.\n- Characterized by:\n  - Goal-setting and prioritization\n  - Self-directed learning and adaptation\n  - Capability to interact with their environment and other agents\n\n#### 2. Key Features\n- **Autonomy**: Operates without human intervention under specified conditions.\n- **Adaptability**: Learns from experiences and modifies behavior.\n- **Decision-making**: Capable of making choices based on complex algorithms and learned data.\n- **Social Interaction**: Engages with other agents and human counterparts to fulfill tasks.\n\n#### 3. Applications\n- **Robotics**: Robots used in manufacturing, healthcare, and exploration, utilizing agentic AI for dynamic interaction with environments.\n- **Autonomous Vehicles**: Self-driving cars employ agentic AI to navigate and make decisions in real-time.\n- **Smart Assistants**: AI-driven applications like personal assistants that learn user preferences and manage tasks efficiently.\n- **Gaming**: Non-player characters (NPCs) in video games exhibiting advanced behaviors and decision-making strategies.\n\n#### 4. Challenges\n- **Ethics**: Concerns over decision-making without human oversight, potential bias in algorithms, and responsibility for actions taken by AI.\n- **Safety**: Risks associated with autonomous operations, needing robust fail-safes and accountability mechanisms.\n- **Complexity**: Designing agentic AI systems that can manage unpredictability in real-world scenarios.\n\n#### 5. Current Trends and Research\n- **Interdisciplinary Collaboration**: Merging fields such as neuroscience, psychology, and computer science to drive better agentic AI development.\n- **Reinforcement Learning**: Enhancing capabilities through trial-and-error learning, refining decision-making processes over time.\n- **Human-AI Collaboration**: Focusing on AI systems that augment human capabilities rather than replace them, ensuring beneficial coexistence.\n  \n#### 6. Key Sources\n- **Research Papers**: \n  - "What Is Agentic AI?" by Ben Goertzel, published in the Journal of Artificial General Intelligence.\n  - "Autonomous Agents and Multi-Agent Systems" by Michael Wooldridge.\n- **Web Resources**: \n  - Future of Life Institute - [Understanding Agentic AI](https://futureoflife.org)\n  - MIT Technology Review - [The Rise of Agentic AI](https://www.technologyreview.com)\n\n#### 7. Future Directions\n- Expansion of ethical guidelines governing agentic AI development.\n- Innovations in AI safety protocols to reduce risks associated with autonomy.\n- Continued research into AI-human partnership paradigms for collaborative environments.\n\nThis structured research provides a comprehensive overview of agentic AI, detailing its features, applications, challenges, trends, and key references for further reading.',
      pydantic: null,
      json_dict: null,
      tasks_output: [
        {
          description:
            "You are the Researcher. Conduct thorough, factual research on the topic below.\n- Provide structured sections with bullet points.\n- Cite key sources or references (titles/links if known).\n- Avoid writing prose articles; focus on findings.\n\nTopic: please research on agentic AI",
          name: "You are the Researcher. Conduct thorough, factual research on the topic below.\n- Provide structured sections with bullet points.\n- Cite key sources or references (titles/links if known).\n- Avoid writing prose articles; focus on findings.\n\nTopic: please research on agentic AI",
          expected_output:
            "A structured research brief with key findings, evidence, and sources.",
          summary:
            "You are the Researcher. Conduct thorough, factual research on the...",
          raw: '### Research Brief on Agentic AI\n\n#### 1. Definition of Agentic AI\n- **Agentic AI** refers to artificial intelligence systems that possess a degree of autonomy and decision-making capability, allowing them to operate independently in complex environments.\n- Characterized by:\n  - Goal-setting and prioritization\n  - Self-directed learning and adaptation\n  - Capability to interact with their environment and other agents\n\n#### 2. Key Features\n- **Autonomy**: Operates without human intervention under specified conditions.\n- **Adaptability**: Learns from experiences and modifies behavior.\n- **Decision-making**: Capable of making choices based on complex algorithms and learned data.\n- **Social Interaction**: Engages with other agents and human counterparts to fulfill tasks.\n\n#### 3. Applications\n- **Robotics**: Robots used in manufacturing, healthcare, and exploration, utilizing agentic AI for dynamic interaction with environments.\n- **Autonomous Vehicles**: Self-driving cars employ agentic AI to navigate and make decisions in real-time.\n- **Smart Assistants**: AI-driven applications like personal assistants that learn user preferences and manage tasks efficiently.\n- **Gaming**: Non-player characters (NPCs) in video games exhibiting advanced behaviors and decision-making strategies.\n\n#### 4. Challenges\n- **Ethics**: Concerns over decision-making without human oversight, potential bias in algorithms, and responsibility for actions taken by AI.\n- **Safety**: Risks associated with autonomous operations, needing robust fail-safes and accountability mechanisms.\n- **Complexity**: Designing agentic AI systems that can manage unpredictability in real-world scenarios.\n\n#### 5. Current Trends and Research\n- **Interdisciplinary Collaboration**: Merging fields such as neuroscience, psychology, and computer science to drive better agentic AI development.\n- **Reinforcement Learning**: Enhancing capabilities through trial-and-error learning, refining decision-making processes over time.\n- **Human-AI Collaboration**: Focusing on AI systems that augment human capabilities rather than replace them, ensuring beneficial coexistence.\n  \n#### 6. Key Sources\n- **Research Papers**: \n  - "What Is Agentic AI?" by Ben Goertzel, published in the Journal of Artificial General Intelligence.\n  - "Autonomous Agents and Multi-Agent Systems" by Michael Wooldridge.\n- **Web Resources**: \n  - Future of Life Institute - [Understanding Agentic AI](https://futureoflife.org)\n  - MIT Technology Review - [The Rise of Agentic AI](https://www.technologyreview.com)\n\n#### 7. Future Directions\n- Expansion of ethical guidelines governing agentic AI development.\n- Innovations in AI safety protocols to reduce risks associated with autonomy.\n- Continued research into AI-human partnership paradigms for collaborative environments.\n\nThis structured research provides a comprehensive overview of agentic AI, detailing its features, applications, challenges, trends, and key references for further reading.',
          pydantic: null,
          json_dict: null,
          agent: "Researcher",
          output_format: "raw",
        },
      ],
      token_usage: {
        total_tokens: 837,
        prompt_tokens: 228,
        cached_prompt_tokens: 0,
        completion_tokens: 609,
        successful_requests: 1,
      },
    },
    startedAt: null,
    completedAt: null,
    ms: null,
  },
  writer: {
    status: "done",
    output: {
      raw: "**The Rise of Agentic AI: Navigating the Future of Autonomous Intelligence**  \n\n**Introduction**  \nIn the rapidly evolving digital landscape, the introduction of artificial intelligence has transformed numerous aspects of our lives, ranging from everyday conveniences to intricate decision-making processes in business and healthcare. However, a new wave of AI is emerging, known as agentic AI. This type of AI operates not just as a tool, but as an autonomous agent capable of making independent decisions and taking actions in the physical and virtual worlds. As we venture deeper into this new territory, it is crucial to understand the implications, challenges, and potentials of agentic AI.\n\n**What is Agentic AI?**  \nAgentic AI refers to artificial intelligence systems that possess a certain level of autonomy, enabling them to act on behalf of users without direct human intervention. This can range from simple applications, like automated email responses, to highly complex systems that can analyze vast datasets, predict outcomes, and make significant decisions in real-time. Unlike traditional AI that requires explicit instructions, agentic AI can learn from its experiences and adapt its strategies, evolving its understanding of tasks and environments over time.\n\n**The Mechanisms Behind Agentic AI**  \nAt the core of agentic AI is a mixture of advanced algorithms, machine learning, and natural language processing capabilities. Utilizing techniques like reinforcement learning, these systems can be trained to optimize their performance through trial and error, akin to how humans learn. Additionally, deep learning techniques enable agentic AI to process vast amounts of unstructured data, improving their ability to understand context and make informed decisions. This adaptability, combined with real-time data analytics, positions agentic AI as a powerful entity capable of performing tasks that were once thought to be exclusively human.\n\n**Applications and Use Cases**  \nThe applications of agentic AI are far-reaching and diverse. In the business realm, companies employ agentic AI to enhance customer service through chatbots that can engage customers, resolve queries, and even upsell products autonomously. In healthcare, agentic AI analyzes patient data and recommends treatment plans tailored to individual needs, optimizing patient outcomes while reducing the administrative burden on healthcare professionals.\n\nMoreover, the field of autonomous vehicles showcases the power of agentic AI, where self-driving cars leverage complex algorithms and sensory data to navigate safely, make split-second decisions, and improve overall traffic management. The potential for agentic AI to revolutionize industries continues to expand as researchers explore new frontiers, including robotics, financial trading, and environmental management.\n\n**Challenges and Ethical Considerations**  \nDespite its potential, the rise of agentic AI presents significant challenges and ethical dilemmas. One primary concern is accountability. When an autonomous system makes a decision that leads to negative outcomes, determining liability can be complicated. This raises critical questions about who should be held responsible: the developers, the users, or the AI itself?\n\nAdditionally, the integration of agentic AI into daily life raises privacy and security concerns. With the ability to collect and analyze personal data, there is a heightened risk of misuse, leading to breaches of trust. Developers and policymakers must navigate these issues carefully, implementing robust regulations and ethical guidelines to ensure that the advances in AI serve the greater good without infringing on individual rights.\n\n**The Road Ahead for Agentic AI**  \nAs we stand on the brink of this new technological frontier, collaboration between technologists, ethicists, and policymakers is essential. The objective is to harness the capabilities of agentic AI while developing frameworks that promote transparency, accountability, and ethical use. Investing in interdisciplinary research will enhance our understanding of agentic AI, paving the way for more robust regulations and innovative applications.\n\nMoreover, fostering public discourse will be vital in addressing societal concerns about AI. By engaging diverse perspectives, we can create a collective vision of the future that embraces the benefits of agentic AI while mitigating its risks.\n\n**Conclusion**  \nAs agentic AI continues to evolve, it holds the promise of transforming industries and enhancing human lives through sophisticated automation and decision-making capabilities. While the potential is vast, it is imperative to approach this technology with caution and responsibility. By prioritizing ethical considerations and fostering collaboration across sectors, we can ensure that agentic AI contributes positively to society and empowers individuals rather than undermining their autonomy. The future of intelligent systems is bright, but it must be navigated with care to create a harmonious coexistence between humans and the machines designed to serve them.",
      pydantic: null,
      json_dict: null,
      tasks_output: [
        {
          description:
            "You are the Writer. Create an engaging, well-structured article based on the topic below.\n- Include a clear intro, body with subheadings, and a conclusion.\n- Maintain a cohesive narrative; do not list bullets only.\n\nTopic: please research on agentic AI",
          name: "You are the Writer. Create an engaging, well-structured article based on the topic below.\n- Include a clear intro, body with subheadings, and a conclusion.\n- Maintain a cohesive narrative; do not list bullets only.\n\nTopic: please research on agentic AI",
          expected_output:
            "A polished article (500-800 words) with headings and clear flow.",
          summary:
            "You are the Writer. Create an engaging, well-structured article based...",
          raw: "**The Rise of Agentic AI: Navigating the Future of Autonomous Intelligence**  \n\n**Introduction**  \nIn the rapidly evolving digital landscape, the introduction of artificial intelligence has transformed numerous aspects of our lives, ranging from everyday conveniences to intricate decision-making processes in business and healthcare. However, a new wave of AI is emerging, known as agentic AI. This type of AI operates not just as a tool, but as an autonomous agent capable of making independent decisions and taking actions in the physical and virtual worlds. As we venture deeper into this new territory, it is crucial to understand the implications, challenges, and potentials of agentic AI.\n\n**What is Agentic AI?**  \nAgentic AI refers to artificial intelligence systems that possess a certain level of autonomy, enabling them to act on behalf of users without direct human intervention. This can range from simple applications, like automated email responses, to highly complex systems that can analyze vast datasets, predict outcomes, and make significant decisions in real-time. Unlike traditional AI that requires explicit instructions, agentic AI can learn from its experiences and adapt its strategies, evolving its understanding of tasks and environments over time.\n\n**The Mechanisms Behind Agentic AI**  \nAt the core of agentic AI is a mixture of advanced algorithms, machine learning, and natural language processing capabilities. Utilizing techniques like reinforcement learning, these systems can be trained to optimize their performance through trial and error, akin to how humans learn. Additionally, deep learning techniques enable agentic AI to process vast amounts of unstructured data, improving their ability to understand context and make informed decisions. This adaptability, combined with real-time data analytics, positions agentic AI as a powerful entity capable of performing tasks that were once thought to be exclusively human.\n\n**Applications and Use Cases**  \nThe applications of agentic AI are far-reaching and diverse. In the business realm, companies employ agentic AI to enhance customer service through chatbots that can engage customers, resolve queries, and even upsell products autonomously. In healthcare, agentic AI analyzes patient data and recommends treatment plans tailored to individual needs, optimizing patient outcomes while reducing the administrative burden on healthcare professionals.\n\nMoreover, the field of autonomous vehicles showcases the power of agentic AI, where self-driving cars leverage complex algorithms and sensory data to navigate safely, make split-second decisions, and improve overall traffic management. The potential for agentic AI to revolutionize industries continues to expand as researchers explore new frontiers, including robotics, financial trading, and environmental management.\n\n**Challenges and Ethical Considerations**  \nDespite its potential, the rise of agentic AI presents significant challenges and ethical dilemmas. One primary concern is accountability. When an autonomous system makes a decision that leads to negative outcomes, determining liability can be complicated. This raises critical questions about who should be held responsible: the developers, the users, or the AI itself?\n\nAdditionally, the integration of agentic AI into daily life raises privacy and security concerns. With the ability to collect and analyze personal data, there is a heightened risk of misuse, leading to breaches of trust. Developers and policymakers must navigate these issues carefully, implementing robust regulations and ethical guidelines to ensure that the advances in AI serve the greater good without infringing on individual rights.\n\n**The Road Ahead for Agentic AI**  \nAs we stand on the brink of this new technological frontier, collaboration between technologists, ethicists, and policymakers is essential. The objective is to harness the capabilities of agentic AI while developing frameworks that promote transparency, accountability, and ethical use. Investing in interdisciplinary research will enhance our understanding of agentic AI, paving the way for more robust regulations and innovative applications.\n\nMoreover, fostering public discourse will be vital in addressing societal concerns about AI. By engaging diverse perspectives, we can create a collective vision of the future that embraces the benefits of agentic AI while mitigating its risks.\n\n**Conclusion**  \nAs agentic AI continues to evolve, it holds the promise of transforming industries and enhancing human lives through sophisticated automation and decision-making capabilities. While the potential is vast, it is imperative to approach this technology with caution and responsibility. By prioritizing ethical considerations and fostering collaboration across sectors, we can ensure that agentic AI contributes positively to society and empowers individuals rather than undermining their autonomy. The future of intelligent systems is bright, but it must be navigated with care to create a harmonious coexistence between humans and the machines designed to serve them.",
          pydantic: null,
          json_dict: null,
          agent: "Writer",
          output_format: "raw",
        },
      ],
      token_usage: {
        total_tokens: 1127,
        prompt_tokens: 229,
        cached_prompt_tokens: 0,
        completion_tokens: 898,
        successful_requests: 1,
      },
    },
    startedAt: null,
    completedAt: null,
    ms: null,
  },
  summarizer: {
    status: "done",
    output: {
      raw: "- **Definition**: Agentic AI refers to artificial intelligence systems that act autonomously, making decisions without human intervention.  \n- **Capabilities**: These systems can learn from data, adapt to new situations, and optimize performance based on feedback.  \n- **Applications**: Common in areas like autonomous vehicles, robotics, and personalized recommendations in digital platforms.  \n- **Ethical Concerns**: Raises issues regarding accountability, bias, and the potential for unintended consequences.  \n- **Development Challenges**: Concerns about regulation, safety, and alignment with human values are significant hurdles.  \n- **Future Prospects**: Potential for transformative impacts on industries and societies, emphasizing the need for responsible AI governance.  \n- **Research Focus**: Ongoing studies aim to improve decision-making processes and ensure ethical deployment.",
      pydantic: null,
      json_dict: null,
      tasks_output: [
        {
          description:
            "You are the Summarizer. Produce a concise summary of the topic below.\n- Capture only the most important points.\n- Use short bullet points and keep it under 150 words.\n\nTopic: please research on agentic AI",
          name: "You are the Summarizer. Produce a concise summary of the topic below.\n- Capture only the most important points.\n- Use short bullet points and keep it under 150 words.\n\nTopic: please research on agentic AI",
          expected_output:
            "A bullet-point summary under 150 words highlighting key takeaways.",
          summary:
            "You are the Summarizer. Produce a concise summary of the...",
          raw: "- **Definition**: Agentic AI refers to artificial intelligence systems that act autonomously, making decisions without human intervention.  \n- **Capabilities**: These systems can learn from data, adapt to new situations, and optimize performance based on feedback.  \n- **Applications**: Common in areas like autonomous vehicles, robotics, and personalized recommendations in digital platforms.  \n- **Ethical Concerns**: Raises issues regarding accountability, bias, and the potential for unintended consequences.  \n- **Development Challenges**: Concerns about regulation, safety, and alignment with human values are significant hurdles.  \n- **Future Prospects**: Potential for transformative impacts on industries and societies, emphasizing the need for responsible AI governance.  \n- **Research Focus**: Ongoing studies aim to improve decision-making processes and ensure ethical deployment.",
          pydantic: null,
          json_dict: null,
          agent: "Summarizer",
          output_format: "raw",
        },
      ],
      token_usage: {
        total_tokens: 397,
        prompt_tokens: 221,
        cached_prompt_tokens: 0,
        completion_tokens: 176,
        successful_requests: 1,
      },
    },
    startedAt: null,
    completedAt: null,
    ms: null,
  },
  reviewer: {
    status: "done",
    output: {
      raw: "**Strengths:**\n1. **Relevance of Topic:** Agentic AI is a timely and important subject given the rapid advancements in AI technology and its implications for society.\n2. **Potential for Impact:** The exploration of agentic AI can lead to significant discussions about autonomy, ethics, and governance in AI, which are critical areas for future development.\n3. **Interdisciplinary Appeal:** This topic intersects various fields, including computer science, philosophy, law, and sociocultural studies, thus inviting diverse perspectives and fostering comprehensive dialogue.\n\n**Weaknesses:**\n1. **Complexity of Concept:** The concept of agentic AI may be difficult to grasp for readers who lack a background in AI or related fields, making it less accessible.\n2. **Limited Scope:** Current research may focus too heavily on theoretical frameworks without sufficient practical applications or case studies, which could limit its relevance.\n3. **Ethical Oversight:** Discussions around agentic AI often lack a robust framework for addressing the ethical implications, potentially leading to oversights in critical areas such as bias, accountability, and safety.\n\n**Suggestions for Improvement:**\n1. **Enhance Accessibility:** Use straightforward language and relatable examples to help explain agentic AI concepts to a broader audience, including those without a technical background.\n2. **Incorporate Case Studies:** Include practical applications or case studies of agentic AI to illustrate its functions and consequences in real-world scenarios.\n3. **Develop Ethical Frameworks:** Propose a structured approach for addressing ethical concerns associated with agentic AI, encouraging a proactive dialogue on accountability and bias.\n4. **Interdisciplinary Collaboration:** Encourage collaboration across disciplines to enrich the discussion around agentic AI, bringing insights from ethics, law, computer science, and social sciences.\n5. **Focus on Future Implications:** Expand the research to discuss future scenarios and trends in agentic AI, including potential challenges and the impact on various sectors such as healthcare, finance, and transportation.",
      pydantic: null,
      json_dict: null,
      tasks_output: [
        {
          description:
            "You are the Reviewer. Critically review the content/topic below.\n- Identify strengths, weaknesses, and potential improvements.\n- Provide 3-5 actionable suggestions.\n\nSubject: please research on agentic AI",
          name: "You are the Reviewer. Critically review the content/topic below.\n- Identify strengths, weaknesses, and potential improvements.\n- Provide 3-5 actionable suggestions.\n\nSubject: please research on agentic AI",
          expected_output:
            "A concise review with strengths, weaknesses, and 3-5 concrete improvements.",
          summary:
            "You are the Reviewer. Critically review the content/topic below.\n- Identify...",
          raw: "**Strengths:**\n1. **Relevance of Topic:** Agentic AI is a timely and important subject given the rapid advancements in AI technology and its implications for society.\n2. **Potential for Impact:** The exploration of agentic AI can lead to significant discussions about autonomy, ethics, and governance in AI, which are critical areas for future development.\n3. **Interdisciplinary Appeal:** This topic intersects various fields, including computer science, philosophy, law, and sociocultural studies, thus inviting diverse perspectives and fostering comprehensive dialogue.\n\n**Weaknesses:**\n1. **Complexity of Concept:** The concept of agentic AI may be difficult to grasp for readers who lack a background in AI or related fields, making it less accessible.\n2. **Limited Scope:** Current research may focus too heavily on theoretical frameworks without sufficient practical applications or case studies, which could limit its relevance.\n3. **Ethical Oversight:** Discussions around agentic AI often lack a robust framework for addressing the ethical implications, potentially leading to oversights in critical areas such as bias, accountability, and safety.\n\n**Suggestions for Improvement:**\n1. **Enhance Accessibility:** Use straightforward language and relatable examples to help explain agentic AI concepts to a broader audience, including those without a technical background.\n2. **Incorporate Case Studies:** Include practical applications or case studies of agentic AI to illustrate its functions and consequences in real-world scenarios.\n3. **Develop Ethical Frameworks:** Propose a structured approach for addressing ethical concerns associated with agentic AI, encouraging a proactive dialogue on accountability and bias.\n4. **Interdisciplinary Collaboration:** Encourage collaboration across disciplines to enrich the discussion around agentic AI, bringing insights from ethics, law, computer science, and social sciences.\n5. **Focus on Future Implications:** Expand the research to discuss future scenarios and trends in agentic AI, including potential challenges and the impact on various sectors such as healthcare, finance, and transportation.",
          pydantic: null,
          json_dict: null,
          agent: "Reviewer",
          output_format: "raw",
        },
      ],
      token_usage: {
        total_tokens: 620,
        prompt_tokens: 212,
        cached_prompt_tokens: 0,
        completion_tokens: 408,
        successful_requests: 1,
      },
    },
    startedAt: null,
    completedAt: null,
    ms: null,
  },
  emailer: {
    status: "done",
    output: {
      raw: "Subject: Research Request on Agentic AI  \n\nDear [Recipient's Name],  \n\nI hope this message finds you well. I am reaching out to request your insights on agentic AI. If you could provide a brief overview or any relevant resources, it would be greatly appreciated.  \n\nThank you for your assistance.  \n\nBest regards,  \n[Your Name]  \n[Your Position]  \n[Your Contact Information]",
      pydantic: null,
      json_dict: null,
      tasks_output: [
        {
          description:
            "You are the Emailer. Draft a concise, professional email based on the user's request and any prior content.\n- Include a clear subject line.\n- Keep the body brief with key points.\n- Close with an appropriate sign-off.\n\nPrompt: please research on agentic AI",
          name: "You are the Emailer. Draft a concise, professional email based on the user's request and any prior content.\n- Include a clear subject line.\n- Keep the body brief with key points.\n- Close with an appropriate sign-off.\n\nPrompt: please research on agentic AI",
          expected_output:
            "A subject line and short email body ready to be sent.",
          summary:
            "You are the Emailer. Draft a concise, professional email based...",
          raw: "Subject: Research Request on Agentic AI  \n\nDear [Recipient's Name],  \n\nI hope this message finds you well. I am reaching out to request your insights on agentic AI. If you could provide a brief overview or any relevant resources, it would be greatly appreciated.  \n\nThank you for your assistance.  \n\nBest regards,  \n[Your Name]  \n[Your Position]  \n[Your Contact Information]",
          pydantic: null,
          json_dict: null,
          agent: "Emailer",
          output_format: "raw",
        },
      ],
      token_usage: {
        total_tokens: 327,
        prompt_tokens: 232,
        cached_prompt_tokens: 0,
        completion_tokens: 95,
        successful_requests: 1,
      },
    },
    startedAt: null,
    completedAt: null,
    ms: null,
  },
  delivery: {
    status: "done",
    output: null,
    startedAt: null,
    completedAt: null,
    ms: null,
  },
};

export default function ChatContainer({ chatHistory }) {
  const agents = Object.entries(output);

  // const [displayResponse, setDisplayResponse] = useState("");
  // const [completedTyping, setCompletedTyping] = useState(false);

  // useEffect(() => {
  //   if (!chatHistory) return;

  //   setCompletedTyping(false);
  //   setDisplayResponse("");

  //   // Join all role headings + outputs into one string
  //   const combinedResponse = Object.entries(chatHistory)
  //     .map(([role, { output }]) => `### ${role}\n${output}`)
  //     .join("\n\n");

  //   let i = 0;
  //   const intervalId = setInterval(() => {
  //     setDisplayResponse(combinedResponse.slice(0, i));
  //     i++;

  //     if (i > combinedResponse.length) {
  //       clearInterval(intervalId);
  //       setCompletedTyping(true);
  //     }
  //   }, 20);

  //   return () => clearInterval(intervalId);
  // }, [chatHistory]);

  return (
    <div className="chat chat-start">
      <span className="chat-bubble font-mono whitespace-pre-wrap">
        {/* {displayResponse}
        {!completedTyping && <CursorSVG />} */}
        <Tabs defaultValue={agents[0]?.[0]} className="w-full">
          {/* Tab headers */}
          <TabsList
            className="
              sticky top-0 z-50 
              flex flex-wrap gap-2 
              bg-background/90 backdrop-blur-md 
              border-b border-border 
              p-2
            "
          >
            {agents.map(([agent]) => (
              <TabsTrigger key={agent} value={agent} className="capitalize">
                {agent}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Tab contents */}
          {agents.map(([agent, details]) => (
            <TabsContent key={agent} value={agent} className="mt-4">
              <Card className="shadow-md">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="capitalize">{agent}</CardTitle>
                    <Badge
                      variant={
                        details.status === "done" ? "default" : "secondary"
                      }
                    >
                      {details.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {typeof details?.output === "object" &&
                  details?.output?.raw ? (
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      <ReactMarkdown>{details?.output?.raw}</ReactMarkdown>
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No output available</p>
                  )}

                  {typeof details.output === "object" &&
                    details?.output?.tasks_output &&
                    details?.output?.tasks_output.length > 0 && (
                      <div>
                        <Separator className="my-2" />
                        <h4 className="font-medium mb-2">Tasks</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          {details.output.tasks_output.map((task, i) => (
                            <li
                              key={i}
                              className="text-sm text-muted-foreground"
                            >
                              {task.description}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                  <Separator className="my-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Started: {details.startedAt || "—"}</span>
                    <span>Completed: {details.completedAt || "—"}</span>
                    <span>⏱ {details.ms ? `${details.ms} ms` : "—"}</span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </span>
    </div>
  );
}



