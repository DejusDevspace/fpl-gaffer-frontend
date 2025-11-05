import { useState } from "react";
import {
  FiChevronDown,
  FiChevronUp,
  FiHelpCircle,
  FiLink,
  FiMessageSquare,
  FiTrendingUp,
} from "react-icons/fi";

interface FAQItem {
  question: string;
  answer: string;
  icon: React.ReactNode;
}

const Help = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqs: FAQItem[] = [
    {
      question: "How do I link my Fantasy Premier League account?",
      answer:
        "To link your FPL account, click on 'Link FPL Team' from the dashboard or settings page. You'll need to provide your FPL team ID, which you can find on the official FPL website when logged into your account. The app will securely sync your team data for personalized insights.",
      icon: <FiLink className="text-accent" />,
    },
    {
      question: "How do I unlink my FPL account?",
      answer:
        "You can unlink your FPL account in the Settings page. Click on the Settings option in the sidebar, then look for the account management section where you'll find an option to disconnect your FPL team. This will remove all synced data from our servers.",
      icon: <FiLink className="text-accent" />,
    },
    {
      question: "What information does the Dashboard show?",
      answer:
        "The Dashboard displays your team's current standings, gameweek performance, transfer history, and rank progression. You'll see charts for points per gameweek, rank changes, and transfer activity, plus quick actions to chat with the AI or sync your latest data.",
      icon: <FiTrendingUp className="text-accent" />,
    },
    {
      question: "How does the AI Chat work?",
      answer:
        "The AI Chat allows you to have natural conversations with FPL Gaffer about your team, transfers, captain picks, and strategy. Ask questions like 'What midfielders should I consider?' or 'Who should be my captain this week?' The AI uses your team data and real-time FPL information to provide accurate advice.",
      icon: <FiMessageSquare className="text-accent" />,
    },
    {
      question: "How often should I sync my FPL data?",
      answer:
        "We recommend syncing your data after each gameweek ends or after making transfers. The sync button in your dashboard will update your team information, ensuring the AI has the most current data for accurate recommendations.",
      icon: <FiTrendingUp className="text-accent" />,
    },
    {
      question: "Is my FPL data secure?",
      answer:
        "Yes, your FPL data is handled securely. We only store the minimum necessary information to provide our services and use industry-standard security practices. Your actual FPL login credentials are never stored on our servers.",
      icon: <FiHelpCircle className="text-accent" />,
    },
    {
      question: "Can I use this app on mobile?",
      answer:
        "While the web interface works well on mobile browsers, we recommend using a desktop or tablet for the best experience with charts and data visualization. The AI chat is optimized for all screen sizes.",
      icon: <FiHelpCircle className="text-accent" />,
    },
    {
      question: "What makes FPL Gaffer different from other FPL tools?",
      answer:
        "FPL Gaffer combines AI-powered analysis with real-time data validation. Unlike generic chatbots, our AI never hallucinates information and cross-references all suggestions with actual FPL data. It also learns from your specific team context and budget constraints.",
      icon: <FiHelpCircle className="text-accent" />,
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-background to-accent/50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-4 flex items-center justify-center gap-3">
            <FiHelpCircle className="text-accent" />
            Help Center
          </h1>
          <p className="text-xl text-primary/75">
            Everything you need to know about using FPL Gaffer effectively
          </p>
        </div>

        {/* Quick Start Guide */}
        <div className="card mb-8">
          <h2 className="text-2xl font-semibold text-primary mb-6">
            Quick Start Guide
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center shrink-0 mt-1">
                  <span className="text-accent font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-primary mb-1">
                    Sign Up & Login
                  </h3>
                  <p className="text-primary/75 text-sm">
                    Create your account and log in to access the app.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center shrink-0 mt-1">
                  <span className="text-accent font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-primary mb-1">
                    Link Your FPL Team
                  </h3>
                  <p className="text-primary/75 text-sm">
                    Connect your Fantasy Premier League account using your team
                    ID.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center shrink-0 mt-1">
                  <span className="text-accent font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-semibold text-primary mb-1">
                    Explore Dashboard
                  </h3>
                  <p className="text-primary/75 text-sm">
                    View your team's performance, charts, and analytics.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center shrink-0 mt-1">
                  <span className="text-accent font-bold">4</span>
                </div>
                <div>
                  <h3 className="font-semibold text-primary mb-1">
                    Chat with AI
                  </h3>
                  <p className="text-primary/75 text-sm">
                    Get personalized advice from our AI-powered assistant.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="card">
          <h2 className="text-2xl font-semibold text-primary mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-aux rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-aux/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {faq.icon}
                    <span className="font-medium text-primary">
                      {faq.question}
                    </span>
                  </div>
                  {openFAQ === index ? (
                    <FiChevronUp className="text-primary shrink-0" />
                  ) : (
                    <FiChevronDown className="text-primary shrink-0" />
                  )}
                </button>
                {openFAQ === index && (
                  <div className="px-6 pb-4">
                    <p className="text-primary/75 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <div className="card mt-8 text-center">
          <h3 className="text-xl font-semibold text-primary mb-2">
            Still need help?
          </h3>
          <p className="text-primary/75 mb-4">
            Can't find what you're looking for? Reach out to our support team.
          </p>
          <button className="btn-primary">Contact Support</button>
        </div>
      </div>
    </div>
  );
};

export default Help;
